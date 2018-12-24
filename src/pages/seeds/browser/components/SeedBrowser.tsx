import * as React from 'react';
import { Button, Card } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import SeedCard from './SeedCard';
import { Seed, GeyserType, GameUpgrade, SpaceDestinationType, SeedBrowserFilterRuleComparator } from 'src/api/models';
import SeedBrowserFilterForm, { SeedBrowserFilterFormValues } from './SeedBrowserFilterForm';

type AllProps = WithNamespaces & Props;

export interface Props {
	seed: Seed,
	geyserTypes: { [key: string]: GeyserType }
	gameUpgrades: { [key: string]: GameUpgrade }
	spaceDestinationTypes:  { [key: string]: SpaceDestinationType }
}

class SeedBrowser extends React.Component<AllProps> {

	initialValues: SeedBrowserFilterFormValues =
		{
			seedNumber: undefined,
			rules: [
				{ id: 0, groupId: 0, value: 0, comparator: SeedBrowserFilterRuleComparator.At_least, object: undefined, type: undefined }
			]
		}

	public render() {
		const { t, geyserTypes, spaceDestinationTypes } = this.props;
		return (
			<div>
				<Card className="shadow-card card-full-width" bordered={false}>
					<SeedBrowserFilterForm initialValues={this.initialValues} geyserTypes={geyserTypes} spaceDestinationTypes={spaceDestinationTypes} />
				</Card>
	
				{/* <SeedCard seed={this.props.seed} geyserTypes={this.props.geyserTypes} gameUpgrades={this.props.gameUpgrades} /> */}
			</div>
		);
	}
}

export default withNamespaces()(SeedBrowser);
