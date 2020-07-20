import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './../pages/Home';
import Register from './../pages/Register';
import Login from './../pages/Login';
import Secret from './../pages/Secret';

import history from './../helpers/history';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function AppRouter({ children }) {
    return (
        <Router history={history}>
            {children}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <PublicRoute path="/register">
                    <Register />
                </PublicRoute>
                <PublicRoute path="/login">
                    <Login />
                </PublicRoute>
                <PrivateRoute path="/secret">
                    <Secret />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default AppRouter;
