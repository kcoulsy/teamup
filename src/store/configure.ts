import { configureStore } from '@reduxjs/toolkit';

// Import Reducers
import authReducer from '../reducers/auth';

const store = configureStore({
    reducer: {
        // reducers here
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
