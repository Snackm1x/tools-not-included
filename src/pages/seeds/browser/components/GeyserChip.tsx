import * as React from 'react';

interface Props {
	label: string;
	count: number;
	imgName: string;
}

const GeyserChip: React.SFC<Props> = (props: Props) => {
	const imgSrc = `/images/${props.imgName}`;
	const colorClass = props.count > 0 ? 'green' : 'red';

	return (
		<div className="chip-geyser">
			<div className="chip-geyser-img-container">
				<img className="chip-geyser-img" src={imgSrc} />
			</div>
			<h3 style={{ margin: '0px' }}>{props.label}</h3>
			<div className={'chip-geyser-count-container ' + colorClass}>
				<h3 style={{ margin: '0px' }}>{props.count}</h3>
			</div>
		</div>
	);
};

export default GeyserChip;
