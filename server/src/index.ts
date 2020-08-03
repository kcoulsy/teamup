import app from './app';
import config from './config/config';

app.listen(config.port, () => {
    // tslint:disable-next-line
    console.log(`Server started on port ${config.port}`);
});
