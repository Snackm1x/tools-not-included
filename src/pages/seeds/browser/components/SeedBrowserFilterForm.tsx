import * as React from 'react';
import BrowserFilterRuleInput from './BrowserFilterRuleInput';
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
    withFormik,
    FormikProps,
} from 'formik';
import classNames from 'classnames';
import SeedBrowserFilterFormValidationSchema, { maxRules } from './SeedBrowserFilterFormValidationSchema';

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

        return (
            <Form
                layout="vertical"
                onSubmit={form.handleSubmit}
                className="browser-filter-form">

                <Row className="browser-filter-header-row"><h1>Seed Browser</h1></Row>
                <Row className="browser-filter-header-row"><h3>Search for a specific seed</h3></Row>
                <Row className="browser-filter-header-row">
                    <Field name="seedNumber" component={NumericInput} prop={{ inner: { max: 5, min: 0, className: classNames("transparent-background-color", "browser-filter-seed-number") } }} />
                </Row>

                <Row className="browser-filter-header-row" ><h3>Or make your own rules</h3></Row>
                <FieldArray name="rules"
                    render={arrayHelpers => (
                        <div style={{marginTop: 10}}>
                            {
                                Object.keys(groupedValues).map((groupId: string, groupIndex: number, array: string[]) => {
                                    const groupRules = groupedValues[groupId];
                                    return (
                                        <Row key={groupId} className="browser-filter-rule-row-container">
                                            {groupRules.map((rule: RuleValues, ruleIndex: number) => {
                                                return (
                                                    <BrowserFilterRuleInput {...form}
                                                        name="rules" key={`group${groupId}-rule${rule.ruleId}`}
                                                        ruleId={rule.ruleId}
                                                        groupId={parseInt(groupId)}
                                                        showOrLabel={true}
                                                        onDelete={(ruleId: number, groupId: number) => {
                                                            var arrayIdx = form.values.rules.findIndex((value: RuleValues) => value.ruleId == ruleId && value.ruleGroupId == groupId);
                                                            arrayHelpers.remove(arrayIdx);
                                                        }} />)
                                            })}
                                            <Col xs={24} lg={12} className="browser-filter-field-column">
                                                <FormItem>
                                                    <Button type="dashed"
                                                        className={classNames("transparent-background-color", "browser-filter-add-alternative-button")}
                                                        disabled={form.values.rules && form.values.rules.length >= maxRules}
                                                        onClick={() => {
                                                            arrayHelpers.push({ ...InitialRuleValue, ruleGroupId: groupId, ruleId: this.state.nextRuleId });
                                                            this.setState({ nextRuleId: this.state.nextRuleId + 1 });
                                                        }}>
                                                        <Icon type="plus" /><p style={{display: 'inline', marginRight: 5}}>Add <b style={{color: '#9BCBF6'}}> ( OR ) </b> rule</p>
                                                        </Button>
                                                </FormItem>
                                            </Col>
                                            <Divider style={{ background: 'rgba(255, 255, 255, 0.25)', margin: '0.5em 0px', marginBottom: 25 }}></Divider>
                                        </Row>
                                    )
                                })}

                            <Row className="browser-filter-rule-row-container">
                                <Col xs={24} lg={12} className="browser-filter-field-column">
                                    <FormItem>
                                        <Button type="dashed"
                                            className={classNames("transparent-background-color", "browser-filter-add-rule-button")}
                                            disabled={form.values.rules && form.values.rules.length >= maxRules}
                                            onClick={() => {
                                                arrayHelpers.push({ ...InitialRuleValue, ruleGroupId: this.state.nextGroupId, ruleId: this.state.nextRuleId });
                                                this.setState({ nextRuleId: this.state.nextRuleId + 1, nextGroupId: this.state.nextGroupId + 1 });
                                            }}>
                                            <Icon type="plus" /><p style={{display: 'inline', marginRight: 5}}>Add <b style={{color: '#FAFF9A'}}>( AND )</b> rule</p></Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    )} />
                <Button type="primary" htmlType="submit" disabled={form.isSubmitting}>Search</Button>
            </Form>
        );
    }
};

export default withFormik<any, FormValues>({
    handleSubmit: ((values: FormValues) => { alert(JSON.stringify(values)) }),
    mapPropsToValues: () => ({ ...initialValues }),
    validationSchema: SeedBrowserFilterFormValidationSchema
})(SeedBrowserFilterForm);