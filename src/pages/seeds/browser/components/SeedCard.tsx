import * as React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import GeyserChip from 'src/pages/seeds/browser/components/GeyserChip';
import { Seed, GeyserType, GameUpgrade } from 'src/api/models';
import NoPlanetIcon from '../../shared-components/NoPlanetIcon';

type AllProps = WithNamespaces & Props;

export interface Props {
	seed: Seed;
	geyserTypes: { [key: string]: GeyserType };
	gameUpgrades: { [key: string]: GameUpgrade };
	showNonPresent: boolean;
}

class SeedCard extends React.Component<AllProps> {
	public render() {
		const { seed, geyserTypes, gameUpgrades, showNonPresent } = this.props;

		if (geyserTypes == {} || gameUpgrades == {}) return <div />; //todo

		const creationDate = new Date(seed.creationDate);

		return (
			<Card className="shadow-card card-full-width seed-card" bordered={false}>
				<Row type="flex">
					<Col className="seed-card-row-left">
						<h3 style={{ fontSize: '1.3em' }}>Seed: {seed.seed}</h3>
						<h3 style={{ fontSize: '1.3em', textAlign: 'center' }}>
							{gameUpgrades[seed.gameUpgrade].displayName}
						</h3>
						<h3 style={{ fontSize: '1.3em' }}>
							{gameUpgrades[seed.gameUpgrade].symbol}-{seed.versionNumber}
						</h3>
					</Col>
					<Col className="seed-card-row-right">
						{Object.keys(geyserTypes).map((geyserType: string, index: number) => {
							var count = seed.geyserQuantities[geyserType];

							if (!showNonPresent && count === 0) {
								return;
							}

							var imageFile = `geysers/mini/${geyserType.toLowerCase()}.png`;
							return (
								<GeyserChip
									key={index}
									count={count}
									label={geyserTypes[geyserType].displayName}
									imgName={imageFile}
								/>
							);
						})}
					</Col>
				</Row>
				<Row type="flex">
					<Divider style={{ background: 'rgba(255, 255, 255, 0.25)', margin: '0.5em 0px' }} />
					<h4 style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
						Added on {creationDate.toDateString()} {creationDate.toLocaleTimeString()}
					</h4>

					{seed.spaceDestinations.length == 0 && (
						<NoPlanetIcon style={{ marginLeft: 'auto', height: 22, marginTop: -2 }} />
					)}
				</Row>
			</Card>
		);
	}
}

export default withNamespaces()(SeedCard);
