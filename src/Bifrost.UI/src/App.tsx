import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import withRoot from './withRoot';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/account/LoginPage';
import { Router, Route, RouteComponentProps } from 'react-router';
import { createBrowserHistory } from 'history';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import AssigmentIdenIcon from 'material-ui-icons/AssignmentInd';
import AssignmentIcon from 'material-ui-icons/Assignment';
import TodoIcon from 'material-ui-icons/FormatListNumbered';
import DashboardIcon from 'material-ui-icons/Dashboard';
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount';
import CreateIcon from 'material-ui-icons/Create';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Badge from 'material-ui/Badge/Badge';
import Collapse from 'material-ui/transitions/Collapse';
import ListNumberedIcon from 'material-ui-icons/FormatListNumbered';
import { RootState } from './reducers/index';
import { connect } from 'react-redux';
import { Todo } from './model/model';
import SurveyPage from './pages/survey/SurveyPage';
import StatisticsPage from './pages/survey/StatisticsPage';
import RespondentsPage from './pages/survey/RespondentsPage';

export namespace App {
    export interface Props extends RouteComponentProps<void> {
        todoList: Todo[];
    }

    export interface State {
        mobileOpen: boolean;
        surveyAreaOpen: boolean;
        adminAreaOpen: boolean;
    }
}

const history = createBrowserHistory();

class App extends React.Component<WithStyles & App.Props, App.State> {

    state = {
        mobileOpen: true,
        surveyAreaOpen: false,
        adminAreaOpen: false,
    };

    routes = (
        <div className={this.props.classes.content}>
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/home" component={HomePage} />
            <Route exact={true} path="/survey" component={SurveyPage} />
            <Route exact={true} path="/statistics" component={StatisticsPage} />
            <Route exact={true} path="/respondents" component={RespondentsPage} />
            <Route exact={true} path="/todo" component={TodoPage} />
            <Route exact={true} path="/login" component={LoginPage} />
        </div>
    );

    handleAdminAreyMenuItemClick(area: string) {
        switch (area) {
              case 'AdminArea':
                {
                  this.
                    setState({
                      adminAreaOpen: !this.state.adminAreaOpen
                    });
                }
                break;

            case 'SurveyArea':
                {
                    this.setState({
                        surveyAreaOpen: !this.state.surveyAreaOpen
                    });
                }
                break;
            default:
                return;
        }
    }

    render() {

        let drawer = (
            <div>
                <div className={this.props.classes.drawerHeader} />
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
                <ListItem button onClick={() => this.handleAdminAreyMenuItemClick('SurveyArea')}>
                    <ListItemIcon>
                        <AssigmentIdenIcon />
                    </ListItemIcon>
                    <ListItemText primary="Survey" />
                    {this.state.surveyAreaOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.surveyAreaOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={this.props.classes.nested} onClick={() => { history.push('/survey'); }}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Developer's survey" />
                        </ListItem>
                        <ListItem button className={this.props.classes.nested} onClick={() => { history.push('/respondents'); }}>
                            <ListItemIcon>
                                <ListNumberedIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Respondents" />
                        </ListItem>
                        <ListItem button className={this.props.classes.nested} onClick={() => { history.push('/statistics'); }}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Statistics" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={() => this.handleAdminAreyMenuItemClick('AdminArea')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
                <ListItemText primary="Admin Area" />
                {this.state.adminAreaOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.adminAreaOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={this.props.classes.nested}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Users" />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem button className={this.props.classes.nested}>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Register" />
                    </ListItem>
                </List>
                </Collapse>
                <List>
                    <ListItem button onClick={() => history.push('/todo')}>
                        <ListItemIcon>
                            {this.renderTodoIcon()}
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push('/login')}>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                </List>
                <div style={{ height: '100%' }} />
            </div>
        );

        return (
            <Router history={history}>
                <div className={this.props.classes.root}>
                    <div className={this.props.classes.appFrame}>
                        <AppBar className={this.props.classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={this.props.classes.navIconHide}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="title" color="inherit" noWrap>
                                    Bifrost
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor={'left'}
                                open={this.state.mobileOpen}
                                classes={{
                                    paper: this.props.classes.drawerPaper,
                                }}
                                onClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open
                                classes={{
                                    paper: this.props.classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        {this.routes}
                    </div>
                </div>
            </Router>
        );
    }

    renderTodoIcon() {
        let uncompletedTodos = this.props.todoList.filter(t => t.completed === false);

        if (uncompletedTodos.length > 0) {
            return (
                <Badge color="secondary" badgeContent={uncompletedTodos.length}>
                    <TodoIcon />
                </Badge>
            );
        } else {
            return (
                <TodoIcon />
            );
        }
    }

    private handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
}

const drawerWidth = 240;
const styles: StyleRulesCallback = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

function mapStateToProps(state: RootState) {
    return {
        todoList: state.todoList
    };
}

export default (withRoot(withStyles(styles)<{}>(connect(mapStateToProps)(App))));
