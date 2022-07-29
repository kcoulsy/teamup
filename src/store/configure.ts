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
  devTools: true,
  //   middleware: [
  //     // @ts-ignore
  //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //       // @ts-ignore
  //       window.__REDUX_DEVTOOLS_EXTENSION__(),
  //   ],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
