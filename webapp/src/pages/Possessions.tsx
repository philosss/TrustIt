import * as React from "react";
import {connect} from "react-redux";
import {withStyles, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {getPossessions} from "../selectors/Possessions";
import {Possession} from "../state/Possession";
import {AppState} from "../state/AppState";

interface PossessionsPageProps {
    classes?: any;
    possessions: Possession[];
}

class PossessionsPage extends React.Component<PossessionsPageProps> {
    public render(): JSX.Element {
        const {classes} = this.props;

        return (
            <Grid container={true} className={classes.root} justify="center" spacing={16}>
                {this.props.possessions.map((p: Possession) => (
                    <Grid item={true}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={p.imageUrl}
                                    title={p.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {p.name}
                                    </Typography>
                                    <Typography component="p">
                                        {p.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    History
                                </Button>
                                <Button size="small" color="primary">
                                    Transfer
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: 16 * 2,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        width: 345,
        height: 250,
    }
};

const mapStateToProps = (state: AppState) => ({
    possessions: getPossessions(state)
});

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(PossessionsPage as any) as any);
