import * as React from 'react';
import { Spin, Icon } from 'antd';
import IconK from './components/IconK';
import './about.less';

interface Props {}

interface State {
	loading: boolean;
}

class AboutPage extends React.Component<Props, State> {
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
				<div id="about">
					<h1>Hiya!</h1>
					<p>
						I'm Cairath, nice to meet you!<br />
						<br />
						I am an avid gamer and Oxygen Not Included fan who happens to be a Software Developer at the
						same time, so in my free time I like to create mods and game tools like this website.<br />
						<br />
						For now, this website is <i>just</i> a seed browser, but I have plans to turn it into a base of
						various game tools and a mod directory (yes, ONI has actual mods!)
					</p>

					<p>
						Please, report all issues or suggestions in the project's issue repository. You can also visit
						the forum thread: <br />
						<Icon type="github" style={{ marginTop: 10, fontSize: 17, marginRight: 5 }} />{' '}
						<a href="https://github.com/Cairath/tools-not-included/issues">Github - issues</a>
						<br />
						<Icon component={() => IconK(15)} style={{ marginTop: 10, marginRight: 5 }} />{' '}
						<a href="https://forums.kleientertainment.com/forums/topic/97050-tool-seed-browser-website-beta">
							Forum thread
						</a>
					</p>
					<br />
					<p>
						You could give my game mods a shot, too! They're available in the Github repository and have
						their Klei forums thread. <br />
						<Icon type="github" style={{ marginTop: 10, fontSize: 17, marginRight: 5 }} />{' '}
						<a href="https://github.com/Cairath/ONI-Mods">Github - mods</a>
						<br />
						<Icon component={() => IconK(15)} style={{ marginTop: 10, marginRight: 5 }} />{' '}
						<a href="https://forums.kleientertainment.com/forums/topic/94120-mods-cairaths-mod-corner/">
							Forum thread - mods
						</a>
					</p>
                    <br/>
					<p>
						If you've got any questions don't hesitate to contact me on the forums, Discord or Github.<br />
						See you around!
					</p>
				</div>
			</Spin>
		);
	}
}

export default AboutPage;
