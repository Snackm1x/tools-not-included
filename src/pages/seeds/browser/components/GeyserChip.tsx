import * as React from 'react';

export interface Props {
    label: string,
    count: number,
    imgName: string
}

class GeyserChip extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const imgSrc = `/images/${this.props.imgName}`
        const colorClass = (this.props.count > 0) ? 'green' : 'red';

        return (
            <div className='chip-geyser'>
                <div className='chip-geyser-img-container'>
                    <img className='chip-geyser-img' src={imgSrc} />
                </div>
                <p style={{ margin: '0px 5px 0px 0px' }}>{this.props.label}</p>
                <div className={'chip-geyser-count-container ' + colorClass}>
                    <p>{this.props.count}</p>
                </div>
            </div>
        );
    }
};

export default GeyserChip;