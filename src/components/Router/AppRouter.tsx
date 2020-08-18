import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppLayout from './../AppLayout/AppLayout';

import Home from '../../pages/Home';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Secret from '../../pages/Secret';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import {
    PATH_HOME,
    PATH_LOGIN,
    PATH_REGISTER,
    PATH_SECRET,
} from './../../constants/pageRoutes';

const AppRouter: React.FunctionComponent = ({ children }) => {
    return (
        <Router>
            {children}
            <AppLayout>
                <Switch>
                    <Route exact path={PATH_HOME}>
                        <Home />
                    </Route>
                    <PublicRoute path={PATH_REGISTER}>
                        <Register />
                    </PublicRoute>
                    <PublicRoute path={PATH_LOGIN}>
                        <Login />
                    </PublicRoute>
                    <PrivateRoute path={PATH_SECRET}>
                        <Secret />
                    </PrivateRoute>
                </Switch>
            </AppLayout>
        </Router>
    );
};

export default AppRouter;
