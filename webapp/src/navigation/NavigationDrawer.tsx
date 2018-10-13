import * as React from "react";
import {NavLink} from "react-router-dom";
import {Drawer, IconButton, Divider, Theme, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BusinessIcon from "@material-ui/icons/BusinessCenter";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {User} from "../state/User";
import {Utility} from "../state/Utility";
import {styles} from "./styles";

const classNames = require('classnames');

interface DrawerProps {
    authentication?: User;
    utility: Utility;
    classes?: any;
    theme?: Theme;
    handleDrawerClose?: () => void;
}

class NavigationDrawer extends React.Component<DrawerProps, {}> {
    public routes = [
        {path: '/', title: 'Possessions', icon: () => <BusinessIcon/>},
        {path: '/account', title: 'Account', icon: () => <AccountCircleIcon/>}
    ];

    public render(): JSX.Element {
        const {authentication, classes, utility, theme} = this.props;
        return (
            <Drawer
                hidden={!authentication}
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !utility.drawerOpen && classes.drawerPaperClose),
                }}
                open={utility.drawerOpen}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {this.routes.map((route, index) => {
                    return (
                        <NavLink key={index} exact={true} activeClassName={classes.current} className={classes.link} to={route.path}>
                            <ListItem button={true}>
                                <ListItemIcon>
                                    {route.icon()}
                                </ListItemIcon>
                                <ListItemText primary={route.title}/>
                            </ListItem>
                        </NavLink>
                    );
                })}
                <Divider/>
            </Drawer>
        );
    }
}

export default withStyles(styles as any, {withTheme: true})(NavigationDrawer as any) as any;
