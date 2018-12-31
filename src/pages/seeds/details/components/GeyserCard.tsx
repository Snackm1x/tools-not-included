import * as React from 'react';
import {
    GeyserType,
    Geyser
} from '../../../../api/models';
import { Col, Card } from 'antd';

export interface Props {
    geyser: Geyser
    geyserTypes: { [key: string]: GeyserType }
}

interface State {
}

class GeyserCard extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {

        }
    }


    public render() {
        const { geyser, geyserTypes } = this.props;
        var imageFile = `/images/geysers/${geyser.type.toLowerCase()}.png`;
        var url = `url(${imageFile})`;

        return (
            <Col lg={8} sm={24} md={12} xs={24} xl={8} >
                <Card className="shadow-card card-full-width geyser-card" bordered={false}>
                    <div style={{ width: '35%', backgroundImage: url, backgroundSize: "contain", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', marginRight: 5 }}/>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <h2>{geyserTypes[geyser.type].displayName}</h2>
                  
                        <h3>Eruption rate: <b>{geyser.eruptionRate.toFixed(2)}g/s</b> {/*at {geyserProperties.outputTemp} °C*/}</h3>
                        <h3>Erupts for <b>{geyser.activeEruptionPeriod}s</b> every <b>{geyser.eruptionPeriod}s</b></h3>
                        <h3>Active for <b>{geyser.activeDormancyPeriod.toFixed(1)} cycles</b> every <b>{geyser.dormancyPeriod.toFixed(1)} cycles</b></h3>
                        <h3>Calculated actual output: <b>{geyser.calculatedOutput.toFixed(2) + "g/s"}</b></h3>
                    </div>
                </Card>
            </Col>
        );
    }
}


export default GeyserCard;
