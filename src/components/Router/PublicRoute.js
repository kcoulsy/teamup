import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isLoggedIn from '../../helpers/isLoggedIn';

export const PublicRoute = ({ isLoggedIn, children, ...rest }) => {
    return <Route {...rest} render={publicRouteRender(isLoggedIn, children)} />;
};

export const publicRouteRender = (isLoggedIn, children) => {
    return (props) => {
        if (isLoggedIn) {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }

        return children;
    };
};

export const mapStateToProps = (state) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
    };
};

export default connect(mapStateToProps)(PublicRoute);
