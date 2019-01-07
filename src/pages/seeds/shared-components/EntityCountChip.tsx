import * as React from 'react';
import './entity-count-chip.less'

interface Props {
	label: string;
	count: number;
	imgName: string;
}

const EntityCountChip: React.SFC<Props> = (props: Props) => {
	const imgSrc = `/images/${props.imgName}`;
	const colorClass = props.count > 0 ? 'green' : 'red';

	return (
		<div className="entity-chip">
			<div className="entity-chip-img-container">
				<img className="entity-chip-img" src={imgSrc} />
			</div>
			<h3 style={{ margin: '0px' }}>{props.label}</h3>
			<div className={'entity-chip-count-container ' + colorClass}>
				<h3 style={{ margin: '0px' }}>{props.count}</h3>
			</div>
		</div>
	);
};

export default EntityCountChip;
