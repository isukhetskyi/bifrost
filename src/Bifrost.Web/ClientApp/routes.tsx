import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout }  from './components/layout/Layout';
import { Survey } from './components/Survey';
import { Respondents } from './components/respondents/Respondents';
//import { Respondent } from './components/respondents/Respondent';
import { Statistics } from './components/Statistics';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { RouteComponentProps } from 'react-router';
import { Respondent } from './components/respondents/MuiRespondent';


export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/survey' component={Survey} />
        <Route path='/statistics' component={Statistics} />
        <Route path='/respondents/all' component={Respondents} />
        <Route path='/respondents/view/:number' component={Respondent}/>
        <Route path="/account/login" component={Login} />
        <Route path="/account/register" component={Register} />
    </Switch>

</Layout>;
