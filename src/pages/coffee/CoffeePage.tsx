import * as React from 'react';
import { Col, Row, Spin } from 'antd';
import PatreonButton from '../../components/PatreonButton';

interface AllProps {};

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
								<h1>Buy me a coffee</h1>
								<p style={{ textAlign: 'center' }}>
									The website is and always will be free for everyone to use, but if you'd like to say
									thanks and/or contribute to the server fees there is now a way to do so!<br />
									The total monthly cost of running the site is around $15, tens of hours spent on
									development, pizzas and caffeine ;). I'm happy to pay for it, but I'll be grateful
									for any and all donations!
								</p>
								<br />
								<br />
								<PatreonButton />
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

export default CoffeePage;
