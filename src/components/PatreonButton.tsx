import * as React from 'react';
import { Button, Icon } from 'antd';
import './patreon-button.less'

const PatreonLogo = () => (
<svg height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
	<path
		fill="#fff"
		d="M108.8135992 26.06720125c-26.468266 0-48.00213212 21.53066613-48.00213212 47.99733213 0 26.38653268 21.53386613 47.85426547 48.00213213 47.85426547 26.38639937 0 47.8530655-21.4677328 47.8530655-47.85426547 0-26.466666-21.46666613-47.99733213-47.85306547-47.99733213"
	/>
	<path
		fill="#052a49"
		d="M23.333335 153.93333178V26.0666679h23.46666576v127.8666639z"
	/>
</svg>

);

const PatreonButton: React.FC = () => (
	<Button
		type="primary"
		target="_blank"
		id="patreon-button"
		href="https://www.patreon.com/bePatron?u=16290546">
		<Icon component={PatreonLogo} /> BECOME A PATRON
	</Button>
);

export default PatreonButton;