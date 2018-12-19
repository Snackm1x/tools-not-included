import * as React from "react";
import { Form, InputNumber } from "antd";

interface Props {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    name: string,
    label?: string | undefined,
    max?: number,
    min?: number,
    step?: number
}

class TextInput extends React.PureComponent<Props> {
    render() {
        const { values, errors, handleSubmit, setFieldValue, setFieldTouched, name, label, max, min, step } = this.props;
        return (
            <Form.Item
                hasFeedback={!!errors[name]}
                validateStatus={errors[name] && "error"}
                help={errors[name]}
                label={label ? label : ""}>
                <InputNumber
                    value={values[name]}
                    onBlur={() => setFieldTouched(name)}
                    onSubmit={handleSubmit}
                    onChange={(value) => setFieldValue(name, value)}
                    min={min}
                    max={max}
                    step={step ? step : 1}
                    className="transparent-background-color"
                />
            </Form.Item>
        );
    }
}

export default TextInput;