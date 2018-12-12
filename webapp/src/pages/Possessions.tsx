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
import {addPossession, fetchPossessions, fetchTransactions, transferPossession} from "../actions/Actions";
import {Transaction} from "../state/Transaction";

interface PossessionsPageProps {
    classes?: any;
    traderId: string;
    fetchPossessions: (traderId: string) => any;
    addPossession: (name: string, description: string, imageUrl: string, ownerId: string) => any;
    transferPossession: (goodId: string, ownerId: string, newOwnerId: string, price: number) => any;
    possessions: Possession[];
    fetchTransactions: (goodId: string) => any;
    transactions: Transaction[];
}

interface PossessionsPageState {
    transferFormOpen: boolean;
    possessionHistoryOpen: boolean;
    possessionFormOpen: boolean;
    name: string;
    description: string;
    imageUrl: string;
    goodId: string;
    newOwnerId: string;
    price: number;
}

class PossessionsPage extends React.Component<PossessionsPageProps, PossessionsPageState> {
    public state: PossessionsPageState = {
        transferFormOpen: false,
        possessionHistoryOpen: false,
        possessionFormOpen: false,
        name: "",
        description: "",
        imageUrl: "",
        goodId: "",
        newOwnerId: "",
        price: 0,
    };

    private handleTransferFormClickOpen = (goodId: string) => {
        this.setState({goodId});
        this.setState({transferFormOpen: true});
    };

    private handleTransferFormClose = () => {
        this.setState({transferFormOpen: false});
    };

    private handleNewOwnerIdChange = (event: any) => {
        this.setState({newOwnerId: event.target.value});
    };

    private handlePriceChange = (event: any) => {
        this.setState({price: event.target.value});
    };

    private handleTransferPossession = () => {
        this.props.transferPossession(this.state.goodId, this.props.traderId, this.state.newOwnerId, this.state.price);
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
                        id="newOwnerId"
                        label="User ID"
                        onChange={this.handleNewOwnerIdChange}
                        fullWidth={true}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        onChange={this.handlePriceChange}
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleTransferFormClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleTransferPossession} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private handlePossessionHistoryClickOpen = (goodId: string) => {
        this.setState({goodId});
        this.props.fetchTransactions(goodId);
        this.setState({possessionHistoryOpen: true});
    };

    private handlePossessionHistoryClose = () => {
        this.setState({possessionHistoryOpen: false});
    };

    private renderPossessionHistory(): JSX.Element {
        const {classes, transactions} = this.props;
        if (transactions.length === 0) {
            return (
                <Dialog
                    open={this.state.possessionHistoryOpen}
                    onClose={this.handlePossessionHistoryClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">History</DialogTitle>
                    <DialogContent>
                        <p>
                            You are the first owner.
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePossessionHistoryClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

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
                                <TableCell>Good ID</TableCell>
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>New Owner</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions
                                .filter(t => t.goodId === this.state.goodId)
                                .map(transaction => {
                                    return (
                                        <TableRow key={transaction.goodId}>
                                            <TableCell component="th" scope="row">
                                                {transaction.goodId}
                                            </TableCell>
                                            <TableCell>{transaction.transactionId}</TableCell>
                                            <TableCell>{transaction.ownerId}</TableCell>
                                            <TableCell>{transaction.price}</TableCell>
                                            <TableCell>{transaction.timestamp}</TableCell>
                                        </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handlePossessionHistoryClose} color="primary">
                        Close
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
                        margin="dense"
                        id="description"
                        label="Description"
                        onChange={this.handleDescriptionChange}
                        fullWidth={true}
                    />
                    <TextField
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
                                    <Button onClick={() => this.handlePossessionHistoryClickOpen(p.name)} size="small" color="primary">
                                        History
                                    </Button>
                                    <Button onClick={() => this.handleTransferFormClickOpen(p.name)} size="small" color="primary">
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
    possessions: state.possessions,
    transactions: state.transactions
});

const mapDispatchToProps = {
    fetchPossessions,
    addPossession,
    transferPossession,
    fetchTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, {withTheme: true})(PossessionsPage as any) as any);
