import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import history from './helpers/history';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
    return (
        <Router history={history}>
            <div className="App">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                <h1>hello world</h1>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/register"><Register /></Route>
                    <Route path="/login"><Login /></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
