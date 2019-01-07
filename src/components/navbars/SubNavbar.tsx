import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const Navbar: React.FC = () => {
	return (
		<Header id="secondary-header" className="subsection-active">
			<div className="max-content-width">
				<Menu id="first-sub-menu" theme="dark" mode="horizontal" selectable={false}>
					<Menu.Item key="1">
						<Link to="/seeds">Seed Browser</Link>
					</Menu.Item>
				</Menu>

				<Menu id="second-sub-menu" theme="dark" mode="horizontal" selectable={false}>
					<Menu.Item key="1">
						<Link to="/seeds">Browser</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/seeds/modinfo">Mod</Link>
					</Menu.Item>
				</Menu>
			</div>
		</Header>
	);
};

export default Navbar;
