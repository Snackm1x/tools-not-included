import * as React from 'react';
import { Spin } from 'antd';
import * as Markdown from 'react-markdown';
import './changelog.less'

interface Props {}

interface State {
	loading: boolean;
}

class ChangelogPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	public render() {
		return (
			<Spin spinning={this.state.loading} wrapperClassName="nontransparent fixed" size="large">
				<div id="changelog">
                    <Markdown source="
# Changelog
### 8 January 2019
* Hotfix for mods addressing issue that was preventing connection.

### 7 January 2019
Out of beta! Yay! Due to world element composition being collected, worlds uploaded need to be fresh - within 60 seconds of creation and with no cells dug. If your seed turns out to be great mid-game, you can still create a fresh world with that seed and upload it!
* The entire front-end rewritten
* The seed browser filter has been expanded with a custom rule builder
* Seed details page shows a star map
* Various performance improvements

From now on, two mods will be maintained: manual and automatic. Automatic version (aka the seed miner - not suitable for playing, seed uploading only) works in background and automatically generates and uploads new worlds without interaction. For more information please refer to the [Mod Info Page](/seeds/modinfo)
* Mod versions 1.0a(utomatic) and 1.0m(anual):
  * Mods do not require debug mode anymore
  * Collecting data about world element composition
* Mod version 1.0m:
  * Constraint: uploaded worlds need to be within 60 seconds of their creation and with no cells dug out.

### December 2018
* Updated roughly 1000 seeds so that there are no more seeds left without geyser detailed statistcs or lack of Oil Reservoir info

### 23 November 2018
* Mod version 0.3.0 and 0.4.0 (hotfix):
  * Collection of planet and geyser location data

### 21 October 2018
* Mod version 0.2.0:
  * Collecting Oil Reservoir data

### 19 October 2018
Initial demo release
					"/>
				</div>
			</Spin>
		);
	}
}

export default ChangelogPage;
