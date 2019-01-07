import * as React from 'react';
import Error404 from '@pages/error/Error404';
import Error500 from './error/Error500';
import SeedBrowserPage from '@pages/seeds/browser/SeedBrowserPage';
import SeedDetailsPage from '@pages/seeds/details/SeedDetailsPage';
import SeedModInfoPage from '@pages/seeds/mod-info/SeedModInfoPage';
import { Route, Switch } from 'react-router-dom';
import ChangelogPage from '@pages/changelog/ChangelogPage';
import AboutPage from '@pages/about/AboutPage';

const Routes: React.FC = () => (
	<Switch>
		<Route exact path="/" component={SeedBrowserPage} />
		<Route exact path="/seeds/:seed/:version" component={SeedDetailsPage} />
		<Route exact path="/seeds/modinfo" component={SeedModInfoPage} />
		<Route exact path="/seeds" component={SeedBrowserPage} />
		<Route exact path="/changelog" component={ChangelogPage} />
		<Route exact path="/about" component={AboutPage} />
		<Route exact path="/500" component={Error500} />
		<Route exact path="/404" component={Error404} />
		<Route component={Error404} />
	</Switch>
);

export default Routes;
