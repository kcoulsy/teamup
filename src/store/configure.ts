import { configureStore } from '@reduxjs/toolkit';

// Import Reducers
import authReducer from '../reducers/auth';
import teamReducer from '../reducers/team';

const store = configureStore({
    reducer: {
        // reducers here
        auth: authReducer,
        team: teamReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
