import React from 'react';
import { connect } from 'react-redux';

import '../node_modules/fomantic-ui/dist/semantic.min.css';

import { initialise } from './actions/auth';

import AppRouter from './components/Router/AppRouter';
import NavBar from './components/NavBar/NavBar';

interface AppProps {
    initialise: Function;
}

export const App : React.FunctionComponent<AppProps> = ({ initialise }) => {
    initialise();

    return (
        <AppRouter>
            <div className="App">
                <NavBar />
                <h1>hello world</h1>
            </div>
        </AppRouter>
    );
};

const mapDispatchToProps = { initialise };

export default connect(undefined, mapDispatchToProps)(App);
