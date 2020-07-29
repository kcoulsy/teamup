import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isLoggedIn from '../../helpers/isLoggedIn';

function PublicRoute({ isLoggedIn, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isLoggedIn) {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
                }

                return children;
            }}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
    };
};

export default connect(mapStateToProps)(PublicRoute);
