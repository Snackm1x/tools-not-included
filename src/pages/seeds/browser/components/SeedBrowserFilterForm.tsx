import * as React from 'react';
import BrowserFilterRuleInput from './BrowserFilterRuleInput';
import classNames from 'classnames';
import FormItem from 'antd/lib/form/FormItem';
import NumericInput from '../../../../components/forms/NumericInput';
import SeedBrowserFilterFormValidationSchema, { maxRules } from './SeedBrowserFilterFormValidationSchema';
import {
    Button,
    Col,
    Divider,
    Form,
    Icon,
    Row,
    Alert
} from 'antd';
import {
    GeyserType,
    SeedBrowserFilterRule,
    SeedBrowserFilterRuleComparator,
    SpaceDestinationType
} from '../../../../api/models';
import { groupBy } from '../../../../utils/groupBy';
import {
    Field,
    FieldArray,
    withFormik,
    FormikProps,
} from 'formik';

export interface SeedBrowserFilterFormProps {
    initialValues: SeedBrowserFilterFormValues,
    geyserTypes: { [key: string]: GeyserType }
    spaceDestinationTypes: { [key: string]: SpaceDestinationType },
    handleSubmit: Function
}

export interface SeedBrowserFilterFormValues {
    seedNumber?: number,
    rules: SeedBrowserFilterRule[]
}

interface SeedBrowserFilterState {
    nextRuleId: number,
    nextGroupId: number
}

const InitialRuleValue = {
    conditionValue: 0, value: 0, comparator: SeedBrowserFilterRuleComparator.At_least, object: undefined, objectType: undefined
}

class SeedBrowserFilterForm extends React.Component<SeedBrowserFilterFormProps & FormikProps<SeedBrowserFilterFormValues>, SeedBrowserFilterState> {
    constructor(props: SeedBrowserFilterFormProps & FormikProps<SeedBrowserFilterFormValues>) {
        super(props);

        var nextIndices = this.findInitialNextIds();
        this.state = { nextRuleId: nextIndices.nextRuleId, nextGroupId: nextIndices.nextGroupId };
    }

    findInitialNextIds() {
        var highestid = -1;
        var highestGroupId = -1;

        if (!this.props.initialValues.rules)
            return { nextRuleId: 0, nextGroupId: 0 };

        this.props.initialValues.rules.forEach(rule => {
            if (rule.id > highestid) highestid = rule.id;
            if (rule.groupId > highestGroupId) highestGroupId = rule.groupId;
        });

        return { nextRuleId: highestid + 1, nextGroupId: highestGroupId + 1 };
    }

    render() {
        const form: FormikProps<SeedBrowserFilterFormValues> = this.props;
        const groupedValues = groupBy(form.values.rules, "groupId");

        return (
            <Form
                layout="vertical"
                onSubmit={form.handleSubmit}
                className="browser-filter-form">
                <Row className="browser-filter-header-row"><h2 style={{ marginBottom: 24 }}>Make your own rules!</h2></Row>
                <FieldArray name="rules"
                    render={arrayHelpers => (
                        <div style={{ marginTop: 10 }}>
                            {
                                Object.keys(groupedValues).map((groupId: string, groupIndex: number, array: string[]) => {
                                    const groupRules = groupedValues[groupId];
                                    return (
                                        <Row key={groupId} className="browser-filter-rule-row-container">
                                            {groupRules.map((rule: SeedBrowserFilterRule, ruleIndex: number) => {
                                                return (
                                                    <BrowserFilterRuleInput {...form}
                                                        name="rules" key={`group${groupId}-rule${rule.id}`}
                                                        ruleId={rule.id}
                                                        groupId={parseInt(groupId)}
                                                        geyserTypes={this.props.geyserTypes}
                                                        spaceDestinationTypes={this.props.spaceDestinationTypes}
                                                        onDelete={(id: number, groupId: number) => {
                                                            var arrayIdx = form.values.rules.findIndex((value: SeedBrowserFilterRule) => value.id == id && value.groupId == groupId);
                                                            arrayHelpers.remove(arrayIdx);
                                                        }} />)
                                            })}
                                            {form.values.rules && form.values.rules.length < maxRules &&
                                                <Col xs={24} lg={12} className="browser-filter-field-column">
                                                    <FormItem>
                                                        <Button type="dashed"
                                                            className={classNames("transparent-background-color", "browser-filter-add-alternative-button")}
                                                            disabled={form.values.rules && form.values.rules.length >= maxRules}
                                                            onClick={() => {
                                                                arrayHelpers.push({ ...InitialRuleValue, groupId: groupId, id: this.state.nextRuleId });
                                                                this.setState({ nextRuleId: this.state.nextRuleId + 1 });
                                                            }}>
                                                            <Icon type="plus" /><p style={{ display: 'inline', marginRight: 5 }}>Add <b style={{ color: '#9BCBF6' }}> ( OR ) </b> rule</p>
                                                        </Button>
                                                    </FormItem>
                                                </Col>}
                                            <Divider style={{ background: 'rgba(255, 255, 255, 0.25)', margin: '0.5em 0px', marginBottom: 25 }}></Divider>
                                        </Row>
                                    )
                                })}

                            <Row className="browser-filter-rule-row-container">
                                <Col xs={24} lg={12} className="browser-filter-field-column">
                                    {form.values.rules && form.values.rules.length < maxRules &&
                                        <FormItem>
                                            <Button type="dashed"
                                                className={classNames("transparent-background-color", "browser-filter-add-rule-button")}
                                                disabled={form.values.rules && form.values.rules.length >= maxRules}
                                                onClick={() => {
                                                    arrayHelpers.push({ ...InitialRuleValue, groupId: this.state.nextGroupId, id: this.state.nextRuleId });
                                                    this.setState({ nextRuleId: this.state.nextRuleId + 1, nextGroupId: this.state.nextGroupId + 1 });
                                                }}>
                                                <Icon type="plus" /><p style={{ display: 'inline', marginRight: 5 }}>Add <b style={{ color: '#FAFF9A' }}>( AND )</b> rule</p></Button>
                                        </FormItem>}

                                    {form.values.rules && form.values.rules.length >= maxRules &&
                                        <FormItem>
                                            <Alert
                                                className="browser-filter-max-rules-alert"
                                                type="info"
                                                showIcon
                                                message={`So picky! Max ${maxRules} rules please.`} />
                                        </FormItem>}
                                </Col>
                                <Col xs={24} lg={12} className="browser-filter-field-column">
                                    <Field name="seedNumber"
                                        component={NumericInput}
                                        prop={{ inner: { max: 2147483647, min: 0, className: classNames("transparent-background-color", "browser-filter-seed-number"), placeholder: "Seed number (optional)" } }} />
                                </Col>
                            </Row>
                            <Row className="browser-filter-rule-row-container">
                                <Col xs={24} className="browser-filter-field-column">
                                    <Button type="primary" className="browser-filter-search-button" htmlType="submit">Search</Button>
                                </Col>
                            </Row>
                        </div>

                    )} />
            </Form>
        );
    }
};

export default withFormik<SeedBrowserFilterFormProps, SeedBrowserFilterFormValues>({
    mapPropsToValues: (props: SeedBrowserFilterFormProps) => ({ ...props.initialValues }),
    validationSchema: SeedBrowserFilterFormValidationSchema,
    handleSubmit: (values: SeedBrowserFilterFormValues, { props }) => { props.handleSubmit(values); }
})(SeedBrowserFilterForm);