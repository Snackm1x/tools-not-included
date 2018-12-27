import * as React from 'react';
import { Card, Pagination } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedCard from './SeedCard';
import { Seed, GeyserType, GameUpgrade, SpaceDestinationType, SeedBrowserFilterRuleComparator, SeedList, SeedListFilter, SeedBrowserFilter } from 'src/api/models';
import SeedBrowserFilterForm, { SeedBrowserFilterFormValues } from './SeedBrowserFilterForm';
import { ApplicationState } from 'src/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getFilteredSeeds } from 'src/store/seed-browser/actions';
import { loadFilterFormValuesFromLocalStorage, saveFilterFormValuesToLocalStorage, loadFilterPageSizeFromLocalStorage, saveFilterPageSizeToLocalStorage } from 'src/api/services/seed-browser/SeedService';
import { Link } from 'react-router-dom';

interface PropsFromState {
	seedList: SeedList,
	loading: boolean,
	geyserTypes: { [key: string]: GeyserType }
	gameUpgrades: { [key: string]: GameUpgrade }
	spaceDestinationTypes: { [key: string]: SpaceDestinationType }
}

interface PropsFromDispatch {
	getFilteredSeeds: typeof getFilteredSeeds
}

type AllProps = WithNamespaces & PropsFromState & PropsFromDispatch;

interface State {
	formValues: SeedBrowserFilterFormValues,
	page: number,
	pageSize: number
}

class SeedBrowser extends React.Component<AllProps, State> {

	constructor(props: AllProps) {
		super(props);

		this.state = {
			formValues: loadFilterFormValuesFromLocalStorage(),
			page: 1,
			pageSize: loadFilterPageSizeFromLocalStorage()
		}
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
		}

		this.props.getFilteredSeeds(filter)
	}

	handlePageChange = (page: number, pageSize?: number) => {
		this.setState({ page: page })

		var filter: SeedBrowserFilter = {
			page: page,
			pageSize: pageSize ? pageSize : this.state.pageSize,
			...this.state.formValues
		}

		this.props.getFilteredSeeds(filter)
	}

	handlePageSizeChange = (page: number, pageSize: number) => {
		var oldPageSize = this.state.pageSize;

		this.setState({ pageSize: pageSize });
		saveFilterPageSizeToLocalStorage(pageSize);

		var firstItemOnCurrentPage = (page - 1) * oldPageSize + 1;
		var newCurrentPage = Math.ceil(firstItemOnCurrentPage / pageSize);

		this.handlePageChange(newCurrentPage, pageSize);
	}

	componentDidMount() {
		this.handleSearch(this.state.formValues);
	}

	public render() {
		const { t, geyserTypes, spaceDestinationTypes } = this.props;
		return (
			<div>
				<Card className="shadow-card card-full-width" bordered={false}>
					<SeedBrowserFilterForm
						initialValues={this.state.formValues}
						geyserTypes={geyserTypes}
						spaceDestinationTypes={spaceDestinationTypes}
						handleSubmit={this.handleSearch} />
				</Card>

				<div>
					<div style={{ width: '100%', paddingRight: 8, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Pagination size="small"
							total={this.props.seedList.totalEntries}
							showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
							current={this.state.page}
							pageSize={this.state.pageSize}
							onChange={this.handlePageChange}
							onShowSizeChange={this.handlePageSizeChange}
							showSizeChanger
							pageSizeOptions={["10", "20", "30", "40", "50"]}
							className="transparent-background-color" />
					</div>
					{
						this.props.seedList && this.props.seedList.seeds && this.props.seedList.seeds.map((seed: Seed, index: number) => {
							var url = "/seeds/" + seed.seed + "/" + seed.versionNumber
							return (
								<Link key={index} to={url} style={{ textDecoration: 'none', width: '100%' }}>
									<SeedCard seed={seed} geyserTypes={this.props.geyserTypes} gameUpgrades={this.props.gameUpgrades} />
								</Link>);
						})
					}

					{!this.props.seedList || !this.props.seedList.seeds || this.props.seedList.seeds.length > 0 &&
						<div style={{ width: '100%', paddingRight: 8, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
							<Pagination size="small"
								total={this.props.seedList.totalEntries}
								showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
								current={this.state.page}
								pageSize={this.state.pageSize}
								onChange={this.handlePageChange}
								onShowSizeChange={this.handlePageSizeChange}
								showSizeChanger
								pageSizeOptions={["10", "20", "30", "40", "50"]}
								className="transparent-background-color" />
						</div>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
	seedList: seedBrowser.list,
	loading: seedBrowser.loading,
	geyserTypes: seedBrowser.geyserTypes,
	spaceDestinationTypes: seedBrowser.spaceDestinationTypes,
	gameUpgrades: seedBrowser.gameUpgrades
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getFilteredSeeds: (request: SeedBrowserFilter) => dispatch(getFilteredSeeds(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(SeedBrowser));
