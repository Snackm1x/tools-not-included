import * as React from 'react';
import { Spin, Icon, Button } from 'antd';
import IconK from './components/IconK';
import './about.less';
import { Link } from 'react-router-dom';

interface Props { }

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
					<h1>The site has moved</h1>
					<br/><br/>
					<p>
						The site has permanently moved to <a href="https://ToolsNotIncluded.net">https://ToolsNotIncluded.net</a>
					</p>
					<br/><br/>
					<Link to="https://ToolsNotIncluded.net">
						<Button type="primary">Go to Tools Not Included</Button>
					</Link>
				</div>
			</Spin>
		);
	}
}

export default AboutPage;
