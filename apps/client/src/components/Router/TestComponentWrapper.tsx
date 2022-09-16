import React, { PropsWithChildren } from 'react';

function TestComponentWrapper({ children }: PropsWithChildren<{}>) {
  return <div>{children}</div>;
}

export default TestComponentWrapper;
