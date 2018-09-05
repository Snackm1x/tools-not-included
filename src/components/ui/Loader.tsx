import * as React from "react";

import { withStyles, WithStyles, createStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import { TypographyProps } from "@material-ui/core/Typography";

export interface Props extends WithStyles<typeof styles> {
    loading: boolean;
    message?: string;
    color?: "primary" | "secondary" | "inherit";
    typographyProps?: TypographyProps;
    circularProgressProps?: CircularProgressProps;
}

const styles = (theme: Theme) => createStyles({
    root: {
        height: '100%',
        width: '100%',
        background: "rgb(0, 0, 0, 0.7)",
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    textMsg: {
        marginTop: theme.spacing.unit * 2
    }
});

var geyserTypes: IGeyserProperties[] = [];
GeyserProperties.forEach((item, idx) => {
    geyserTypes.push(item)
})

class Loader extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public static defaultProps: Partial<Props> = {
        color: "secondary"
    };

    render() {
        return (
            <div style={{ visibility: this.props.loading ? "visible" : "collapse" }} className={this.props.classes.root}>
                <CircularProgress {...this.props.circularProgressProps} color={this.props.color} />
                {this.props.message && <Typography  {...this.props.typographyProps} className={this.props.classes.textMsg}>{this.props.message}</Typography>}
            </div>
        );
    }
};

export default withStyles(styles)(Loader);