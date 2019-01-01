import * as React from 'react';
import { Col, Row, Button } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';

class Error500 extends React.Component<WithNamespaces> {

	public render() {
		const { t } = this.props;
		return (
			<div style={{ display: 'flex', minHeight: '70%', alignItems: 'center' }}>
				<Row type='flex' gutter={16} style={{ marginTop: 24, marginBottom: 24, width: '100%' }}>
					<Col xs={24} md={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
						<img id="ohno" src='/images/ohno.png' style={{ maxHeight: 500, objectFit: 'contain' }} />
					</Col>
					<Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<h1>Oh no! Something went wrong on the server.</h1>
						<br />
						<p style={{ textAlign: 'center' }}>
							Duct tape is being used to patch the holes - sorry for the inconvenience!
							<br />
							If the error keeps occuring, please contact the developer.
						</p>
						<br /><br />
						<Link to="/"><Button type="primary" >Return to the Main Page</Button></Link>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withNamespaces()(Error500);