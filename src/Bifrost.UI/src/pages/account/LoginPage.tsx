import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { RootState } from '../../reducers/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { Input, Button, Grid } from 'material-ui';
import * as LoginActions from '../../actions/login';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';

export namespace LoginPage {
    export interface Props extends RouteComponentProps<void> {
        actions: typeof LoginActions;
    }

    export interface State {
        Email: string;
        EmailError?: boolean;
        Password: string;
        PasswordError?: boolean;
        FormError?: boolean;
        RememberMe: boolean;
        isDone?: boolean;
    }
}

class LoginPage extends React.Component<WithStyles & LoginPage.Props, LoginPage.State> {
    state = {
        Email: '',
        EmailError: false,
        Password: '',
        PasswordError: false,
        isDone: false,
        RememberMe: false,
        idDone: false,
    };

    handleInputChange = (inputName: string, event: any) => {
        switch (inputName) {
            case 'Email':
            {
                this.setState({
                    Email: event.target.value
                });
            }
            break;

            case 'Password':
            {
                this.setState({
                    Password: event.target.value
                });
            }
            break;

            default:
            return;
        }
    }

    handleSubmit = () => {
        let thisContext = this;

        axios.default.post(AppConfigration.BASE_API_URL + '/api/account/login',
            this.state,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': AppConfigration.CORS,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
                }
            })
            .then(function (response: any) {
                thisContext.setState({ isDone: true });
            })
            .catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
    }

    render() {
        return (
            <Grid
                container
                className={this.props.classes.loginpage}
                alignItems={'flex-start'}
                justify={'flex-start'}
            >
                <Input
                    className={this.props.classes.input}
                    onChange={(e) => {this.handleInputChange('Email', e); }}
                    fullWidth
                    type={'email'}
                    placeholder="Login"
                />
                <br/>
                <Input
                    className={this.props.classes.input}
                    onChange={(e) => {this.handleInputChange('Password', e); }}
                    fullWidth
                    type={'password'}
                    placeholder="Password"
                />
                <br/>
                <Button
                    className={this.props.classes.button}
                    onClick={this.handleSubmit}
                    variant="raised"
                    color="primary"
                >
                    Login
                </Button>
            </Grid>

        );
    }
}

const styles: StyleRulesCallback = theme => ({
    loginpage: {
        width: '360px',
        padding: '8% 0 0',
        margin: 'auto',
    },
    input: {
        fontfamily: 'Roboto',
        outline: '0',
        background: '#f2f2f2',
        width: '100%',
        border: '0',
        margin: '0 0 15px',
        padding: '15px',
        boxsizing: 'border-box',
        fontsize: '14px'
    },
    button: {
        fontfamily: 'Roboto',
        texttransform: 'uppercase',
        outline: '0',
        background: '#39a3dc',
        width: '100%',
        border: '0',
        padding: '15px',
        color: '#FFFFFF',
        fontsize: '14px',
        transition: 'all 0.3 ease',
        cursor: 'pointer'
    },
});

function mapStateToProps(state: RootState) {
    return {

    };
  }

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(LoginActions as any, dispatch)
    };
  }

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));
