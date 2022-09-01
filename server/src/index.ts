/* eslint-disable no-console */
import app from './app';
import serverEnv from './utils/config';

const PORT = serverEnv.PORT;

app.listen(PORT, () => {
  // @ts-ignore
  console.log(`Server started on port ${PORT}`);
});
