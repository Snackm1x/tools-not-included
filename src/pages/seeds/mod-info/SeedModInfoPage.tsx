import * as React from 'react';
import { Row, Spin, Alert } from 'antd';

interface Props {}

interface State {
	loading: boolean;
}

class SeedModInfoPage extends React.Component<Props, State> {
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
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div style={{ textAlign: 'justify', maxWidth: 700, margin: 24 }}>
						<Row>
							<Alert
								type="info"
								message="Current mod versions"
								description="1.0a, 1.0m (7.01.2019)"
								style={{ marginBottom: 24 }}
							/>
						</Row>
						<Row type="flex" style={{ justifyContent: 'center' }}>
							<h1>Seed Sharing Mod</h1>
						</Row>
						<Row>
							<h2>1. Introduction</h2>
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
						<Row>
							<h2>2. Download</h2>
						</Row>
						<Row>
							<p>
								You can have <b>only one mod version</b> at a time in your mods folder!<br />
								<br />
								<b>Manual</b> version:{' '}
								<a href="https://static.toolsnotincluded.net/mod/SeedSharing.dll">download</a>
								<br />
								<b>Automatic</b> version:{' '}
								<a href="https://static.toolsnotincluded.net/mod/AutoSeedSharing.dll">download</a>
								<br />
								<br />
								You will also need ModLoader, available{' '}
								<a href="https://github.com/javisar/ONI-Modloader/releases">here</a> (the most recent
								zip file)
							</p>
						</Row>
						<br />
						<Row>
							<h2>3. Get rid of all world generation modifications</h2>
						</Row>
						<Row>
							<p>
								Make sure you do not use anything that changes world generation in game in{' '}
								<b>any way</b>. This includes any Custom World Gen mod, Custom World Size mod and .yaml
								file modifications. Even the slightest changes in the world gen produce completely
								different seeds and uploading them corrupts the database. <br />
								<br />
								The site is taking precautions to stop bad seeds from being uploaded but not everything
								is possible to detect. If you upload a bad seed by accident - please contact me and I'll
								happily correct it.<br />
								<br />
								If someone is found uploading malicious data repeatedly they will be banned from further
								uploads.
							</p>
						</Row>
						<br />
						<Row>
							<h2>4. Installation</h2>
						</Row>
						<Row>
							<ol>
								<li>
									Extract the downloaded ModLoader zip into{' '}
									<pre>..\steamapps\common\OxygenNotIncluded\OxygenNotIncluded_Data\Managed</pre>{' '}
									(skip the .exe file, you will not need it)
								</li>
								<br />
								<li>
									Create folder Mods in the root game folder{' '}
									<pre>..\steamapps\common\OxygenNotIncluded\Mods</pre>
								</li>
								<li>
									Place the SeedSharing.dll OR AutoSeedSharing.dll inside the freshly created Mods
									folder
								</li>
							</ol>
						</Row>
						<br />
						<Row>
							<h2>5. How to use - manual version</h2>
						</Row>
						<Row>
							<p>
								The manual version of the mod does not interfere with normal gameplay and the mod file
								can be present while playing. There is no need to enable debug mode.<br />
								<br />
								Due to the type of collected data, the world needs to be fresh (within 60 seconds of its
								creation) and any tiels cannot be dug out. If you wish to upload your current seed,
								please generate a fresh world using that seed and upload it from a new save.<br />
								<br />
								The Pause menu has a new button - <i>Upload</i>. Clicking the button will cause
								unspawned things in the world to spawn (just like revealing the map in debug mode).<br />
								<br />
								Upon pressing <i>Upload</i> the game will contact the Tools Not Included server to
								verify whether the mod version is current and in case of wrong mod version the user will
								be informed. Next, clicking <i>OK</i> will upload the seed to the server.<br />
								<br />
								Once the seed is uploaded a window with information about how geysers and planets of
								each type there are in the world.
							</p>
						</Row>
						<br />
						<Row>
							<h2>6. How to use - automatic version</h2>
						</Row>
						<Row>
							<p>
								<b>Note:</b> remove this mod (AutoSeedSharing.dll) from the mods folder when you want to
								play and not just leave the game on for seed hunting. I suggest having a separate mod
								folder with just this mod and swap the folders when you want to start seed uploading.{' '}
								<br />
								<br />
								Launch the game and click <i>New Game</i>. The mod will take over from here and
								continuously generate and upload random seeds. By default the game stores savefiles of
								all generated worlds, so it's recommended to delete the files every now and then when
								they pile up.<br />
								<br />
								Windowed mode <b>highly recommended</b>. To quit the game click X (windowed mode) or
								press Alt+F4 (full screen).
							</p>
						</Row>
					</div>
				</div>
			</Spin>
		);
	}
}

export default SeedModInfoPage;
