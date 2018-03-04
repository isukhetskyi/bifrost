import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Survey } from './components/Survey';
import { Respondents } from './components/Respondents';
import { Statistics } from './components/Statistics';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';


export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/survey' component={ Survey } />
    <Route path='/statistics' component={ Statistics } />
    <Route path='/respondents' component={ Respondents } />
    <Route path="/account/login" component={Login} />
    <Route path="/account/register" component={Register}/>

</Layout>;
