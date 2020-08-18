import React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import { connect } from 'react-redux';
import isLoggedIn from '../../helpers/isLoggedIn';
import { RootState } from '../../store/configure';
import * as H from 'history';

interface PrivateRouteProps extends RouteProps {
    isLoggedIn: boolean;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
    isLoggedIn,
    children,
    ...rest
}) => {
    return <Route {...rest} render={privateRouteRender(isLoggedIn, children)} />;
};

export interface PrivateRouteRenderProps {
    location: H.Location<any>;
}

export const privateRouteRender = (
    isLoggedIn: boolean,
    children: React.ReactNode
) => {
    return (props: PrivateRouteRenderProps) : React.ReactNode => {
        if (!isLoggedIn) {
            return (
                <Redirect
                    to={{ pathname: '/login', state: { from: props.location } }}
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

export default connect(mapStateToProps)(PrivateRoute);
