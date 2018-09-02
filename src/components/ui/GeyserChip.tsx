import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CustomChip from './CustomChip';

export interface Props extends WithStyles<typeof styles> {
    geyserProperties: IGeyserProperties,
    quantity: number,
}

const styles = (theme: Theme) => createStyles({
    chipGrid: {
        margin: theme.spacing.unit / 2,
        minWidth: 210,
    },
    chip: {
        justifyContent: 'left',
        width: '100%'
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    avatarNumber: {
        height: 20,
        width: 20,
        color: theme.palette.getContrastText(green["700"]),
        fontSize: '1rem',
        marginLeft: 'auto',
    },
});

class GeyserChip extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        var imageSrc = '/images/' + this.props.geyserProperties.image;
        const {classes} = this.props;
        return (
            <Grid item className={classes.chipGrid}>
                <CustomChip className={classes.chip}
                    avatar={<Avatar className={classes.avatar} src={imageSrc} />}
                    label={this.props.geyserProperties.displayName}
                    avatar2={<Avatar className={classes.avatarNumber}
                        style={this.props.quantity == 0 ? { background: red["900"] } : { background: green["800"] }}>
                        {this.props.quantity} </Avatar>}
                />
            </Grid>);
    }
};

export default withStyles(styles)(GeyserChip);