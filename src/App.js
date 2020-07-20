import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../node_modules/fomantic-ui/dist/semantic.min.css';

import history from './helpers/history';

import {initialise, startLogout} from './actions/auth';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Secret from './pages/Secret';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App({initialise, isLoggedIn, startLogout}) {
    initialise();

    return (
        <Router history={history}>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {!isLoggedIn ? (
                        <React.Fragment>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li>
                                <button onClick={startLogout}>Logout</button>
                            </li>
                            <li>
                                <Link to="/secret">Secret</Link>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
                <h1>hello world</h1>
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
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: typeof state.auth.token === 'string' && state.auth.token.length,
    };
};

const mapDispatchToProps = {initialise, startLogout};

export default connect(mapStateToProps, mapDispatchToProps)(App);
