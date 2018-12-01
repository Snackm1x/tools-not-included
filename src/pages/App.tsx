import * as React from 'react';
import Routes from './Routes';
import { ApplicationState } from '../store';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Store } from 'redux';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import SubNavbar from '../components/SubNavbar';
import Footer from '../components/Footer';
const { Content } = Layout;

interface RootProps {
	history: History;
	store: Store<ApplicationState>;
}

class App extends React.Component<RootProps> {
	public render() {
		return (
			<ConnectedRouter history={this.props.history}>
				<Layout>
					<Navbar />
					<SubNavbar />
					<Content>
						<div id="narrow-content-container">
							<Routes />
						</div>
					</Content>
					<Footer />
				</Layout>
			</ConnectedRouter>
		);
	}
}

export default App;