import * as React from 'react';
import { GeyserType, Geyser } from '@api/models';

type Props = {
	geysers: Geyser[];
	geyserTypes: { [key: string]: GeyserType };
	biomeMap: { [key: string]: string };
};

const biomeColors = {
	Caustic: '#4403a5',
	Cold: '#0044a5',
	Magma: '#a0041e',
	Oil: '#000000',
	Slime: '#098402',
	Space: 'url(#spaceImg)',
	Starting: '#82633d'
};

class GeyserMap extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}
	public render() {
		var podImg = `/images/printingpod.png`;
		var bg = `/images/map-bg.png`;
		var spaceBg = `/images/space_00.png`;
		var url = `url(${bg})`;
		return (
			<div style={{ backgroundImage: url }}>
				<svg viewBox="0 0 256 384" width="100%" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="spaceImg" patternUnits="userSpaceOnUse" width="100" height="100">
							<image href={spaceBg} x="0" y="0" width="100" height="100" />
						</pattern>
					</defs>
					<image href={podImg} width="15" x={123} y={384 - 200} />
					{Object.keys(this.props.biomeMap).map((key: string) => (
						<path
							key={key}
							d={this.props.biomeMap[key]}
							fill={biomeColors[key]}
							fillOpacity={key === 'Space' ? 1 : 0.3}
						/>
					))}
					{this.props.geysers.map((geyser: Geyser) => {
						var imageFile = `/images/geysers/${geyser.type.toLowerCase()}.png`;
						return (
							<image
								href={imageFile}
								height="10"
								width="10"
								x={geyser.posX! - 5}
								y={384 - geyser.posY! - 5}
							/>
						);
					})}
				</svg>
			</div>
		);
	}
}

export default GeyserMap;
