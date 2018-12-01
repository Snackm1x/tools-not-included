import * as React from 'react';
import { Button, Card } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedCard from './SeedCard';

type AllProps = WithNamespaces;

class SeedBrowser extends React.Component<AllProps> {
	public render() {
		const { t } = this.props;
		return (
			<div>
				<Card className="shadow-card card-full-width" bordered={false}>

					<h1 className="App-title">Welcome to React</h1>

					<p className="App-intro">
						To get started, edit <code>src/App.tsx</code> and save to reload.
					</p>
					<Button type="primary">{t('testSubSpace.testSubKey')}</Button>

					<p className="App-intro">
						To get started, edit <code>src/App.tsx</code> and save to reload.
					</p>
					<Button type="primary">{t('testSubSpace.testSubKey')}</Button>

					<h1 className="App-title">Welcome to React</h1>

					<p className="App-intro">
						To get started, edit <code>src/App.tsx</code> and save to reload.
					</p>
					<Button type="primary">{t('testSubSpace.testSubKey')}</Button>

					
				</Card>
			</div>
		);
	}
}


export default withNamespaces()(SeedBrowser);
