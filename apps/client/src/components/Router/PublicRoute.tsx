import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import * as H from 'history';
import useUser from '../../hooks/useUser';

export const publicRouteRender = (isLoggedIn: boolean, children: React.ReactNode) =>
  function redirectComponent({ location }: PublicRouteRenderProps): React.ReactNode {
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/', state: { from: location } }} />;
    }

    return children;
  };

function PublicRoute({ children, ...rest }: RouteProps) {
  const { isLoggedIn } = useUser();
  // @ts-ignore
  return <Route {...rest} render={publicRouteRender(isLoggedIn, children)} />;
}

export interface PublicRouteRenderProps {
  location: H.Location<any>;
}

export default PublicRoute;
