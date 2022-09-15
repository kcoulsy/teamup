import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import * as H from 'history';
import useUser from '../../hooks/useUser';

export const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isLoggedIn } = useUser();
  //@ts-ignore
  return <Route {...rest} render={publicRouteRender(isLoggedIn, children)} />;
};

export interface PublicRouteRenderProps {
  location: H.Location<any>;
}

export const publicRouteRender = (
  isLoggedIn: boolean,
  children: React.ReactNode
) => {
  return (props: PublicRouteRenderProps): React.ReactNode => {
    if (isLoggedIn) {
      return (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      );
    }

    return children;
  };
};

export default PublicRoute;
