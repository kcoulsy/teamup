import {configureStore} from '@reduxjs/toolkit';

// Import Reducers
import authReducer from './../reducers/auth';

export default () => {
    const store = configureStore({
        reducer: {
            // reducers here
            auth: authReducer,
        },
    });

    return store;
};
