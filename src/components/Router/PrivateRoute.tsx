import React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import isLoggedIn from '../../helpers/isLoggedIn';

interface PrivateRouteProps extends RouteProps {
    isLoggedIn: boolean;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ isLoggedIn, children, ...rest }) => {
    return <Route {...rest} render={privateRouteRender(isLoggedIn, children)} />;
};

export const privateRouteRender = (isLoggedIn: boolean, children: React.ReactNode) => {
    return (props: RouteComponentProps) => {
        if (!isLoggedIn) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        return children;
    };
};
// TODO ROOT STATE
export const mapStateToProps = (state: { auth: { token: string } }) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
    };
};

export default connect(mapStateToProps)(PrivateRoute);
