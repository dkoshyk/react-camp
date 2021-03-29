import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { UserContext } from './auth/UserContext';
import LastTasksPopover from './tasks/LastTasksPopover';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    rightButton: {
        marginLeft: 'auto'
    }
}));

export const TopAppBar = ({ open, handleDrawerOpen }) => {
    const classes = useStyles();
    const history = useHistory();

    const { user, logoutUser, isAuth } = useContext(UserContext);

    const onLogout = () => {
        logoutUser();
        history.push('/');
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>Boot Wave</Typography>
                    {isAuth() ?
                        <div className={classes.rightButton}>
                            <LastTasksPopover />
                            ({user.fullName})
                        <Button onClick={onLogout} color="inherit">Logout</Button>
                        </div> :
                        <Button className={classes.rightButton} component={Link} to="/login" color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
        </div>
    )
}