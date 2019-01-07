import * as React from 'react';
import classNames from 'classnames';
import { Button, Cascader, Col, Form, Input, InputNumber, Select } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import {
	GeyserType,
	SeedBrowserFilterRule,
	SeedBrowserFilterRuleComparator,
	SeedBrowserFilterRuleType,
	SpaceDestinationType
} from '../../../../api/models';
import { SeedBrowserFilterFormValues } from './SeedBrowserFilterForm';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

interface Props {
	values: SeedBrowserFilterFormValues;
	errors;
	touched;
	handleSubmit;
	setFieldValue;
	setFieldTouched;
	name: string;
	ruleId: number;
	groupId: number;
	onDelete: Function;
	geyserTypes: { [key: string]: GeyserType };
	spaceDestinationTypes: { [key: string]: SpaceDestinationType };
}

class BrowserFilterRuleInput extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);

		var geyserArray = Array.from(Object.keys(this.props.geyserTypes)).map(
			(value: string) => this.props.geyserTypes[value]
		);
		var spaceArray = Array.from(Object.keys(this.props.spaceDestinationTypes)).map(
			(value: string) => this.props.spaceDestinationTypes[value]
		);

		this.options = [
			{
				key: SeedBrowserFilterRuleType.Geyser,
				displayName: SeedBrowserFilterRuleType.Geyser,
				items: geyserArray
			},
			{
				key: SeedBrowserFilterRuleType.Planet,
				displayName: SeedBrowserFilterRuleType.Planet,
				items: spaceArray
			},
			{
				key: SeedBrowserFilterRuleType.Total_Output,
				displayName: SeedBrowserFilterRuleType.Total_Output,
				items: geyserArray
			}
		];
	}

	options: CascaderOptionType[];

	getCascaderValue(values: SeedBrowserFilterRule): string[] {
		if (!values || !values.type || !values.object) {
			return [];
		}

		return [
			values.type,
			values.object
		];
	}

	hasNoValues(values: SeedBrowserFilterRule): boolean {
		return this.getCascaderValue(values).length === 0;
	}

	render() {
		const {
			values,
			errors,
			touched,
			handleSubmit,
			setFieldValue,
			setFieldTouched,
			name,
			ruleId,
			groupId
		} = this.props;
		var idx = values.rules.findIndex((value) => value.id == ruleId && value.groupId == groupId);

		return (
			<Col xs={24} lg={12} className="browser-filter-field-column">
				<FormItem
					hasFeedback={!!errors[name] && !!errors[name][idx] && !!touched[name] && !!touched[name][idx]}
					validateStatus={errors[name] && errors[name][idx] && touched[name] && touched[name][idx] && 'error'}
					help={
						errors[name] &&
						errors[name][idx] &&
						touched[name] &&
						touched[name][idx] &&
						this.hasNoValues(values[name][idx]) === true && //prevents error flash after value selection
						Object.keys(errors[name][idx]).map((key) => errors[name][idx][key]).join(', ')
					}>
					<InputGroup compact className="browser-filter-rule-row">
						<Cascader
							fieldNames={{ label: 'displayName', value: 'key', children: 'items' }}
							placeholder={'Select object type'}
							displayRender={(values) =>
								values && values[0] && values[0] == SeedBrowserFilterRuleType.Total_Output
									? 'Output: ' + values[1]
									: values[1]}
							options={this.options}
							value={this.getCascaderValue(values[name][idx])}
							onChange={(value) => {
								setFieldValue(`${name}.${idx}.type`, value[0]);
								setFieldValue(`${name}.${idx}.object`, value[1]);
							}}
							expandTrigger="hover"
							className={classNames('transparent-background-color', 'browser-filter-rule-row-cascader')}
							popupClassName="dark-cascader"
							onPopupVisibleChange={(popupVisible: boolean) => {
								if (!popupVisible) {
									setFieldTouched(`${name}.${idx}.type`);
									setFieldTouched(`${name}.${idx}.object`);
								}
							}}
						/>

						<Select
							onChange={(value) => setFieldValue(`${name}.${idx}.comparator`, value)}
							onBlur={() => setFieldTouched(`${name}.${idx}.comparator`)}
							value={values[name][idx].comparator}
							className={classNames('transparent-background-color', 'browser-filter-rule-row-select')}>
							{Object.keys(SeedBrowserFilterRuleComparator).map((value: string) => {
								return (
									<Option
										value={SeedBrowserFilterRuleComparator[value]}
										key={value}
										className="transparent-background-color">
										{SeedBrowserFilterRuleComparator[value]}
									</Option>
								);
							})}
						</Select>

						<InputNumber
							min={0}
							className={classNames('transparent-background-color', 'browser-filter-rule-row-number')}
							value={values[name][idx].value}
							onChange={(value) => setFieldValue(`${name}.${idx}.value`, value)}
							onBlur={() => setFieldTouched(`${name}.${idx}.value`)}
							onSubmit={handleSubmit}
							formatter={(value) =>
								values[name][idx].type == SeedBrowserFilterRuleType.Total_Output
									? `${value} kg/s`
									: `${value}`}
							parser={(value) => {
								var val = value!.replace('kg/s', '');
								var parsed = parseFloat(val);

								return (isNaN(parsed) ? 0 : parsed)
							}}
							step={values[name][idx].type == SeedBrowserFilterRuleType.Total_Output ? 0.1 : 1}
							precision={values[name][idx].type == SeedBrowserFilterRuleType.Total_Output ? 2 : 0}
						/>
					</InputGroup>

					<Button
						className="dynamic-delete-button"
						style={{ marginLeft: 10, background: 'transparent', border: 'none', marginRight: -40 }}
						icon="delete"
						onClick={() => this.props.onDelete(ruleId, groupId)}
					/>
				</FormItem>
			</Col>
		);
	}
}

export default BrowserFilterRuleInput;
