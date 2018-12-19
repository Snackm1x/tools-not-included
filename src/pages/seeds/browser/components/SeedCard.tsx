import * as React from 'react';
import { Button, Card, Row, Col, Divider } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import GeyserChip from 'src/pages/seeds/browser/components/GeyserChip';
import { Seed, Geyser, GeyserType, GameUpgrade } from 'src/api/models';
import { seedBrowserReducer } from 'src/store/seed-browser/reducer';

type AllProps = WithNamespaces & Props;

export interface Props {
	seed: Seed,
	geyserTypes: { [key: string]: GeyserType }
	gameUpgrades: { [key: string]: GameUpgrade }
}

class SeedCard extends React.Component<AllProps> {
	public render() {
		const { t, seed, geyserTypes, gameUpgrades } = this.props;

		if (!seed || geyserTypes == {} || gameUpgrades == {}) return <div /> //todo

		const creationDate = new Date(seed.creationDate);

		return (
			<Card className="shadow-card card-full-width seed-card" bordered={false}>
				<Row type='flex'>
					<Col className="seed-card-row-left">
						<h3>Seed: {seed.seed}</h3>
						<h3>{gameUpgrades[seed.gameUpgrade].displayName}</h3>
						<h3>{gameUpgrades[seed.gameUpgrade].symbol} - {seed.versionNumber}</h3>
					</Col>
					<Col className="seed-card-row-right" >
						{Object.keys(geyserTypes).map((geyserType: string, index: number) => {
							var imageFile = `geysers/mini/${geyserType.toLowerCase()}.png`
							return (<GeyserChip key={index} count={seed.geyserQuantities[geyserType]} label={geyserTypes[geyserType].displayName} imgName={imageFile} />)
						})}
					</Col>
				</Row>
				<Row type='flex'>
					<Divider style={{ background: 'rgba(255, 255, 255, 0.25)', margin: '0.5em 0px' }} />
					<h4 style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Added on {creationDate.toDateString()} {creationDate.toLocaleTimeString()}</h4>
				</Row>
			</Card>
		);
	}
}


export default withNamespaces()(SeedCard);
