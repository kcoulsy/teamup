import React, { PropsWithChildren } from 'react';

interface LoaderProps {
  isLoading: boolean;
  loadingText?: string;
  dark?: boolean;
}

function Loader({ isLoading, loadingText, dark, children }: PropsWithChildren<LoaderProps>) {
  let classNames = 'ui dimmer';

  if (isLoading) classNames += ' active';
  if (!dark) classNames += ' inverted'; // Light mode should be default

  return (
    <>
      <div className={classNames}>
        <div className='ui text loader'>{loadingText}</div>
      </div>
      {children}
    </>
  );
}

export default Loader;
