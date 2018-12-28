import * as React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ConnectedReduxProps, ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { Seed, GeyserType, GameUpgrade, SpaceDestinationType, AddInvalidSeedReportRequest } from 'src/api/models';
import { Card, Row, Col } from 'antd';
import SeedSummary from './components/SeedSummary';
import { SeedDetailsRequestModel } from 'src/api/request-models';
import { Dispatch } from 'redux';
import { getSeed, reportInvalidSeed } from 'src/store/seed-browser/actions';

interface PropsFromState {
    loading: boolean,
    seed: Seed,
    geyserTypes: { [key: string]: GeyserType },
	gameUpgrades: { [key: string]: GameUpgrade },
	spaceDestinationTypes: { [key: string]: SpaceDestinationType }
}

interface UrlParams {
    seed: string,
    version: string
}

interface PropsFromDispatch {
    getSeed: typeof getSeed
    reportSeedInvalid: typeof reportInvalidSeed
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps & WithNamespaces  & RouteComponentProps<UrlParams>;

class SeedDetailsPage extends React.Component<AllProps> {

	componentDidMount() {
		this.props.getSeed({ seedNumber: this.props.match.params.seed, gameVersion: this.props.match.params.version });
    }
    
    reportSeedInvalid = (seedNumber: number, gameVersion: number) => {
        this.props.reportSeedInvalid({seedNumber, gameVersion});
    }

	public render() {
        const {seed, loading, geyserTypes, gameUpgrades, spaceDestinationTypes} = this.props;

        if (loading || !seed) return (<div/>)

		return (
			<div>
			    <SeedSummary seed={seed} geyserTypes={geyserTypes} gameUpgrades={gameUpgrades} spaceDestinationTypes={spaceDestinationTypes} onReportInvalid={this.reportSeedInvalid}/>
			</div>
		);
	}
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
    loading: seedBrowser.details.loading,
    seed: seedBrowser.details.seed,
    geyserTypes: seedBrowser.geyserTypes,
    gameUpgrades: seedBrowser.gameUpgrades,
    spaceDestinationTypes: seedBrowser.spaceDestinationTypes
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
	getSeed: (request: SeedDetailsRequestModel) => dispatch(getSeed(request)),
	reportSeedInvalid: (request: AddInvalidSeedReportRequest) => dispatch(reportInvalidSeed(request))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(SeedDetailsPage)));
