import * as React from "react";
import { Form, Input } from "antd";

interface Props {
    field,
    prop?,
    form: { touched, errors },
}

class TextInput extends React.PureComponent<Props> {
    render() {
        const { field, prop } = this.props;
        const { errors, touched } = this.props.form;

        return (
            <Form.Item
                {...prop}
                hasFeedback={!!errors[field.name]}
                validateStatus={errors[field.name] && touched[field.name] && "error"}
                help={!!touched[field.name] && errors[field.name]}>
                <Input
                    {...field}
                    {...prop && prop.inner}
                    className="transparent-background-color" />
            </Form.Item>
        );
    }
}

export default TextInput;