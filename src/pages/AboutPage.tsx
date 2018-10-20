import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper, Divider } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        paper: {
            width: '100%',
            padding: theme.spacing.unit,
            margin: theme.spacing.unit,
        },
        paperGrid: {
            width: '100%',
            padding: theme.spacing.unit,
            margin: theme.spacing.unit,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left'
        }
    });

class AboutPage extends React.Component<WithStyles<typeof styles>> {

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid container >
                    <Paper className={this.props.classes.paper}>
                        <Grid className={this.props.classes.paperGrid}>
                            <Typography style={{ width: '100%', textAlign: 'center' }} variant="headline">Hiya!</Typography>
                            <br />
                            <Typography variant="subheading">I'm Cairath, nice to meet you!</Typography>
                            <Typography variant="subheading">I am an avid gamer and Oxygen Not Included fan who happens to be a Software Developer at the same time, so in my free time I like to create mods and game tools like this website.</Typography>
                            <br />
                            <Typography variant="subheading">This website is still in a beta stage with an ongoing development. Initially - a seed browser, but I have plans to turn it into a various tool base and a mod directory (yes, ONI has actual mods!)</Typography>
                            <Typography variant="subheading">While there is still a TON of things to do, I decided to release a semi-complete beta version to get your feedback.</Typography>
                            <Typography variant="subheading"><b>Please</b>, report all issues in the project's issue repository <a style={{ color: '#FFFFFF' }} href="https://github.com/Cairath/oni-seed-browser/issues">here</a> or visit the forum thread.</Typography>
                            <br />
                            <br />
                            <Typography variant="subheading">In the meantime you can give my game mods a shot! They're available in the <a style={{ color: '#FFFFFF' }} href="https://github.com/Cairath/ONI-Mods">Github repository</a> or in the <a style={{ color: '#FFFFFF' }} href="https://forums.kleientertainment.com/forums/topic/94120-mods-cairaths-mod-corner">thread on the Klei forums</a>.</Typography>
                            <br />
                            <Typography variant="subheading">See you around!</Typography>
                            <br />
                            <br />
                            <Divider></Divider>
                            <br />
                            <br />
                            <Typography variant="subheading">Disclaimer: graphic assets used on the website are taken from Oxygen Not Included and belong to Klei Entertainment.</Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(AboutPage);