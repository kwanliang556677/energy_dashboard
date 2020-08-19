import AppBar from "@material-ui/core/AppBar";
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HistoryIcon from '@material-ui/icons/History';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from "@material-ui/icons/Menu";
import TimelineIcon from '@material-ui/icons/Timeline';
import WavesIcon from '@material-ui/icons/Waves';
import PropTypes from "prop-types";
import React from "react";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/login";
import Aggregated from "./components/Aggregated/chart-parent"
import RealTime from "./components/RealTime2/chart-parent"

const drawerWidth = 240;

const AppRender = () => {
    console.log('app render');
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ResponsiveDrawer(props) {
    const { container, Child } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = (index) => {
        console.log(index);
        if (index == 0) {
            setOpen(!open);
        } else if (index == 1) {
            setOpen1(!open1);
        } else if (index == 2) {
            setOpen2(!open2);
        } else if (index == 3) {
            setOpen3(!open3);
        }
    };

    const getOpenIndex = (index) => {
        if (index == 0) {
            return open;
        } else if (index == 1) {
            return open1;
        } else if (index == 2) {
            return open2;
        } else if (index == 3) {
            return open3;
        }
    }

    const getExpandDiv = (index) => {
        if (index == 0) {
            return open ? <ExpandLess /> : <ExpandMore />;
        } else if (index == 1) {
            return open1 ? <ExpandLess /> : <ExpandMore />;
        } else if (index == 2) {
            return open2 ? <ExpandLess /> : <ExpandMore />;
        } else if (index == 3) {
            return open3 ? <ExpandLess /> : <ExpandMore />;
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {["Power Meter", "Water Meter", "Heat Meter", "Gas Meter"].map((text, index) => (
                    <div>
                        <ListItem button onClick={() => handleClick(index)}>
                            <ListItemIcon>
                                {index === 0 ? <FlashOnIcon /> : index === 1 ? <InvertColorsIcon /> : index === 2 ? <FireplaceIcon /> : <WavesIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {getExpandDiv(index)}
                        </ListItem>
                        <Collapse in=
                            {getOpenIndex(index)}
                            timeout="auto" unmountOnExit>
                            <List>
                                {["Home", "Historical"].map((text, index) => (
                                    <ListItem className={classes.nested} key={text} component={Link} to={"/" + text + "/"}>
                                        <ListItemIcon>
                                            {index === 0 ? <TimelineIcon /> : index === 1 ? <HistoryIcon /> : index === 2 ? <AssessmentIcon /> : <LibraryBooksIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Energy Dashboard
          </Typography>
                </Toolbar>
            </AppBar>
           
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === "rtl" ? "right" : "left"}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <Container maxWidth="lg">
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                       
                        <Child />
                    </main>
                </Container>
           
        </div>
    );
}

const parseChild = React.memo(props => {
    console.log("Greeting Comp render");
    return
    (<Child />)
});


ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(
        typeof Element === "undefined" ? Object : Element
    )
};

export default ResponsiveDrawer;
