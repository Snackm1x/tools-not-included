import * as React from 'react';
import { Spin, Divider, Tooltip } from 'antd';
import { SpaceDestination, SpaceDestinationType } from 'src/api/models';
import { groupBy } from 'src/utils/groupBy';

type Props = {
    spaceDestinations: SpaceDestination[];
    spaceDestinationTypes: { [key: string]: SpaceDestinationType };
};

interface State {
	loading: boolean;
	furthestDestination?: number;
}

class StarMap extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			loading: true,
			furthestDestination: Math.max.apply(
				Math,
				props.spaceDestinations.map(function(sd: SpaceDestination) {
					return sd.distance;
				})
			)
		};

		this.destinationsByDistance = groupBy(props.spaceDestinations, 'distance');
	}

	destinationsByDistance: { [key: number]: SpaceDestination[] };

	componentDidMount() {
		this.setState({ loading: false });
	}

	public render() {
		const backgroundSrc = `/images/space_00.png`;
		var url = `url(${backgroundSrc})`;
		var distances = Array.from(Array(this.state.furthestDestination! + 1).keys()).reverse();
		return (
			<Spin spinning={this.state.loading} wrapperClassName="nontransparent fixed" size="large">
				<div style={{ backgroundImage: url, padding: 24, margin: 12, boxShadow: '0 0 10px 5px #0d0d18' }}>
					{distances.map((distance: number) => {
						return (
							<React.Fragment key={distance}>
								<Divider type="horizontal" className="starmap-divider">{distance + 2}0000 km</Divider>
								<div
									style={{
										display: 'flex',
										flexFlow: 'row wrap',
										minHeight: 100,
										justifyContent: 'space-around'
									}}>
									{this.destinationsByDistance[distance] &&
										this.destinationsByDistance[
											distance
										].map((dest: SpaceDestination, index: number) => {
											var imageFile = `/images/planets/${dest.type.toLowerCase()}.png`;
											var placeLeft = Math.random() > 0.4;
											var placeRight = Math.random() > 0.6;
											return (
												<React.Fragment key={index}>
													{placeLeft && (
														<div style={{ width: 100, flexShrink: 1, flexBasis: '0px' }} />
													)}
													<Tooltip title={this.props.spaceDestinationTypes[dest.type].displayName}>
														<img
															src={imageFile}
															style={{
																objectFit: 'contain',
																maxHeight: 100,
																maxWidth: 100
															}}
														/>
													</Tooltip>
													{placeRight && (
														<div style={{ width: 100, flexShrink: 1, flexBasis: '0px' }} />
													)}
												</React.Fragment>
											);
										})}
								</div>
							</React.Fragment>
						);
					})}
				</div>
			</Spin>
		);
	}
}

export default StarMap;
