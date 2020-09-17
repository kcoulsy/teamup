import { configureStore } from '@reduxjs/toolkit';

// Import Reducers
import authReducer from '../reducers/auth';
import teamReducer from '../reducers/team';
import userReducer from '../reducers/user';

const store = configureStore({
    reducer: {
        // reducers here
        auth: authReducer,
        team: teamReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
