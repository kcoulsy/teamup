import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configure';

import App from './App';

ReactDOM.render(
    // <StrictMode> commented out until the antd team fixes deprecated code
        <Provider store={store} >
            <App />
        </Provider>
    // </StrictMode> 
    ,
    document.getElementById('root')
);
