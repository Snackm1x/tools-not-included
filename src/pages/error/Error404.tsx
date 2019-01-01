import * as React from 'react';
import { Col, Row, Button } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';

class Error404 extends React.Component<WithNamespaces> {

	public render() {
		const { t } = this.props;
		return (
			<div style={{ display: 'flex', minHeight: '70%', alignItems: 'center' }}>
				<Row type='flex' gutter={16} style={{ marginTop: 24, marginBottom: 24, width: '100%' }}>
					<Col xs={24} md={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
						<img id="outhouse" src='/images/outhouse.png' style={{ maxHeight: 500, objectFit: 'contain' }} />
					</Col>
					<Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<h1>Crap, nothing to see here!</h1>
						<br />
						<p style={{ textAlign: 'center' }}>
							Go back to the main page.
							<br />
							If you believe you're seeing this incorrectly, please contact the developer.
						</p>
						<br /><br />
						<Link to="/"><Button type="primary" >Return to the Main Page</Button></Link>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withNamespaces()(Error404);