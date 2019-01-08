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
		<Route component={AboutPage} />
	</Switch>
);

export default Routes;
