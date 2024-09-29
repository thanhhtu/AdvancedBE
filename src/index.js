import express from 'express';

import 'dotenv/config'
import routers from './apis';
import errorHandler from './middleware/handleError.middleware.js';
import validateMiddleware from './middleware/validate.middleware.js';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use('/', routers);

app.use(validateMiddleware.checkParam)
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})