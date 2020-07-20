import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import authService from '../services/authentication';

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!authService.isLoggedIn()) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
                }

                return children;
            }}
        />
    );
}

export default PrivateRoute;
