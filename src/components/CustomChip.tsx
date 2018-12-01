import * as React from 'react';

export interface Props {
//    label?: GeyserType,
}

class CustomChip extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div style={{marginLeft: 4,
                marginRight: 4,
                height: 32,
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'left',
                padding: '4px 4px 4px 4px'}}>
                <div style={{ margin: '-10px 0px -10px -5px'}}>
                    {/*this.props.avatar*/}
                </div>
                <p style={{margin: '0px 5px 0px 0px'}}>Cool Steam Geyser</p>
                {/*this.props.avatar2*/}
            </div>
        );
    }
};

export default CustomChip;