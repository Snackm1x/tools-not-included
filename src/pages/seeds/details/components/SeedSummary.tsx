import * as React from 'react';
import EntityCountChip from '../../shared-components/EntityCountChip';
import { Card, Icon, Modal, Row, Switch } from 'antd';
import { GameUpgrade, GeyserType, Seed, SpaceDestinationType } from '../../../../api/models';
import {
	loadDetailsShowNonPresentFromLocalStorage,
	saveDetailsShowNonPresentToLocalStorage
} from '../../../../api/services/seed-browser/SeedService';
import NoPlanetIcon from '../../shared-components/NoPlanetIcon';

export interface Props {
	seed: Seed;
	geyserTypes: { [key: string]: GeyserType };
	gameUpgrades: { [key: string]: GameUpgrade };
	spaceDestinationTypes: { [key: string]: SpaceDestinationType };
	onReportInvalid: Function;
}

interface State {
	showNonPresentTypes: boolean;
}

class SeedSummary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = { showNonPresentTypes: loadDetailsShowNonPresentFromLocalStorage() };
	}

	changeShowNonPresent = (show: boolean): void => {
		saveDetailsShowNonPresentToLocalStorage(show);
		this.setState({ showNonPresentTypes: show });
	};

	reportSeedAsInvalid = () => {
		Modal.confirm({
			title: 'Invalid seed',
			content:
				'This seed will be marked for manual verification. Before submitting please make sure you are not using any world generation altering mods.',
			okText: 'Report',
			cancelText: 'Cancel',
			onOk: () => this.props.onReportInvalid(this.props.seed.seed, this.props.seed.versionNumber)
		});
	};

	render() {
		const { seed, gameUpgrades, geyserTypes, spaceDestinationTypes } = this.props;
		const creationDate = new Date(seed.creationDate);

		return (
			<Card className="shadow-card card-full-width" bordered={false}>
				<div
					style={{
						display: 'flex',
						flexFlow: 'column wrap',
						justifyContent: 'center',
						alignContent: 'center',
						width: '100%'
					}}>
					<Row type="flex" style={{ justifyContent: 'flex-start', marginTop: -8 }}>
						{seed.spaceDestinations.length == 0 && <NoPlanetIcon style={{ height: 22, marginTop: -1 }} />}
						<a style={{ marginLeft: 'auto' }}>
							<p className="hover-text-danger" onClick={this.reportSeedAsInvalid} style={{fontSize: "0.9em", margin: 0}}>
								Report as invalid
							</p>
						</a>
					</Row>
					<Row type="flex" style={{ justifyContent: 'center' }}>
						<h2 style={{ marginBottom: 0 }}>Seed {seed.seed}</h2>
					</Row>
					<Row type="flex" style={{ justifyContent: 'center' }}>
						<p style={{ marginBottom: 0 }}>
							{gameUpgrades[seed.gameUpgrade].displayName} - {gameUpgrades[seed.gameUpgrade].symbol}-{seed.versionNumber}
						</p>
					</Row>
					<Row type="flex" style={{ justifyContent: 'center', marginTop: 24, marginBottom: 24 }}>
						{Object.keys(geyserTypes).map((geyserType: string, index: number) => {
							var count = seed.geyserQuantities[geyserType];

							if (!this.state.showNonPresentTypes && count === 0) return;

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
					</Row>
					<Row type="flex" style={{ justifyContent: 'center', marginBottom: 30 }}>
						{Object.keys(spaceDestinationTypes).map((spaceDestinationType: string, index: number) => {
							var count = seed.spaceDestinationQuantities[spaceDestinationType];

							if (!this.state.showNonPresentTypes && count === 0) return;

							var imageFile = `planets/mini/${spaceDestinationType.toLowerCase()}.png`;
							return (
								<EntityCountChip
									key={index}
									count={count}
									label={spaceDestinationTypes[spaceDestinationType].displayName}
									imgName={imageFile}
								/>
							);
						})}
					</Row>
					<Row type="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: -8 }}>
						<p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.9em' }}>
							Added on {creationDate.toDateString()} {creationDate.toLocaleTimeString()}
						</p>
						<div style={{ display: 'inline-flex', alignItems: 'center' }}>
							<p style={{ margin: '0px 5px 0px 0px', fontSize: "0.9em"}}>
								Show geyser and planet types not present on the map
							</p>
							<Switch
								checkedChildren={<Icon type="check" />}
								unCheckedChildren={<Icon type="close" />}
								checked={this.state.showNonPresentTypes}
								onChange={this.changeShowNonPresent}
							/>
						</div>
					</Row>
				</div>
			</Card>
		);
	}
}

export default SeedSummary;
