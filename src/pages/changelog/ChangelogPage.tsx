import * as React from 'react';
import { Spin, Alert } from 'antd';
import * as Markdown from 'react-markdown';
import './changelog.less';
import Axios from 'axios';

interface Props {}

interface State {
	loading: boolean;
	changelogText: string | undefined;
	changelogError: boolean;
}

class ChangelogPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			loading: true,
			changelogText: undefined,
			changelogError: false
		};
	}

	componentWillMount() {
		Axios.get<string>('https://raw.githubusercontent.com/Cairath/tools-not-included/master/.README/Changelog.md')
			.then((res) => this.setState({ changelogText: res.data }))
			.catch(() => this.setState({ changelogError: true }));
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	public render() {
		return (
			<Spin spinning={this.state.loading} wrapperClassName="nontransparent fixed" size="large">
				<div id="changelog">
					<Alert
						message="Can't load changelog"
						description="Sorry! An error has occured, but the changelog is also available on Github."
						type="error"
						showIcon
						style={{ display: this.state.changelogError ? 'inherit' : 'none' }}
					/>
					<Markdown source={this.state.changelogText} />
				</div>
			</Spin>
		);
	}
}

export default ChangelogPage;
