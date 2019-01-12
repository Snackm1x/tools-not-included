import * as React from 'react';
import BrowserFilterRuleInput from './BrowserFilterRuleInput';
import classNames from 'classnames';
import FormItem from 'antd/lib/form/FormItem';
import NumericInput from '../../../../components/forms/NumericInput';
import SeedBrowserFilterFormValidationSchema, { maxRules } from '../validation/SeedBrowserFilterFormValidationSchema';
import { Alert, Button, Col, Divider, Form, Icon, Input, Modal, Row } from 'antd';
import { Base64 } from 'js-base64';
import { Field, FieldArray, FieldArrayRenderProps, FormikProps, withFormik } from 'formik';
import {
	GeyserType,
	SeedBrowserFilterRule,
	SeedBrowserFilterRuleComparator,
	SpaceDestinationType
} from '../../../../api/models';
import { groupBy } from '../../../../utils/groupBy';

export interface SeedBrowserFilterFormValues {
	seedNumber?: number;
	rules: SeedBrowserFilterRule[];
}

interface SeedBrowserFilterFormProps {
	initialValues: SeedBrowserFilterFormValues;
	geyserTypes: { [key: string]: GeyserType };
	spaceDestinationTypes: { [key: string]: SpaceDestinationType };
	handleSubmit: Function;
}

interface SeedBrowserFilterState {
	nextRuleId: number;
	nextGroupId: number;
}

const InitialRuleValue = {
	value: 0,
	comparator: SeedBrowserFilterRuleComparator.At_least,
	object: undefined,
	type: undefined
};

type AllProps = SeedBrowserFilterFormProps & FormikProps<SeedBrowserFilterFormValues>;

class SeedBrowserFilterForm extends React.Component<AllProps, SeedBrowserFilterState> {
	constructor(props: AllProps) {
		super(props);

		var nextIndices = this.findInitialNextIds();
		this.state = { nextRuleId: nextIndices.nextRuleId, nextGroupId: nextIndices.nextGroupId };
	}

	findInitialNextIds() {
		var highestid = -1;
		var highestGroupId = -1;

		if (!this.props.initialValues.rules) return { nextRuleId: 0, nextGroupId: 0 };

		this.props.initialValues.rules.forEach((rule) => {
			if (rule.id > highestid) highestid = rule.id;
			if (rule.groupId > highestGroupId) highestGroupId = rule.groupId;
		});

		return { nextRuleId: highestid + 1, nextGroupId: highestGroupId + 1 };
	}

	addNewOrRule = (arrayHelpers: FieldArrayRenderProps, groupId: number) => {
		arrayHelpers.push({
			...InitialRuleValue,
			groupId: groupId,
			id: this.state.nextRuleId
		});
		this.setState({ nextRuleId: this.state.nextRuleId + 1 });
	};

	addNewAndRule = (arrayHelpers: FieldArrayRenderProps) => {
		arrayHelpers.push({
			...InitialRuleValue,
			groupId: this.state.nextGroupId,
			id: this.state.nextRuleId
		});

		this.setState({
			nextRuleId: this.state.nextRuleId + 1,
			nextGroupId: this.state.nextGroupId + 1
		});
	};

	resetRules = (form: FormikProps<SeedBrowserFilterFormValues>) => {
		form.setFieldValue('rules', []);
	};

	displayCopyShareCode = (ruleSet: SeedBrowserFilterFormValues) => {
		var encoded = Base64.encode(JSON.stringify(ruleSet));
		Modal.success({
			title: 'Your import code',
			content: (
				<div>
					<p>You can use this code to save and import your current rules later.</p>
					<Input style={{ marginTop: 16, marginBottom: 16, color: '#000' }} value={encoded} />
				</div>
			)
		});
	};

	importRulesFromCode = (form: FormikProps<SeedBrowserFilterFormValues>) => {
		let code;
		Modal.success({
			title: 'Your import code',
			content: (
				<div>
					<p>You can use your import code to import your saved rules.</p>
					<Input
						style={{ marginTop: 16, marginBottom: 16, color: '#000' }}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							code = e.target.value;
						}}
					/>
				</div>
			),
			onOk() {
				var decoded = Base64.decode(code);
				var parsed = JSON.parse(decoded);
				form.setValues(parsed);
			}
		});
	};

	render() {
		if (
			Object.keys(this.props.geyserTypes).length == 0 ||
			Object.keys(this.props.spaceDestinationTypes).length == 0
		)
			return null;

		const form: FormikProps<SeedBrowserFilterFormValues> = this.props;
		const groupedValues = groupBy(form.values.rules, 'groupId');

		return (
			<Form layout="vertical" onSubmit={form.handleSubmit} className="browser-filter-form">
				<Row className="browser-filter-header-row">
					<h2 style={{ marginBottom: 24 }}>Make your own rules!</h2>
				</Row>
				<FieldArray
					name="rules"
					render={(arrayHelpers) => (
						<div style={{ marginTop: 10 }}>
							{Object.keys(groupedValues).map((groupId: string) => {
								const groupRules = groupedValues[groupId];
								return (
									<Row key={groupId} className="browser-filter-rule-row-container">
										{groupRules.map((rule: SeedBrowserFilterRule) => (
											<BrowserFilterRuleInput
												{...form}
												name="rules"
												key={`group${groupId}-rule${rule.id}`}
												ruleId={rule.id}
												groupId={parseInt(groupId)}
												geyserTypes={this.props.geyserTypes}
												spaceDestinationTypes={this.props.spaceDestinationTypes}
												onDelete={(id: number, groupId: number) => {
													var arrayIdx = form.values.rules.findIndex(
														(value: SeedBrowserFilterRule) =>
															value.id == id && value.groupId == groupId
													);
													arrayHelpers.remove(arrayIdx);
												}}
											/>
										))}
										{form.values.rules &&
										form.values.rules.length < maxRules && (
											<Col xs={24} lg={12} className="browser-filter-field-column">
												<FormItem>
													<Button
														type="dashed"
														className={classNames(
															'transparent-background-color',
															'browser-filter-form-other-column'
														)}
														disabled={
															form.values.rules && form.values.rules.length >= maxRules
														}
														onClick={() =>
															this.addNewOrRule(arrayHelpers, parseInt(groupId))}>
														<p style={{ display: 'inline', marginRight: 5 }}>
															<b style={{ color: '#9BCBF6' }}> ( OR ) </b>
														</p>
													</Button>
												</FormItem>
											</Col>
										)}
										<Divider
											style={{
												background: 'rgba(255, 255, 255, 0.25)',
												margin: '0.5em 0px',
												marginBottom: 25
											}}
										/>
									</Row>
								);
							})}

							<Row className="browser-filter-rule-row-container">
								<Col xs={24} lg={12} className="browser-filter-field-column">
									{form.values.rules &&
									form.values.rules.length < maxRules && (
										<FormItem>
											<Button
												type="dashed"
												className={classNames(
													'transparent-background-color',
													'browser-filter-form-other-column'
												)}
												disabled={form.values.rules && form.values.rules.length >= maxRules}
												onClick={() => this.addNewAndRule(arrayHelpers)}>
												<p style={{ display: 'inline', marginRight: 5 }}>
													<b style={{ color: '#FAFF9A' }}>( AND )</b>
												</p>
											</Button>
										</FormItem>
									)}

									{form.values.rules &&
									form.values.rules.length >= maxRules && (
										<FormItem>
											<Alert
												className="browser-filter-max-rules-alert"
												type="info"
												showIcon
												message={`So picky! Max ${maxRules} rules please.`}
											/>
										</FormItem>
									)}
								</Col>
								<Col xs={24} lg={12} className="browser-filter-field-column">
									<Field
										name="seedNumber"
										component={NumericInput}
										prop={{
											inner: {
												max: 2147483647,
												min: 0,
												className: classNames(
													'transparent-background-color',
													'browser-filter-form-other-column'
												),
												placeholder: 'Seed number (optional)'
											}
										}}
									/>
								</Col>
							</Row>
							<Row className="browser-filter-rule-row-container">
								<Col xs={24} className="browser-filter-field-column">
									<Button
										type="ghost"
										className="browser-filter-export-button"
										onClick={() => this.displayCopyShareCode(form.values)}>
										Copy rules
									</Button>
									<Button
										type="ghost"
										className="browser-filter-import-button"
										onClick={() => this.importRulesFromCode(form)}>
										Import rules
									</Button>
									<Button
										type="ghost"
										className="browser-filter-reset-button"
										onClick={() => this.resetRules(form)}>
										Reset rules
									</Button>
									<Button type="primary" className="browser-filter-search-button" htmlType="submit">
										Search
									</Button>
								</Col>
							</Row>
						</div>
					)}
				/>
			</Form>
		);
	}
}

export default withFormik<SeedBrowserFilterFormProps, SeedBrowserFilterFormValues>({
	mapPropsToValues: (props: SeedBrowserFilterFormProps) => ({ ...props.initialValues }),
	validationSchema: SeedBrowserFilterFormValidationSchema,
	handleSubmit: (values: SeedBrowserFilterFormValues, { props }) => {
		props.handleSubmit(values);
	}
})(SeedBrowserFilterForm);
