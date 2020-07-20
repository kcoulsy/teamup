import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../node_modules/fomantic-ui/dist/semantic.min.css';

import history from './helpers/history';

import {initialise} from './actions/auth';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Secret from './pages/Secret';

import authService from './services/authentication';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App({initialise}) {
    initialise();
    // authService.login("test", "123141234")/
    const [authState, setAuthState] = useState(authService.isLoggedIn());

    // This all needs ripping out and replacing with redux
    const handleLogout = () => {
        authService.logout();
        setAuthState(authService.isLoggedIn());
    };

    return (
        <Router history={history}>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {!authState ? (
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
                                <button onClick={handleLogout}>Logout</button>
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

const mapDispatchToProps = {initialise};

export default connect(undefined, mapDispatchToProps)(App);
