import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ isLoggedIn, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
                }

                return children;
            }}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: typeof state.auth.token === 'string' && state.auth.token.length,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
