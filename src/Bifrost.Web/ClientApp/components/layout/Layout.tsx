import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';

import SupervisorAccountIcon from "material-ui-icons/SupervisorAccount";
import DashboardIcon from "material-ui-icons/Dashboard";
import HomeIcon from "material-ui-icons/Home";
import AssigmentIdenIcon from "material-ui-icons/AssignmentInd";
import AccountBoxIcon from "material-ui-icons/AccountBox";
import Collapse from 'material-ui/transitions/Collapse';
import ListSubheader from 'material-ui/List/ListSubheader';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import AssignmentIcon from "material-ui-icons/Assessment";
import TimelineIcon from "material-ui-icons/Timeline";
import ListNumberedIcon from "material-ui-icons/FormatListNumbered";
import { Link } from 'react-router-dom';


const drawerWidth = 320;

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

interface IMuiLayoutState {
  open: boolean;
  anchor: string;
  adminAreaOpen: boolean;
  surveyAreaOpen: boolean;
}

export class Layout extends React.Component<{}, IMuiLayoutState> {
  constructor(props: any) {
    super(props);
    this.handleAdminAreyMenuItemClick = this.handleAdminAreyMenuItemClick.bind(this);
    this.handleChangeAnchor = this.handleChangeAnchor.bind(this);
    this.state = {
      open: false,
      anchor: 'left',
      adminAreaOpen: false,
      surveyAreaOpen: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor(event: any) {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleAdminAreyMenuItemClick(area: string) {
    switch (area) {
      case "AdminArea":
        {
          this.
            setState({
              adminAreaOpen: !this.state.adminAreaOpen
            })
        }
        break;

      case "SurveyArea":
        {
          this.setState({
            surveyAreaOpen: !this.state.surveyAreaOpen
          })
        }
        break;
    }


  }



  render() {
    const classes: any = this.props;
    const theme: any = this.props;
    const { anchor, open } = this.state;


    const drawer = (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={e => this.handleAdminAreyMenuItemClick("SurveyArea")}>
              <ListItemIcon>
                <AssigmentIdenIcon />
              </ListItemIcon>
              <ListItemText primary="Survey" />
              {this.state.surveyAreaOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.surveyAreaOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/survey">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Developer's survey" />
                  </ListItem>
                </Link>
                <Link to="/respondents/all">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListNumberedIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Respondents"/>
                  </ListItem>
                </Link>
                <Link to="/statistics">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Statistics" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <ListItem button onClick={e => this.handleAdminAreyMenuItemClick("AdminArea")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Area" />
              {this.state.adminAreaOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.adminAreaOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Users" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <TextField
          id="persistent-anchor"
          select
          label="Anchor"
          value={anchor}
          onChange={this.handleChangeAnchor}
          margin="normal"
        >
          <MenuItem value="left">left</MenuItem>
          <MenuItem value="right">right</MenuItem>
        </TextField>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            {this.props.children}
          </main>
          {after}
        </div>
      </div>
    );
  }
}
