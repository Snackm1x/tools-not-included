import * as React from 'react';
import KofiButton from 'src/components/KofiButton';
import { Col, Row, Spin } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';

type AllProps = WithNamespaces;

interface State {
	loading: boolean;
}

class CoffeePage extends React.Component<AllProps, State> {
	constructor(props: AllProps) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	public render() {
		const { t } = this.props;
		return (
			<Spin spinning={this.state.loading} wrapperClassName="nontransparent fixed full-height" size="large">
				<div style={{ display: 'flex', minHeight: '70%', alignItems: 'center' }}>
					<div>
						<Row type="flex" gutter={16} style={{ marginTop: 24 }}>
							<Col
								xs={24}
								md={12}
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-around',
									alignItems: 'center',
									marginLeft: 'auto',
									paddingLeft: 24,
									paddingRight: 24
								}}>
								<h1>{t('coffee.header')}</h1>
								<p style={{ textAlign: 'center' }}>{t('coffee.text-1')}</p>
								<p style={{ textAlign: 'center' }}>{t('coffee.text-2')}</p>
								<br />
								<br />
								<KofiButton />
							</Col>
							<Col
								xs={24}
								md={10}
								style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
								<img
									id="coffee"
									src="/images/coffee.png"
									style={{ maxHeight: 240, objectFit: 'contain', margin: 24 }}
								/>
							</Col>
						</Row>
					</div>
				</div>
			</Spin>
		);
	}
}

export default withNamespaces()(CoffeePage);
