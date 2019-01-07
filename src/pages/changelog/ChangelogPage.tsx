import * as React from 'react';
import { Row, Spin } from 'antd';
import * as Markdown from 'react-markdown';

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
				<div className="changelog" style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', paddingTop: 24, textAlign: 'justify' }}>
					{/* <div style={{ textAlign: 'justify', width: '60%', marginTop: 24 }}>
						<Row type="flex" style={{ justifyContent: 'center' }}>
							<h1>Changelog</h1>
						</Row>
						<Row>
							<h3>6.01.2019</h3>
						</Row>
						<Row>
							<p>
								You can contribute to the seed database by downloading and installing a dedicated game
								mod. There are two mod versions: <b>manual</b> and <b>automatic</b>. <br />
								<br />
								The <b>manual version</b> is intended to be used during normal play and it does not
								interfere with the game itself except for the moment of upload.<br />
								<br />
								The <b>automatic version</b> (jokingly called a seed miner) is a non-interactive tool
								that will manage your game in background by repeatedly starting new worlds and uploading
								the seed data - all on its own. It removes parts of the game starting process to make
								uploading quicker, therefore it is supposed to{' '}
								<b>only be used while seed hunting automatically</b> and <b>not while playing</b>.
							</p>
						</Row>
						<br />					
                    </div> */}
                    <Markdown source="
# Changelog
### 8 January 2019
Out of beta! Yay!
* The entire front-end rewritten
* The seed browser filter has been expanded with a custom rule builder
* Seed details page shows a star map
* Various performance improvements

From now on, two mods will be maintained: manual and automatic (ending with an a). Automatic version (aka the seed miner - not suitable for playing, seed uploading only) works in background and automatically generates and uploads new worlds without interaction. For more information please refer to the [Mod Info Page](/seeds/modinfo)
* Mod versions 1.0.0 and 1.0.0.a:
  * Collecting data about world element composition

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
