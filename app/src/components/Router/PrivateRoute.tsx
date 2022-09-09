import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import * as H from 'history';
import useUser from '../../hooks/useUser';

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isLoggedIn } = useUser();
  // @ts-ignore
  return <Route {...rest} render={privateRouteRender(isLoggedIn, children)} />;
};

export interface PrivateRouteRenderProps {
  location: H.Location<any>;
}

export const privateRouteRender = (
  isLoggedIn: boolean,
  children: React.ReactNode
) => {
  return (props: PrivateRouteRenderProps): React.ReactNode => {
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

export default PrivateRoute;
