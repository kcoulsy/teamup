import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import isLoggedIn from '../../helpers/isLoggedIn';
import { RootState } from '../../store/configure';

interface PublicRouteProps extends RouteProps {
    isLoggedIn: boolean;
}


export const PublicRoute: React.FunctionComponent<PublicRouteProps> = ({ isLoggedIn, children, ...rest }) => {
    return <Route {...rest} render={publicRouteRender(isLoggedIn, children)} />;
};

export const publicRouteRender = (isLoggedIn: boolean, children: React.ReactNode) => {
    return (props: RouteComponentProps) => {
        if (isLoggedIn) {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }

        return children;
    };
};

export const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
    };
};

export default connect(mapStateToProps)(PublicRoute);
