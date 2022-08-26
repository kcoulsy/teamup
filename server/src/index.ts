/* eslint-disable no-console */
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
  // @ts-ignore
  console.log(`Server started on port ${PORT}`);
});
