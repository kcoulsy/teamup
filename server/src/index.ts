/* eslint-disable no-console */
import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  // @ts-ignore
  console.log(`Server started on port ${config.port}`);
});
