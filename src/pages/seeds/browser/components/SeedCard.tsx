import * as React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import EntityCountChip from '../../../../pages/seeds/shared-components/EntityCountChip';
import { GeyserType, GameUpgrade, SeedListItem } from '../../../../api/models';
import NoPlanetIcon from '../../shared-components/NoPlanetIcon';
import NoElementsIcon from '@pages/seeds/shared-components/NoElementsIcon';

export interface Props {
	seed: SeedListItem;
	geyserTypes: { [key: string]: GeyserType };
	gameUpgrades: { [key: string]: GameUpgrade };
	showNonPresent: boolean;
}

class SeedCard extends React.Component<Props> {
	public render() {
		const { seed, geyserTypes, gameUpgrades, showNonPresent } = this.props;
		const creationDate = new Date(seed.creationDate);

		return (
			<Card className="shadow-card card-full-width seed-card" bordered={false}>
				<Row type="flex">
					<Col className="seed-card-row-left">
						<p>Seed: {seed.seed}</p>
						<p style={{ textAlign: 'center' }}>{gameUpgrades[seed.gameUpgrade].displayName}</p>
						<p>
							{gameUpgrades[seed.gameUpgrade].symbol}-{seed.versionNumber}
						</p>
					</Col>
					<Col className="seed-card-row-right">
						{Object.keys(geyserTypes).map((geyserType: string, index: number) => {
							var count = seed.geyserQuantities[geyserType];

							if (!showNonPresent && count === 0) {
								return;
							}

							var imageFile = `geysers/mini/${geyserType.toLowerCase()}.png`;
							return (
								<EntityCountChip
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
					<p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9em', marginBottom: '0.5em' }}>
						Added on {creationDate.toDateString()} {creationDate.toLocaleTimeString()}
					</p>
					<div style={{marginLeft: 'auto'}}/>
					{seed.modVersion < 1 && <NoElementsIcon style={{ height: 22, marginTop: -2 }} />}
					{Object.keys(seed.spaceDestinationQuantities)
						.map((key) => seed.spaceDestinationQuantities[key])
						.reduce(function(a, b) {
							return a + b;
						}) == 0 && <NoPlanetIcon style={{ height: 22, marginTop: -2 }} />}
				</Row>
			</Card>
		);
	}
}

export default SeedCard;
