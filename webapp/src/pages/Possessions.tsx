import * as React from "react";
import {connect} from "react-redux";
import {
    withStyles,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Possession} from "../state/Possession";
import {AppState} from "../state/AppState";
import {addPossession, fetchPossessions} from "../actions/Actions";

interface PossessionsPageProps {
    classes?: any;
    traderId: string;
    fetchPossessions: (traderId: string) => any;
    addPossession: (name: string, description: string, imageUrl: string, ownerId: string) => any;
    possessions: Possession[];
}

interface PossessionsPageState {
    transferFormOpen: boolean;
    possessionHistoryOpen: boolean;
    possessionFormOpen: boolean;
    name: string;
    description: string;
    imageUrl: string;
}

class PossessionsPage extends React.Component<PossessionsPageProps, PossessionsPageState> {
    public state: PossessionsPageState = {
        transferFormOpen: false,
        possessionHistoryOpen: false,
        possessionFormOpen: false,
        name: "",
        description: "",
        imageUrl: ""
    };

    private handleTransferFormClickOpen = () => {
        this.setState({transferFormOpen: true});
    };

    private handleTransferFormClose = () => {
        this.setState({transferFormOpen: false});
    };

    private renderTransferForm(): JSX.Element {
        return (
            <Dialog
                open={this.state.transferFormOpen}
                onClose={this.handleTransferFormClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Transfer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To transfer your possession to another user provide his ID.
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="userId"
                        label="User ID"
                        type="userId"
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleTransferFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleTransferFormClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private handlePossessionHistoryClickOpen = () => {
        this.setState({possessionHistoryOpen: true});
    };

    private handlePossessionHistoryClose = () => {
        this.setState({possessionHistoryOpen: false});
    };

    private renderPossessionHistory(): JSX.Element {
        const {classes} = this.props;
        const rows = [
            {id: 1, name: "Name", userId: "123", since: "21-04-2017 14:34"},
            {id: 2, name: "Name", userId: "456", since: "12-02-2018 12:34"}
        ];

        return (
            <Dialog
                open={this.state.possessionHistoryOpen}
                onClose={this.handlePossessionHistoryClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">History</DialogTitle>
                <DialogContent>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Since</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.userId}</TableCell>
                                        <TableCell>{row.since}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handlePossessionHistoryClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private handlePossessionFormClickOpen = () => {
        this.setState({possessionFormOpen: true});
    };

    private handlePossessionFormClose = () => {
        this.setState({possessionFormOpen: false});
    };

    private handleNameChange = (event: any) => {
        this.setState({name: event.target.value})
    };

    private handleDescriptionChange = (event: any) => {
        this.setState({description: event.target.value})
    };

    private handleImageUrlChange = (event: any) => {
        this.setState({imageUrl: event.target.value})
    };

    private handleAddPossession = () => {
        this.props.addPossession(this.state.name, this.state.description, this.state.imageUrl, this.props.traderId);
        this.setState({possessionFormOpen: false});
    };

    private renderPossessionForm(): JSX.Element {
        return (
            <Dialog
                open={this.state.possessionFormOpen}
                onClose={this.handleTransferFormClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add possession</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="name"
                        label="Name"
                        onChange={this.handleNameChange}
                        type="name"
                        fullWidth={true}
                    />
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="description"
                        label="Description"
                        onChange={this.handleDescriptionChange}
                        fullWidth={true}
                    />
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="imageUrl"
                        label="Image URL"
                        onChange={this.handleImageUrlChange}
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handlePossessionFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAddPossession} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    public componentDidMount() {
        this.props.fetchPossessions(this.props.traderId);
    }

    public render(): JSX.Element {
        const {classes, possessions} = this.props;

        return (
            <div>
                <Grid container={true} className={classes.root} justify="center" spacing={16}>
                    {possessions.map((p: Possession) => (
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
                                    <Button onClick={this.handlePossessionHistoryClickOpen} size="small" color="primary">
                                        History
                                    </Button>
                                    <Button onClick={this.handleTransferFormClickOpen} size="small" color="primary">
                                        Transfer
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button onClick={this.handlePossessionFormClickOpen} variant="fab" color="secondary" aria-label="Add"
                        className={classes.button}>
                    <AddIcon />
                </Button>
                {this.renderTransferForm()}
                {this.renderPossessionHistory()}
                {this.renderPossessionForm()}
            </div>
        );
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 480,
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
    },
    button: {
        position: 'absolute',
        margin: 16,
        bottom: 16,
        right: 16,
    }
};

const mapStateToProps = (state: AppState) => ({
    traderId: state.authentication.traderId,
    possessions: state.possessions
});

const mapDispatchToProps = {
    fetchPossessions,
    addPossession,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, {withTheme: true})(PossessionsPage as any) as any);
