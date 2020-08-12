import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Secret from '../../pages/Secret';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter: React.FunctionComponent = ({ children }) => {
    return (
        <Router>
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
