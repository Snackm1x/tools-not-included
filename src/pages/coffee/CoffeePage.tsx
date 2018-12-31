import * as React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';

type AllProps = WithNamespaces;

class CoffeePage extends React.Component<AllProps> {
	public render() {
		const { t } = this.props;
		return (
			<div>
				<Card className="shadow-card card-full-width" bordered={false} >
				<Row type='flex' gutter={16}>
					<Col xs={24} md={12} offset={2} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
						<h1>{t('coffee.header')}</h1>
						<p style={{textAlign: 'center'}}>{t('coffee.text-1')}</p>
						<p style={{textAlign: 'center'}}>{t('coffee.text-2')}</p>
						<br /><br/>
						<Button type="primary" style={{alignSelf: 'flex-end'}}>{t('coffee.button')}</Button>
					</Col>
					<Col xs={24} md={10} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
						<img id="coffee" src='/images/coffee.png' style={{maxHeight: 240, objectFit: 'contain'}}/>
					</Col>
					</Row>
				</Card>
			</div>
		);
	}
}

export default withNamespaces()(CoffeePage);