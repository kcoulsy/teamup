import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configure';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  // <StrictMode> commented out until the antd team fixes deprecated code
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen />
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  // </StrictMode>
  document.getElementById('root')
);
