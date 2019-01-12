import * as React from 'react';
import SeedBrowserFilterForm, { SeedBrowserFilterFormValues } from './SeedBrowserFilterForm';
import SeedCard from './SeedCard';
import { ApplicationState } from '../../../../store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
	GameUpgrade,
	GeyserType,
	Seed,
	SeedBrowserFilter,
	SeedList,
	SpaceDestinationType,
	SeedListItem
} from '../../../../api/models';
import { getFilteredSeeds } from '../../../../store/seed-browser/actions';
import { Icon, Pagination, Spin, Switch } from 'antd';
import { Link } from 'react-router-dom';
import {
	loadDetailsShowNonPresentFromLocalStorage,
	loadFilterFormValuesFromLocalStorage,
	loadFilterPageFromSessionStorage,
	loadFilterPageSizeFromLocalStorage,
	saveDetailsShowNonPresentToLocalStorage,
	saveFilterFormValuesToLocalStorage,
	saveFilterPageSizeToLocalStorage,
	saveFilterPageToSessionStorage
} from '../../../../api/services/seed-browser/SeedService';

interface PropsFromState {
	seedList: SeedList;
	seedListReloading: boolean;
	geyserTypes: { [key: string]: GeyserType };
	gameUpgrades: { [key: string]: GameUpgrade };
	spaceDestinationTypes: { [key: string]: SpaceDestinationType };
}

interface PropsFromDispatch {
	getFilteredSeeds: typeof getFilteredSeeds;
}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
	formValues: SeedBrowserFilterFormValues;
	page: number;
	pageSize: number;
	showNonPresentTypes: boolean;
	loading: boolean;
}

class SeedBrowser extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);

		this.state = {
			formValues: loadFilterFormValuesFromLocalStorage(),
			page: loadFilterPageFromSessionStorage(),
			pageSize: loadFilterPageSizeFromLocalStorage(),
			showNonPresentTypes: loadDetailsShowNonPresentFromLocalStorage(),
			loading: true
		};
	}

	handleSearch = (values: SeedBrowserFilterFormValues) => {
		var page = this.state.page;

		if (values !== this.state.formValues) {
			saveFilterFormValuesToLocalStorage(values);
			this.setState({ formValues: values, page: 1 });
			page = 1;
		}

		var filter: SeedBrowserFilter = {
			page: page,
			pageSize: this.state.pageSize,
			...values
		};

		this.props.getFilteredSeeds(filter);
	};

	handlePageChange = (page: number, pageSize?: number) => {
		this.setState({ page: page });

		var filter: SeedBrowserFilter = {
			page: page,
			pageSize: pageSize ? pageSize : this.state.pageSize,
			...this.state.formValues
		};
		saveFilterPageToSessionStorage(page);
		this.props.getFilteredSeeds(filter);
	};

	handlePageSizeChange = (page: number, pageSize: number) => {
		var oldPageSize = this.state.pageSize;

		this.setState({ pageSize: pageSize });
		saveFilterPageSizeToLocalStorage(pageSize);

		var firstItemOnCurrentPage = (page - 1) * oldPageSize + 1;
		var newCurrentPage = Math.ceil(firstItemOnCurrentPage / pageSize);

		this.handlePageChange(newCurrentPage, pageSize);
	};

	changeShowNonPresent = (show: boolean): void => {
		saveDetailsShowNonPresentToLocalStorage(show);
		this.setState({ showNonPresentTypes: show });
	};

	componentDidMount() {
		this.handleSearch(this.state.formValues);
	}

	componentDidUpdate(prevProps: AllProps) {
		if (this.props !== prevProps) {
			if (
				this.state.loading &&
				Object.keys(this.props.geyserTypes).length > 0 &&
				Object.keys(this.props.spaceDestinationTypes).length > 0 &&
				Object.keys(this.props.gameUpgrades).length > 0
			) {
				this.setState({ loading: false });
			}
		}
	}

	public render() {
		const { geyserTypes, spaceDestinationTypes } = this.props;

		return (
			<Spin spinning={this.state.loading} wrapperClassName="nontransparent fixed" size="large">
				{!this.state.loading && (
					<div className="card-full-width" style={{ margin: 24 }}>
						<SeedBrowserFilterForm
							initialValues={this.state.formValues}
							geyserTypes={geyserTypes}
							spaceDestinationTypes={spaceDestinationTypes}
							handleSubmit={this.handleSearch}
						/>
					</div>
				)}
				<Spin spinning={this.props.seedListReloading} size="large">
					<div
						style={{
							width: '100%',
							paddingRight: 8,
							paddingLeft: 16,
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-between'
						}}>
						<div style={{ display: 'inline-flex', alignItems: 'center', margin: "5px 5px 0 0" }}>
							<p style={{ margin: '0px 15px 0px 0px' }}>Show geyser types not present on the map</p>
							<Switch
								checkedChildren={<Icon type="check" />}
								unCheckedChildren={<Icon type="close" />}
								checked={this.state.showNonPresentTypes}
								onChange={this.changeShowNonPresent}
							/>
						</div>
						<Pagination
							size="small"
							total={this.props.seedList.totalEntries}
							showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
							current={this.state.page}
							pageSize={this.state.pageSize}
							onChange={this.handlePageChange}
							onShowSizeChange={this.handlePageSizeChange}
							showSizeChanger
							pageSizeOptions={[ '10', '20', '30', '40', '50' ]}
							className="transparent-background-color"
							style={{marginTop: 5}}
						/>
					</div>
					{this.props.seedList &&
						this.props.seedList.seeds &&
						this.props.seedList.seeds.map((seed: SeedListItem, index: number) => {
							var url = '/seeds/' + seed.seed + '/' + seed.versionNumber;
							return (
								<Link key={index} to={url} style={{ textDecoration: 'none', width: '100%' }}>
									<SeedCard
										seed={seed}
										geyserTypes={this.props.geyserTypes}
										gameUpgrades={this.props.gameUpgrades}
										showNonPresent={this.state.showNonPresentTypes}
									/>
								</Link>
							);
						})}

					{!this.props.seedList ||
						!this.props.seedList.seeds ||
						(this.props.seedList.seeds.length > 0 && (
							<div
								style={{
									width: '100%',
									paddingRight: 8,
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'flex-end',
									paddingBottom: 24
								}}>
								<Pagination
									size="small"
									total={this.props.seedList.totalEntries}
									showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
									current={this.state.page}
									pageSize={this.state.pageSize}
									onChange={this.handlePageChange}
									onShowSizeChange={this.handlePageSizeChange}
									showSizeChanger
									pageSizeOptions={[ '10', '20', '30', '40', '50' ]}
									className="transparent-background-color"
								/>
							</div>
						))}
				</Spin>
			</Spin>
		);
	}
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
	seedList: seedBrowser.list,
	seedListReloading: seedBrowser.list.reloading,
	geyserTypes: seedBrowser.geyserTypes,
	spaceDestinationTypes: seedBrowser.spaceDestinationTypes,
	gameUpgrades: seedBrowser.gameUpgrades
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getFilteredSeeds: (request: SeedBrowserFilter) => dispatch(getFilteredSeeds(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeedBrowser);
