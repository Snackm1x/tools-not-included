import * as React from "react";
import { Card, Row, Col } from "antd";
import { Seed, GeyserType, GameUpgrade, SpaceDestinationType } from "src/api/models";
import GeyserChip from "../../browser/components/GeyserChip";

export interface Props {
    seed: Seed
    geyserTypes: { [key: string]: GeyserType }
    gameUpgrades: { [key: string]: GameUpgrade }
    spaceDestinationTypes: { [key: string]: SpaceDestinationType }
}

class SeedSummary extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { seed, gameUpgrades, geyserTypes, spaceDestinationTypes } = this.props;
        const creationDate = new Date(seed.creationDate);

        return (
            <Card className="shadow-card card-full-width" bordered={false} >
                <div style={{ display: 'flex', flexFlow: 'column wrap', justifyContent: 'center', alignContent: 'center', width: '100%' }} >
                    <Row type="flex" style={{ justifyContent: 'center' }}><h1 style={{ marginBottom: 0 }}>Seed {seed.seed}</h1></Row>
                    <Row type="flex" style={{ justifyContent: 'center' }}><h3 style={{ marginBottom: 0 }}>{gameUpgrades[seed.gameUpgrade].displayName} - {gameUpgrades[seed.gameUpgrade].symbol}-{seed.versionNumber}</h3></Row>

                    <Row type="flex" style={{ justifyContent: 'center', marginTop: 24, marginBottom: 24 }}>
                        {
                            Object.keys(geyserTypes).map((geyserType: string, index: number) => {
                                var imageFile = `geysers/mini/${geyserType.toLowerCase()}.png`
                                return (<GeyserChip key={index} count={seed.geyserQuantities[geyserType]} label={geyserTypes[geyserType].displayName} imgName={imageFile} />)
                            })
                        }
                    </Row>

                    <Row type="flex" style={{ justifyContent: 'center', marginBottom: 30 }}>
                        {
                            Object.keys(spaceDestinationTypes).map((spaceDestinationType: string, index: number) => {
                                var imageFile = `planets/mini/${spaceDestinationType.toLowerCase()}.png`
                                return (<GeyserChip key={index} count={seed.spaceDestinationQuantities[spaceDestinationType]} label={spaceDestinationTypes[spaceDestinationType].displayName} imgName={imageFile} />)
                            })
                        }
                    </Row>

                    <Row type="flex" >
                        <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>Added on {creationDate.toDateString()} {creationDate.toLocaleTimeString()}</h4>
                    </Row>
                </div>
            </Card>
        );
    }
};

export default SeedSummary;