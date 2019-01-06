import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Footer: React.SFC = () => (
	<Layout.Footer>
		<div className="max-content-width">
			<Menu theme="dark" mode="horizontal" selectable={false} style={{ maxWidth: '100%' }}>
				<Menu.Item key="about">
					<Link to="/">About</Link>
				</Menu.Item>
				<Menu.Item key="changelog">
					<Link to="/changelog">Changelog</Link>
				</Menu.Item>
				<Menu.Item key="github">
					<Link to="/">
						<Icon type="github" /> Github
					</Link>
				</Menu.Item>
			</Menu>
		</div>
	</Layout.Footer>
);

export default Footer;
