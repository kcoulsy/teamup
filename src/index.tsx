import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  // <StrictMode> commented out until the antd team fixes deprecated code
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen />
    <App />
  </QueryClientProvider>,
  // </StrictMode>
  document.getElementById('root')
);
