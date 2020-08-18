import React from 'react';
import { connect } from 'react-redux';

import { initialise } from './actions/auth';

import AppRouter from './components/Router/AppRouter';
import 'antd/dist/antd.css';

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
