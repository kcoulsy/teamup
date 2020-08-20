import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppLayout from './../AppLayout/AppLayout';

import Home from '../../pages/Home';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import MyProfile from './../../pages/MyProfile';
import AccountSettings from './../../pages/AccountSettings';
import MyProjects from './../../pages/MyProjects';
import TeamProfile from './../../pages/TeamProfile';
import TeamProjects from './../../pages/TeamProjects';
import TeamSettings from './../../pages/TeamSettings';
import ProjectPage from './../../pages/ProjectPage';
import TaskPage from './../../pages/TaskPage';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import {
    PATH_HOME,
    PATH_LOGIN,
    PATH_REGISTER,
    PATH_MY_PROFILE,
    PATH_ACCOUNT_SETTINGS,
    PATH_MY_PROJECTS,
    PATH_TEAM_PROFILE,
    PATH_TEAM_PROJECTS,
    PATH_TEAM_SETTINGS,
    PATH_PROJECT_PAGE,
    PATH_TASK_PAGE
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
                    <PrivateRoute path={PATH_MY_PROFILE}>
                        <MyProfile />
                    </PrivateRoute>
                    <PrivateRoute path={PATH_MY_PROJECTS}>
                        <MyProjects />
                    </PrivateRoute>
                    <PrivateRoute path={PATH_ACCOUNT_SETTINGS}>
                        <AccountSettings />
                    </PrivateRoute>
                    <PrivateRoute exact path={PATH_TEAM_PROFILE}>
                        <TeamProfile />
                    </PrivateRoute>
                    <PrivateRoute path={PATH_TEAM_PROJECTS}>
                        <TeamProjects />
                    </PrivateRoute>
                    <PrivateRoute path={PATH_TEAM_SETTINGS}>
                        <TeamSettings />
                    </PrivateRoute>
                    <PrivateRoute exact path={PATH_PROJECT_PAGE}>
                        <ProjectPage />
                    </PrivateRoute>
                    <PrivateRoute path={PATH_TASK_PAGE}>
                        <TaskPage />
                    </PrivateRoute>
                </Switch>
            </AppLayout>
        </Router>
    );
};

export default AppRouter;
