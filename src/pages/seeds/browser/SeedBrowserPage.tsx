import * as React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ConnectedReduxProps, ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedBrowser from './components/SeedBrowser';

interface PropsFromState {
	loading: boolean
}

type AllProps = PropsFromState & ConnectedReduxProps & RouteComponentProps & WithNamespaces;

class SeedBrowserPage extends React.Component<AllProps> {

	public render() {
		return (
			<div>
				{!this.props.loading && <SeedBrowser/>}
			</div>
		);
	}
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
	loading: seedBrowser.details.loading
});


export default withRouter(connect(mapStateToProps)(withNamespaces()(SeedBrowserPage)));
