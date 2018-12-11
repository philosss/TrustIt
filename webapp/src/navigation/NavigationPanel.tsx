import * as React from "react";
import {Route, withRouter} from "react-router-dom";
import {Dispatch, connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as _ from "lodash";
import {ListItemText, Menu, MenuItem, Badge} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import {styles} from "./styles";
import * as AppActionCreators from "../actions/Actions";
import {ApplicationProps} from "../actions/Actions";
import {AccountPage} from "../pages/Account";
import PossessionsPage from "../pages/Possessions";
import {getNotifications} from "../selectors/Notifications";
import {AppState, isAuthenticated} from "../state/AppState";
import {Notification} from "../state/Notification";
import NavigationDrawer from "./NavigationDrawer";

const classNames = require('classnames');

interface NavigationPanelProps extends ApplicationProps {
    classes: any;
    theme?: any;
}

interface NavigationPanelState {
    anchorEl: any;
    notificationEl: any;
}

class NavigationPanel extends React.Component<NavigationPanelProps, NavigationPanelState> {

    public state: NavigationPanelState = {
        anchorEl: null,
        notificationEl: null
    };

    private handleNotificationMenu = (event: any) => {
        this.setState({notificationEl: event.currentTarget});
    };

    private handleNotificationMenuClose = () => {
        this.setState({notificationEl: null});
    };

    private handleMenu = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    };

    private handleMenuClose = (path?: string) => {
        this.setState({anchorEl: null});
        this.navigate(path);
    };

    private handleLogout = () => {
        this.props.logout();
        this.handleMenuClose();
    };

    private navigate = (path?: string) => {
        if (path) {
            this.props.history.push(path);
        }
    };

    private handleDrawerOpen = () => {
        this.props.openDrawer();
    };

    private handleDrawerClose = () => {
        this.props.closeDrawer();
    };

    private renderNotifications(notifications: Notification[]) {
        const {classes} = this.props;
        return (
            <Menu
                id="notifications"
                anchorEl={this.state.notificationEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                className={classes.notifications}
                open={Boolean(this.state.notificationEl)}
                onClose={this.handleNotificationMenuClose}
            >
                {notifications.map((n: Notification) => (
                    <MenuItem key={n.id} onClick={this.handleNotificationMenuClose} dense={true} button={true}
                              className={classes.notificationListItem}>
                        <ListItemText primary={n.subject}/>
                    </MenuItem>
                ))}
            </Menu>
        );
    }

    private renderBar() {
        if (!this.props.authentication) {
            return null;
        }
        const {classes, utility} = this.props;
        const {anchorEl, notificationEl} = this.state;
        const open = Boolean(anchorEl);
        const notificationsOpen = Boolean(notificationEl);
        const unreadNotifications = this.props.notifications.filter(x => x.seen === false);

        return (
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
            >
                <Toolbar disableGutters={!utility.drawerOpen}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.fillSpace} variant="title" color="inherit" noWrap={true}>
                        TrustIt
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={notificationsOpen ? 'notifications' : null}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleNotificationMenu}
                        >
                            <Badge badgeContent={unreadNotifications.length} color="secondary">
                                <NotificationIcon />
                            </Badge>
                        </IconButton>
                        {this.renderNotifications(unreadNotifications)}
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                            transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                            open={open}
                            onClose={this.handleMenuClose.bind(this, null)}
                        >
                            <MenuItem
                                onClick={this.handleMenuClose.bind(this, '/account')}>{this.props.authentication.firstName}</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }

    private renderDrawer() {
        const {utility, authentication} = this.props;
        return (
            <Hidden mdDown={!utility.drawerOpen && true}>
                <NavigationDrawer
                    utility={utility}
                    authentication={authentication}
                    handleDrawerClose={this.handleDrawerClose}
                />
            </Hidden>
        );
    }

    private renderAccount = () => {
        return (
            <AccountPage user={this.props.authentication} login={this.props.login} match={this.props.match}
                         location={this.props.location}/>
        );
    };

    public render() {
        const {classes} = this.props;
        const Possessions = isAuthenticated((): any => {
            return (
                <PossessionsPage/>
            );
        });

        return (
            <div className={classes.root}>
                {this.renderBar()}
                {this.renderDrawer()}

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path='/' exact={true} component={Possessions}/>
                    <Route path='/possessions' component={Possessions}/>
                    <Route path='/account' render={this.renderAccount}/>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    utility: state.utility,
    authentication: state.authentication,
    notifications: getNotifications(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, {withTheme: true})(NavigationPanel as any)) as any);
