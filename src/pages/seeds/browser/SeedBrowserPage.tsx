import * as React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ConnectedReduxProps, ApplicationState } from '../../../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedBrowser from './components/SeedBrowser';
import { Seed, GeyserType, GameUpgrade } from 'src/api/models';
import { getSeed } from 'src/store/seed-browser/actions';
import SeedCard from './components/SeedCard';
import { SeedDetailsRequestModel } from 'src/api/request-models';

interface PropsFromState {
	seed: Seed,
	loading: boolean,
	geyserTypes: { [key: string]: GeyserType }
	gameUpgrades: { [key: string]: GameUpgrade }
}

interface PropsFromDispatch {
	getSeed: typeof getSeed
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps & WithNamespaces;

class SeedBrowserPage extends React.Component<AllProps> {

	componentDidMount() {
        this.props.getSeed({ seedNumber: "489631163", gameVersion: "298981" });
    }

	public render() {
		const { t } = this.props;
		return (
			<div>
				{!this.props.loading && <SeedBrowser seed={this.props.seed} geyserTypes={this.props.geyserTypes} gameUpgrades={this.props.gameUpgrades} />}
			</div>
		);
	}
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
	seed: seedBrowser.details.seed,
	loading: seedBrowser.details.loading,
	geyserTypes: seedBrowser.geyserTypes,
	gameUpgrades: seedBrowser.gameUpgrades
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getSeed: (request: SeedDetailsRequestModel) => dispatch(getSeed(request))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(SeedBrowserPage)));
