import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { Button, Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Trans, withNamespaces, WithNamespaces } from 'react-i18next';



interface PropsFromState { }

interface PropsFromDispatch { }

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps & WithNamespaces;

class CoffeePage extends React.Component<AllProps> {
	public render() {
		const { t } = this.props;
		return (
			<div>
				<Card className="shadow-card card-full-width" bordered={false} >
				<Row type='flex' gutter={16}>
					<Col xs={24} md={12} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
						<h1>{t('coffee.header')}</h1>
						<p>{t('coffee.text-1')}</p>
						<p>{t('coffee.text-2')}</p>
						<br /><br/>
						<Button type="primary" style={{alignSelf: 'flex-end'}}>{t('coffee.button')}</Button>
					</Col>
					<Col xs={24} md={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
						<img id="coffee" src='/images/coffee.png' height={314} width={302} />
					</Col>
					</Row>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ }: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(CoffeePage)));
