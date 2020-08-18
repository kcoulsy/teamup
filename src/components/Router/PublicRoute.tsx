import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import isLoggedIn from '../../helpers/isLoggedIn';
import { RootState } from '../../store/configure';
import * as H from 'history';

interface PublicRouteProps extends RouteProps {
    isLoggedIn: boolean;
}

export const PublicRoute: React.FunctionComponent<PublicRouteProps> = ({
    isLoggedIn,
    children,
    ...rest
}) => {
    return <Route {...rest} render={publicRouteRender(isLoggedIn, children)} />;
};

export interface PublicRouteRenderProps {
    location: H.Location<any>;
}

export const publicRouteRender = (
    isLoggedIn: boolean,
    children: React.ReactNode
) => {
    return (props: PublicRouteRenderProps) => {
        if (isLoggedIn) {
            return (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            );
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
