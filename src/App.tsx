import React from 'react';
import { connect } from 'react-redux';

import { initialise } from './actions/initialise';

import AppRouter from './components/Router/AppRouter';
import 'antd/dist/antd.css';
import './styles.scss';

interface AppProps {
    initialise: Function;
}

export const App: React.FunctionComponent<AppProps> = ({ initialise }) => {
    initialise();

    return <AppRouter />;
};

const mapDispatchToProps = { initialise };

export default connect(undefined, mapDispatchToProps)(App);
