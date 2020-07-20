import {configureStore} from '@reduxjs/toolkit';

// Import Reducers

export default () => {
    const store = configureStore({
        reducer: {
            // reducers here
        },
    });

    return store;
};
