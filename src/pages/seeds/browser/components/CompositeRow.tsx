import * as React from 'react';
import { Icon, Input, Select, InputNumber, Cascader, Form, Col, Button } from 'antd';
import { FormValues, RuleValues } from './SeedBrowserFilterForm';
import classNames from 'classnames'

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const options = [{
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [{
        code: 'hangzhou',
        name: 'Hangzhou'
    }],
}, {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [{
        code: 'nanjing',
        name: 'Nanjing'
    }],
}];

interface Props {
    values: FormValues,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    name: string,
    label?: string | undefined,
    placeholder?: string | undefined,
    formItemProps?,
    ruleId: number,
    groupId: number,
    showOrLabel: boolean,
    onDelete: Function
}

class CompositeRow extends React.Component<Props>  {

    getCascaderValue(values: RuleValues): string[] {
        if (!values || !values.conditionObjectType || !values.conditionObject) {
            return [];
        }

        return [values.conditionObjectType, values.conditionObject];
    }

    render() {
        const { values, errors, touched, handleSubmit, setFieldValue, setFieldTouched, name, label, placeholder, formItemProps, ruleId, groupId, showOrLabel, onDelete } = this.props;
        var idx = values.rules.findIndex(value => value.ruleId == ruleId && value.ruleGroupId == groupId);

        return (
            <Col xs={12}>
                <FormItem
                    {...formItemProps}
                    hasFeedback={!!errors[name] && !!errors[name][idx]}
                    validateStatus={errors[name] && errors[name][idx] && touched[name] && touched[name][idx] && "error"}
                    help={errors[name] && errors[name][idx] && touched[name] && touched[name][idx] && Object.keys(errors[name][idx]).map(key => errors[name][idx][key]).join(", ")}
                >

                    <InputGroup compact className="browser-filter-rule-row">
                        <Cascader
                            fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                            placeholder={"Select object type"}
                            displayRender={(values) => values[1]}
                            options={options}
                            value={this.getCascaderValue(values[`${name}`][`${idx}`])}
                            onChange={(value) => {
                                setFieldValue(`${name}.${idx}.conditionObjectType`, value[0]);
                                setFieldValue(`${name}.${idx}.conditionObject`, value[1]);
                            }}
                            className={classNames("transparent-background-color", "browser-filter-rule-row-cascader")}
                            popupClassName="dark-cascader"
                            changeOnSelect
                            onPopupVisibleChange={(popupVisible: boolean) => {
                                if (!popupVisible) {
                                    setFieldTouched(`${name}.${idx}.conditionObjectType`);
                                    setFieldTouched(`${name}.${idx}.conditionObject`);
                                }
                            }}
                        />

                        <Select
                            onChange={(value) => setFieldValue(`${name}.${idx}.conditionComparator`, value)}
                            onBlur={() => setFieldTouched(`${name}.${idx}.conditionComparator`)}
                            value={values[`${name}`][`${idx}`].conditionComparator}
                            className={classNames("transparent-background-color", "browser-filter-rule-row-select")}>

                            <Option value="at_least" className="transparent-background-color">at least</Option>
                            <Option value="at_most" className="transparent-background-color">at most</Option>
                        </Select>

                        <InputNumber
                            min={0}
                            className={classNames("transparent-background-color", "browser-filter-rule-row-number")}
                            value={values[`${name}`][`${idx}`].conditionValue}
                            onChange={(value) => setFieldValue(`${name}.${idx}.conditionValue`, value)}
                            onBlur={() => setFieldTouched(`${name}.${idx}.conditionValue`)}
                            onSubmit={handleSubmit}

                            // those should only be active when total output rule type is active
                            formatter={value => `${value} kg/s`}
                            parser={value => parseFloat(value!.replace('kg/s', ''))}
                            step={0.1}
                            precision={2}
                        />
                    </InputGroup>

                    <Button
                        className="dynamic-delete-button"
                        style={{ marginLeft: 10, background: 'transparent', border: 'none' }}
                        icon="delete"
                        onClick={() => this.props.onDelete(ruleId, groupId) }
                    />
                </FormItem>
            </Col>
        );
    }
};

export default CompositeRow;