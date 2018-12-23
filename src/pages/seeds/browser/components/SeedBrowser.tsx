import * as React from 'react';
import { Button, Card } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedCard from './SeedCard';
import { Seed, GeyserType, GameUpgrade } from 'src/api/models';
import SeedBrowserFilterForm from './SeedBrowserFilterForm';

type AllProps = WithNamespaces & Props;

export interface Props {
	seed: Seed,
	geyserTypes: { [key: string]: GeyserType }
	gameUpgrades: { [key: string]: GameUpgrade }
}

export interface State {

}

class SeedBrowser extends React.Component<AllProps, State> {
	public render() {
		const { t } = this.props;
		return (
			<div>
				<Card className="shadow-card card-full-width" bordered={false}>
					<SeedBrowserFilterForm />
				</Card>
	
				<SeedCard seed={this.props.seed} geyserTypes={this.props.geyserTypes} gameUpgrades={this.props.gameUpgrades} />
			</div>
		);
	}
}

export default withNamespaces()(SeedBrowser);
