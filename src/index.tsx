import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configure';

import App from './App';

const store = configureStore();

ReactDOM.render(
    <StrictMode>
        <Provider store={store} >
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
