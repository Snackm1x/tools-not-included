import * as React from 'react';
import { GeyserType, Geyser } from '../../../../api/models';
import GeyserCard from './GeyserCard';

interface Props {
	geysers: Geyser[];
	geyserTypes: { [key: string]: GeyserType };
}

const GeyserList: React.SFC<Props> = (props: Props) => {
	const { geysers, geyserTypes } = props;
	return (
		<div>
			{geysers
				.sort((a: Geyser, b: Geyser) =>
					geyserTypes[a.type].displayName.localeCompare(geyserTypes[b.type].displayName)
				)
				.map((geyser: Geyser, idx: number) => (
					<GeyserCard key={idx} geyser={geyser} geyserTypes={geyserTypes} />
				))}
		</div>
	);
};

export default GeyserList;
