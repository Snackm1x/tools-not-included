import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const Navbar: React.SFC = () => (
	<Header className="primary-header">
		<div className="max-content-width">
			<img id="logo" src="/images/oxygen_helmet.png" />
			<Menu theme="dark" mode="horizontal" selectable={false}>
				<Menu.Item key="1">
					<Link to="/">Tools Not Included</Link>
				</Menu.Item>
			</Menu>
		</div>
	</Header>
);

export default Navbar;
