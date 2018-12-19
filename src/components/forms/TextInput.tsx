import * as React from "react";
import { Form, Input } from "antd";

interface Props {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    name: string,
    label?: string | undefined,
    placeholder?: string | undefined,
    formItemProps?
}

class TextInput extends React.PureComponent<Props> {
    render() {
        const { values, errors, handleSubmit, setFieldValue, setFieldTouched, name, label, placeholder, formItemProps } = this.props;
        return (
            <Form.Item
                {...formItemProps}
                hasFeedback={!!errors[name]}
                validateStatus={errors[name] && "error"}
                help={errors[name]}
                label={label ? label : ""}>
                <Input
                    value={values[name]}
                    placeholder={placeholder ? placeholder : ""}
                    onChange={event => setFieldValue(name, event.target.value)}
                    onBlur={() => setFieldTouched(name)}
                    onPressEnter={handleSubmit}
                    className="transparent-background-color"
                />
            </Form.Item>
        );
    }
}

export default TextInput;