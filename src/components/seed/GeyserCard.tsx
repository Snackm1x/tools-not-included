import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Geyser from '../../types/classes/Geyser';
import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from '../../types/interfaces/IGeyserProperties';

export interface Props extends WithStyles<typeof styles> {
    geyser: Geyser
}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        padding: theme.spacing.unit
    },
    card: {
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    image: {
        width: '40%',
        backgroundSize: 'contain',
        margin: theme.spacing.unit / 2,
        marginLeft: theme.spacing.unit * 1.5
    },
    cardContent: {
        display: 'flex',
        width: '100%',
        paddingLeft: 0,
        flexDirection: 'column'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    cardContentTitle: {
        textAlign: 'center',
        width: '100%'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: theme.spacing.unit
    }
});

class GeyserCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    formatGeyserStatVal = (stat : number | undefined, fixed: boolean = false, decimalPlaces : number = 0) => {
        if (!stat || stat <= 0) return "?";

        if (!fixed) return stat;

        return (+stat).toFixed(decimalPlaces);
    }

    render() {
        var geyserProperties = GeyserProperties.get(this.props.geyser.type) as IGeyserProperties;
        var imageSrc = '/images/' + geyserProperties.image;

        return (
            <Grid item className={this.props.classes.root} lg={4} sm={12} md={6} xs={12} xl={4}>
                <Card className={this.props.classes.card}>
                
                    <CardMedia
                        className={this.props.classes.image}
                        image={imageSrc} />

                    <CardContent className={this.props.classes.cardContent}>
                        <Typography variant="subheading" className={this.props.classes.cardContentTitle}>
                            {geyserProperties.displayName}
                        </Typography>

                        <Grid container className={this.props.classes.cardContainer}>
                            <Typography>
                                Eruption rate: <b>{this.formatGeyserStatVal(this.props.geyser.eruptionRate, true, 0)} g/s</b> at {geyserProperties.outputTemp} °C
                            </Typography>

                            <Typography>
                                Erupts for <b>{this.formatGeyserStatVal(this.props.geyser.activeEruptionPeriod)} s</b> every <b>{this.formatGeyserStatVal(this.props.geyser.eruptionPeriod)} s</b>
                            </Typography>

                            <Typography>
                                Active for <b>{this.formatGeyserStatVal(this.props.geyser.activeDormancyPeriod, true, 1)} cycles</b> every <b>{this.formatGeyserStatVal(this.props.geyser.dormancyPeriod, true, 1)} cycles</b>
                            </Typography>

                            <br />

                            <Typography>
                                Calculated actual output: <b>{isNaN(Number(this.props.geyser.calculatedOutput)) ?  this.props.geyser.calculatedOutput : this.formatGeyserStatVal(Number(this.props.geyser.calculatedOutput), true, 2) + " g/s"} </b>
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>);
    }
};

export default withStyles(styles)(GeyserCard);