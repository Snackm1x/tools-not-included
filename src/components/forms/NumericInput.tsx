import * as React from 'react';
import { Form, InputNumber } from 'antd';

interface Props {
	field;
	prop?;
	form: { touched; errors; setFieldValue; setFieldTouched };
}

const NumericInput: React.FC<Props> = (props: Props) => {
	const { field, prop } = props;
	const { errors, touched, setFieldValue } = props.form;

	return (
		<Form.Item
			{...prop}
			hasFeedback={!!errors[field.name]}
			validateStatus={errors[field.name] && touched[field.name] && 'error'}
			help={!!touched[field.name] && errors[field.name]}>
			<InputNumber
				{...field}
				{...prop && prop.inner}
				onChange={(value) => setFieldValue(field.name, value)}
				step={prop && prop.inner && prop.inner.step ? prop.inner.step : 1}
			/>
		</Form.Item>
	);
};

export default NumericInput;
