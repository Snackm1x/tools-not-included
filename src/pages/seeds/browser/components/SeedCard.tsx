import * as React from 'react';
import { Button, Card, Row, Col, Divider } from 'antd';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import CustomChip from 'src/components/CustomChip';
import { Seed } from 'src/api/models';
import { seedBrowserReducer } from 'src/store/seed-browser/reducer';

type AllProps = WithNamespaces & Props;

export interface Props  {
	seed: Seed
}

class SeedCard extends React.Component<AllProps> {
	public render() {
		const { t, seed } = this.props;
		const creationDate = new Date(seed.creationDate);

		return (
			<Card className="shadow-card card-full-width seed-card" bordered={false}>
				<Row type='flex'>
					<Col style={{ justifyContent: 'center', display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }}>
						<h3>Seed: {seed.seed}</h3>
						<h3>{seed.gameUpgrade}</h3>
						<h3>SYMB {seed.versionNumber}</h3>
					</Col>
					<Col style={{ justifyContent: 'center', display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
						<CustomChip></CustomChip> <CustomChip></CustomChip> <CustomChip></CustomChip> <CustomChip></CustomChip> <CustomChip></CustomChip>
					</Col>
				</Row>
				<Row type='flex'>
					<Divider style={{ background: 'rgba(255, 255, 255, 0.25)', margin: '0.5em 0px' }} />
					<h4 style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Added on {creationDate.toDateString()} {creationDate.toLocaleTimeString()}</h4>
				</Row>
			</Card>
		);
	}
}


export default withNamespaces()(SeedCard);
