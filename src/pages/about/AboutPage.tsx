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
				<div id="about" >
					<h1>The Seed Browser has permanently moved</h1>
					<br/><br/>					
					<h1><a href="https://ToolsNotIncluded.net">https://ToolsNotIncluded.net</a></h1>
					<br/><br/>			
				</div>
			</Spin>
		);
	}
}

export default AboutPage;
