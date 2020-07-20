import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import authService from '../services/authentication';

function PublicRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authService.isLoggedIn()) {
                    return <Redirect to={{pathname: '/', state: {from: props.location}}} />;
                }

                return children;
            }}
        />
    );
}

export default PublicRoute;
