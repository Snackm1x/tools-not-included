import * as React from 'react';
import { ElementBasicInfo } from '@api/models';
import LiquidIcon from './LiquidIcon';
import { Icon, Col, Row, Card } from 'antd';
import GasIcon from './GasIcon';
import SolidIcon from './SolidIcon';
import { groupBy } from '@utils/groupBy';

interface Props {
	biomeSizes: { [key: string]: number };
	startingBiomeElementMasses: { [key: string]: number };
	elementMasses: { [key: string]: number };
	elements: { [key: string]: ElementBasicInfo };
}

const worldSize = 256 * 384;

const categories = {
	Agriculture: 'Agriculture',
	Breathable: 'Breathable Gases',
	BuildableProcessed: 'Unused?', //shouldnt be present here
	BuildableRaw: 'Raw Minerals',
	ConsumableOre: 'Consumable',
	Farmable: 'Farmable',
	Filter: 'Filter',
	Liquid: 'Liquids',
	Liquifiable: 'Liquifiable',
	ManufacturedMaterial: 'Manufactured',
	Metal: 'Raw Metals',
	Organics: 'Organic',
	Other: 'Others',
	RareMaterials: 'Rare Materials', //shouldnt be present here
	RefinedMetal: 'Refined Metals', //shouldnt be present here
	Solid: 'Solid', //shouldnt be present here
	Special: 'Special', //shouldnt be present here
	Unbreathable: 'Unbreathable Gases'
};

var formatMass = (mass: number) => {
	var unit = 'kg';
	var newMass = mass;

	if (newMass > 1000) {
		newMass = newMass / 1000;
		unit = 't';
	}

	return `${newMass.toFixed(2)} ${unit}`;
};

const getIconForElement = (state: string, substanceColor: string) => {
	switch (state) {
		case 'Liquid':
			return LiquidIcon(30, substanceColor);
		case 'Solid':
			return SolidIcon(20, substanceColor);
		case 'Gas':
			return GasIcon(30, substanceColor);
	}
	return SolidIcon(20, '000');
};

const WorldDetails: React.FC<Props> = (props: Props) => {
	const { biomeSizes, startingBiomeElementMasses, elementMasses, elements } = props;

	var biomeKeys = Object.keys(biomeSizes);
	var startingElementsKeys = Object.keys(startingBiomeElementMasses).sort((name1: string, name2: string) =>
		elements[name1].displayName.localeCompare(elements[name2].displayName)
	);
	var elementsKeys = Object.keys(elementMasses).sort((name1: string, name2: string) =>
		elements[name1].displayName.localeCompare(elements[name2].displayName)
	);

	return (
		<Card className="shadow-card card-full-width" bordered={false}>
			<h2 style={{ textAlign: 'center' }}>Biome Sizes</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'center'
				}}>
				{biomeKeys.map((key: string, idx: number) => (
					<Col key={key} xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
						<p style={{ margin: '0 5px 0 5px' }}>
							<b>{key}:</b> {biomeSizes[key]} cells ({(biomeSizes[key] / worldSize * 100).toFixed(1)}%)
						</p>
					</Col>
				))}
			</div>
			<br />
			<br />
			<h2 style={{ textAlign: 'center' }}>Starting Biome Element Masses</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'left'
				}}>
				{startingElementsKeys.map(
					(key: string, idx: number) =>
						elements[key] && (
							<Col
								key={key}
								xs={24}
								sm={12}
								md={8}
								lg={6}
								style={{ display: 'flex', height: 35, alignItems: 'center', justifyContent: 'center' }}>
								<Icon
									component={() =>
										getIconForElement(elements[key].state, elements[key].substanceColor)}
								/>
								<p style={{ margin: '0 5px 0 5px' }}>
									<b>{elements[key].displayName}:</b> {formatMass(startingBiomeElementMasses[key])}
								</p>
							</Col>
						)
				)}
			</div>
			<br />
			<br />
			<h2 style={{ textAlign: 'center' }}>World Element Masses</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'left'
				}}>
				{elementsKeys.map(
					(key: string, idx: number) =>
						elements[key] && (
							<Col key={key} xs={24} sm={12} md={8} lg={6}>
								<div
									style={{
										display: 'flex',
										height: 35,
										alignItems: 'center',
										justifyContent: 'center'
									}}>
									<Icon
										component={() =>
											getIconForElement(elements[key].state, elements[key].substanceColor)}
									/>
									<p style={{ margin: '0 5px 0 5px' }}>
										<b>{elements[key].displayName}:</b> {formatMass(elementMasses[key])}
									</p>
								</div>
							</Col>
						)
				)}
			</div>
		</Card>
	);
};

export default WorldDetails;
