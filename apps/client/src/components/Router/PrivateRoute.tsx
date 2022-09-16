import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
// TODO : remove this package
import * as H from 'history';
import useUser from '../../hooks/useUser';

export const privateRouteRender = (isLoggedIn: boolean, children: React.ReactNode) =>
  function redirectComponent(props: PrivateRouteRenderProps): React.ReactNode {
    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }

    return children;
  };

function PrivateRoute({ children, ...rest }: RouteProps) {
  const { isLoggedIn } = useUser();
  // @ts-ignore
  return <Route {...rest} render={privateRouteRender(isLoggedIn, children)} />;
}

export interface PrivateRouteRenderProps {
  location: H.Location<any>;
}

export default PrivateRoute;
