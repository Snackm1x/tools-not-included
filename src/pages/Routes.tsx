import * as React from 'react';
import CoffeePage from './coffee/CoffeePage';
import Error404 from './error/Error404';
import Error500 from './error/Error500';
import SeedBrowserPage from './seeds/browser/SeedBrowserPage';
import SeedDetailsPage from './seeds/details/SeedDetailsPage';
import SeedModInfoPage from './seeds/mod-info/SeedModInfoPage';
import { Route, Switch } from 'react-router-dom';

const Routes: React.SFC = () => (
	<Switch>
		<Route exact path="/" component={SeedBrowserPage} />
		<Route exact path="/seeds/:seed/:version" component={SeedDetailsPage} />
		<Route exact path="/seeds/modinfo" component={SeedModInfoPage} />
		<Route exact path="/seeds" component={SeedBrowserPage} />
		<Route exact path="/500" component={Error500} />
		<Route exact path="/404" component={Error404} />
		<Route component={Error404} />
	</Switch>
);

export default Routes;
