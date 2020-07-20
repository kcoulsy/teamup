import React from 'react';
import { connect } from 'react-redux';

import '../node_modules/fomantic-ui/dist/semantic.min.css';

import { initialise, startLogout } from './actions/auth';

import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';

function App({ initialise, isLoggedIn, startLogout }) {
    initialise();

    return (
        <AppRouter>
            <div className="App">
                <NavBar />
                <h1>hello world</h1>
            </div>
        </AppRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: typeof state.auth.token === 'string' && state.auth.token.length,
    };
};

const mapDispatchToProps = { initialise, startLogout };

export default connect(mapStateToProps, mapDispatchToProps)(App);
