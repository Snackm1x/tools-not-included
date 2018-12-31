import * as React from 'react';
import {
	GameUpgrade,
	GeyserType,
	SeedBrowserFilter,
	SeedList,
	SpaceDestinationType,
    Geyser
	} from '../../../../api/models';
import GeyserCard from './GeyserCard';

export interface Props {
	geysers: Geyser[]
	geyserTypes: { [key: string]: GeyserType }
}

interface State {
}

class GeyserList extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
		
		}
	}

	public render() {
        const {  geysers, geyserTypes } = this.props;
		return (
			<div>
            {
               geysers.sort((a: Geyser, b: Geyser) => geyserTypes[a.type].displayName.localeCompare(geyserTypes[b.type].displayName)).map((geyser: Geyser, idx: number) => {
                    return (
                     <GeyserCard key={idx} geyser={geyser} geyserTypes={geyserTypes}/>
                    );
                })
            }
           </div>
		);
	}
}


export default GeyserList;
