import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
	<Layout.Footer id="footer">
		<div className="max-content-width">
			<Menu theme="dark" mode="horizontal" selectable={false} style={{ maxWidth: '100%' }}>			
				<Menu.Item key="changelog">
					<Link to="/changelog">Changelog</Link>
				</Menu.Item>
				<Menu.Item key="coffee">
					<Link to="/coffee">
						<Icon type="coffee" /> Buy me a coffee
					</Link>
				</Menu.Item>
				<Menu.Item key="about">
					<Link to="/about">About</Link>
				</Menu.Item>
			</Menu>
		</div>
	</Layout.Footer>
);

export default Footer;
