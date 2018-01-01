import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Survey } from './components/Survey';
import { Respondents } from './components/Respondents';
import { Statistics } from './components/Statistics';

export const routes = <Layout>
    <Route exact path='/' component={ Survey } />
    <Route path='/statistics' component={ Statistics } />
    <Route path='/respondents' component={ Respondents } />
</Layout>;
