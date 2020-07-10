import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import '../node_modules/fomantic-ui/dist/semantic.min.css';

import history from './helpers/history';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Secret from './pages/Secret';

import authService from './services/authentication';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
    // authService.login("test", "123141234")/
    return (
        <Router history={history}>
            <div className="App">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/secret">Secret</Link></li>
                </ul>
                <h1>hello world</h1>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <PublicRoute path="/register"><Register /></PublicRoute>
                    <PublicRoute path="/login"><Login /></PublicRoute>
                    <PrivateRoute path="/secret"><Secret /></PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
