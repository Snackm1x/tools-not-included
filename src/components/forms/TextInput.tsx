import * as React from 'react';
import { Form, Input } from 'antd';

interface Props {
	field;
	prop?;
	form: { touched; errors };
}

const TextInput: React.FC<Props> = (props: Props) => {
	const { field, prop } = props;
	const { errors, touched } = props.form;

	return (
		<Form.Item
			{...prop}
			hasFeedback={!!errors[field.name]}
			validateStatus={errors[field.name] && touched[field.name] && 'error'}
			help={!!touched[field.name] && errors[field.name]}>
			<Input {...field} {...prop && prop.inner} className="transparent-background-color" />
		</Form.Item>
	);
};

export default TextInput;
