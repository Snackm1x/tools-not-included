import * as React from 'react';
import { Button, Icon } from 'antd';

const KoFiIcon = () => (
	<svg height="17" version="1.1" viewBox="0 0 644.84 410.87" xmlns="http://www.w3.org/2000/svg">
		<g transform="translate(-37.58 -135.5)">
			<g transform="matrix(1.1422 0 0 -1.1422 265.93 460.73)">
				<g>
					<path
						transform="matrix(1.0944 0 0 1.0944 246.86 82.861)"
						d="m0 0c-19.946-2.492-36.151-0.622-36.151-0.622v122.13h38.02s42.385-11.839 42.385-56.704c0-41.126-21.191-57.328-44.254-64.806m105.06 85.739c-16.628 87.821-104.44 98.734-104.44 98.734h-393.33c-12.99 0-14.588-17.148-14.588-17.148s-1.752-157.43-0.481-254.11c3.524-52.093 55.597-57.435 55.597-57.435s177.7 0.52 257.2 1.039c52.41 9.181 57.674 55.155 57.155 80.3 93.527-5.196 159.52 60.8 142.89 148.62"
						fill="#fff"
					/>
					<path
						d="m0 0c4.445-2.238 7.285 0.543 7.285 0.543s65.045 59.367 94.348 93.557c26.063 30.586 27.762 82.129-16.997 101.39-44.758 19.258-81.584-22.657-81.584-22.657-31.935 35.123-80.268 33.345-102.62 9.575-22.354-23.77-14.548-64.568 2.129-87.274 15.655-21.314 84.465-82.644 94.894-93.016 0 0 0.76-0.795 2.548-2.116"
						fill="#ff5f5f"
					/>
				</g>
			</g>
		</g>
	</svg>
);

const KofiButton: React.FC = () => (
	<Button
		type="primary"
		target="_blank"
		style={{
			height: 37,
			display: 'flex',
			alignItems: 'center',
			fontFamily: 'Quicksand',
			letterSpacing: -0.15,
			textShadow: '0 1px 1px rgba(34, 34, 34, 0.3)',
			fontWeight: 700
		}}
		href="https://ko-fi.com/T6T2O1EA">
		<Icon component={KoFiIcon} /> Support me on Ko-fi
	</Button>
);

export default KofiButton;
