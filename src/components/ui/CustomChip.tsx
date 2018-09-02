import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {
    className: string,
    avatar: JSX.Element,
    avatar2: JSX.Element,
    label: string,
}

const styles = (theme: Theme) => createStyles({
    root: {
        marginLeft: theme.spacing.unit / 2,
        marginRight: theme.spacing.unit / 2,
        height: 32,
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        borderRadius: 59,
        alignItems: 'center',
        justifyContent: 'left',
        padding: '4px 4px 4px 4px',
    },
    avatardiv: {
        margin: '-10px 0px -10px -5px',
    },
    label: {
        marginRight: 5,
    }
});

class CustomChip extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.avatardiv}>
                    {this.props.avatar}
                </div>
                <Typography className={this.props.classes.label}>{this.props.label}</Typography>
                {this.props.avatar2}
            </div>
        );
    }
};

export default withStyles(styles)(CustomChip);