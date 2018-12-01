import * as React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ConnectedReduxProps, ApplicationState } from '../../../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedBrowser from './components/SeedBrowser';
import { Seed } from 'src/api/models';
import { fetchDetailsRequest } from 'src/store/seed-browser/actions';
import SeedCard from './components/SeedCard';
import { SeedDetailsRequestModel } from 'src/api/request-models';

interface PropsFromState {
	seed: Seed,
	loading: boolean
}

interface PropsFromDispatch {
	getSeed: typeof fetchDetailsRequest
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps & WithNamespaces;

class SeedBrowserPage extends React.Component<AllProps> {

	componentDidMount() {
        this.props.getSeed({ seedNumber: "489631163", gameVersion: "298981" });
    }

	public render() {
		const { t } = this.props;
		return (
			//	<SeedBrowser/>
			<div>
				{!this.props.loading && <SeedCard seed={this.props.seed} />}
			</div>
		);
	}
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
	seed: seedBrowser.details.seed,
	loading: seedBrowser.details.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getSeed: (request: SeedDetailsRequestModel) => dispatch(fetchDetailsRequest(request))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(SeedBrowserPage)));
