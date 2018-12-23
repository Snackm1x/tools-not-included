import * as React from 'react';
import * as Yup from 'yup';
import CompositeRow from './CompositeRow';
import FormItem from 'antd/lib/form/FormItem';
import NumericInput from '../../../../components/forms/NumericInput';
import {
    Button,
    Col,
    Form,
    Icon,
    Row,
    Divider
} from 'antd';
import {
    Field,
    FieldArray,
    InjectedFormikProps,
    validateYupSchema,
    withFormik,
    FormikProps,
} from 'formik';
import classNames from 'classnames';

const groupBy = (items, key) =>
    items.reduce((result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
        {},
    );

export interface FormProps {

}

export interface FormValues {
    seedNumber?: number,
    rules: RuleValues[]
}

export interface RuleValues {
    conditionObjectType: string | undefined,
    conditionObject: string | undefined,
    conditionValue: number,
    conditionComparator: string,
    ruleGroupId: number,
    ruleId: number
}

const maxRules = 25;
let initialValues: FormValues =
{
    seedNumber: undefined,
    rules: [
        { ruleId: 0, ruleGroupId: 0, conditionValue: 0, conditionComparator: 'at_least', conditionObject: undefined, conditionObjectType: undefined },
        { ruleId: 1, ruleGroupId: 1, conditionValue: 10, conditionComparator: 'at_least', conditionObject: 'hangzhou', conditionObjectType: 'zhejiang' },
        { ruleId: 2, ruleGroupId: 2, conditionValue: 20, conditionComparator: 'at_most', conditionObject: 'nanjing', conditionObjectType: 'jiangsu' },
    ]
}

const InitialRuleValue = {
    conditionValue: 0, conditionComparator: 'at_least', conditionObject: undefined, conditionObjectType: undefined
}

interface SeedBrowserState {
    nextRuleId: number,
    nextGroupId: number
}

class SeedBrowserFilterForm extends React.Component<FormProps & FormikProps<FormValues>, SeedBrowserState> {
    constructor(props: FormProps & FormikProps<FormValues>) {
        super(props);

        var nextIndices = this.findInitialNextIds();
        this.state = { nextRuleId: nextIndices.nextRuleId, nextGroupId: nextIndices.nextGroupId };
    }

    findInitialNextIds() {
        var highestRuleId = -1;
        var highestGroupId = -1;

        initialValues.rules.forEach(rule => {
            if (rule.ruleId > highestRuleId) highestRuleId = rule.ruleId;
            if (rule.ruleGroupId > highestGroupId) highestGroupId = rule.ruleGroupId;
        });

        return { nextRuleId: highestRuleId + 1, nextGroupId: highestGroupId + 1 };
    }

    render() {
        const form: FormikProps<FormValues> = this.props;
        const groupedValues = groupBy(form.values.rules, "ruleGroupId");

        const formItemLayoutWithOutLabel = {

        };

        return (
            <Form
                layout="vertical"
                onSubmit={form.handleSubmit}
                style={{ margin: 20 }}
                className="browser-filter-form">

                <Row><h1>Seed Browser</h1></Row>
                <Row><p>Search for a specific seed</p></Row>
                <Field name="seedNumber" component={NumericInput} prop={{ ...formItemLayoutWithOutLabel, inner: { max: 5, min: 0, className: classNames("transparent-background-color", "browser-filter-seed-number") } }} />

                <Row><p>Or make your own rules</p></Row>
                <FieldArray name="rules"
                    render={arrayHelpers => (
                        <div>
                            {
                                Object.keys(groupedValues).map((groupId: string, groupIndex: number, array: string[]) => {
                                    const groupRules = groupedValues[groupId];
                                    return (
                                        <Row key={groupId}>
                                            {groupRules.map((rule: RuleValues, ruleIndex: number) => {
                                                return (
                                                    <CompositeRow {...form}
                                                        formItemProps={formItemLayoutWithOutLabel}
                                                        name="rules" key={`group${groupId}-rule${rule.ruleId}`}
                                                        ruleId={rule.ruleId}
                                                        groupId={parseInt(groupId)}
                                                        showOrLabel={true}
                                                        onDelete={(ruleId: number, groupId: number) => {
                                                            var arrayIdx = form.values.rules.findIndex((value: RuleValues) => value.ruleId == ruleId && value.ruleGroupId == groupId);
                                                            arrayHelpers.remove(arrayIdx);
                                                        }} />)
                                            })}
                                            <Col xs={12}>
                                                <FormItem {...formItemLayoutWithOutLabel}>
                                                    <Button type="dashed"
                                                        className={classNames("transparent-background-color", "browser-filter-add-alternative-button")}
                                                        disabled={form.values.rules && form.values.rules.length >= maxRules}
                                                        onClick={() => {
                                                            arrayHelpers.insert(this.state.nextRuleId, { ...InitialRuleValue, ruleGroupId: groupId, ruleId: this.state.nextRuleId });
                                                            this.setState({ nextRuleId: this.state.nextRuleId + 1 });
                                                        }}>
                                                        <Icon type="plus" /> Add alternative (OR)
                                                        </Button>
                                                </FormItem>
                                            </Col>
                                            <Divider style={{ background: 'rgba(255, 255, 255, 0.25)', margin: '0.5em 0px', marginBottom: 20 }} />
                                        </Row>
                                    )
                                })}

                            <FormItem {...formItemLayoutWithOutLabel}>
                                <Button type="dashed"
                                    className={classNames("transparent-background-color", "browser-filter-add-rule-button")}
                                    disabled={form.values.rules && form.values.rules.length >= maxRules}
                                    onClick={() => {
                                        arrayHelpers.insert(this.state.nextRuleId, { ...InitialRuleValue, ruleGroupId: this.state.nextGroupId, ruleId: this.state.nextRuleId });
                                        this.setState({ nextRuleId: this.state.nextRuleId + 1, nextGroupId: this.state.nextGroupId + 1 });
                                    }}>
                                    <Icon type="plus" /> Add rule (AND)
                                </Button>
                            </FormItem>
                        </div>
                    )} />

                <Button type="primary" htmlType="submit" disabled={form.isSubmitting}>Search</Button>

                <pre>
                    {JSON.stringify(form.touched, null, 2)}
                </pre>

                <pre>
                    {JSON.stringify(form.errors, null, 2)}
                </pre>

                <pre>
                    {JSON.stringify(form.values, null, 2)}
                </pre>
            </Form>
        );
    }

};

export default withFormik<any, FormValues>({
    handleSubmit: ((values: FormValues) => { validateYupSchema }),
    mapPropsToValues: () => ({ ...initialValues }),
    validationSchema: Yup.object().shape({
        seedNumber: Yup.number()
            .moreThan(-1)
            .lessThan(2147483648)
            .notRequired()
            .integer(),
        rules: Yup.array()
            .of(
                Yup.object().shape({
                    conditionObjectType: Yup.string(),
                    conditionObject: Yup.string()
                        .required("Please select an object or remove the incomplete rule"),
                    conditionValue: Yup.number()
                        .min(0, "Please provide a non-negative value"),
                    conditionComparator: Yup.string()
                        .required(),
                    ruleGroupId: Yup.number()
                        .required(),
                    ruleId: Yup.number()
                        .required()
                })
            )
            .max(maxRules, `You picky bastard, you. Maximum of ${maxRules} rules allowed.`)
    })
})(SeedBrowserFilterForm);