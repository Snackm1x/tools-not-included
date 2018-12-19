import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import {
    Input, Select, InputNumber, Cascader
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';


const InputGroup = Input.Group;
const Option = Select.Option;

function handleChange(value: any) {
    console.log(`selected ${value}`);
//    alert(`selected ${value[0]} ${value[1]}`);
}


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
    values,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    name: string,
    label?: string | undefined,
    placeholder?: string | undefined,
    formItemProps?,
    idx: number
}


class CompositeRow extends React.Component<Props>  {

    render() {
        const { values, errors, handleSubmit, setFieldValue, setFieldTouched, name, label, placeholder, formItemProps, idx } = this.props;
        const state = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        return (
            <FormItem
                {...formItemProps}
                // hasFeedback={!!errors[name][idx]}   https://jaredpalmer.com/formik/docs/api/fieldarray 
                // validateStatus={errors[name][idx] && "error"}
                // help={errors[name][idx]}
                required>
                <InputGroup compact>
                    <Cascader
                        fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                        placeholder={"Select object type"}
                        displayRender={(values) => values[1]}
                        options={options}
                        value={["zhejiang", "hangzhou"]}
                        onChange={(value) => {
                            setFieldValue(`${name}.${idx}.conditionType`, value[0]);
                            setFieldValue(`${name}.${idx}.conditionObject`, value[1]);
                        }}
                        className="transparent-background-color"
                        popupClassName="dark-cascader"
                      //  onPopupVisibleChange={() => setFieldTouched(`${name}.${idx}.conditionType`)}
                       />

                    <Select
                        defaultValue="at_least"
                        style={{ width: 100 }}
                        onChange={(value) => setFieldValue(`${name}.${idx}.conditionComparator`, value)}
                        onBlur={() => setFieldTouched(`${name}.${idx}.conditionComparator`)}
                        value={values[`${name}`][`${idx}`].conditionComparator}
                        className="transparent-background-color" >

                        <Option value="at_least" className="transparent-background-color">at least</Option>
                        <Option value="at_most" className="transparent-background-color">at most</Option>

                    </Select>

                    <InputNumber
                        min={0}
                        className="transparent-background-color"
                        style = {{width: 200}}
                        formatter={value => `${value} kg/s`}
                        parser={value => parseFloat(value!.replace('kg/s', ''))}
                        value={values[`${name}`][`${idx}`].conditionValue}
                        onChange={(value) => setFieldValue(`${name}.${idx}.conditionValue`, value)}
                        onBlur={() => setFieldTouched(`${name}.${idx}.conditionValue`)} />
                </InputGroup>

                
            </FormItem>

        );
    }
};

export default CompositeRow;