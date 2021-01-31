import 'reflect-metadata'
import express from 'express';
import * as BodyParser from 'body-parser';
import { Logger, logger } from './utils';
import router from './router/url';
import config from './config';
import morgan from 'morgan';
import http from 'http';

const app = express();
const port = config.appPort;

// app.use(morgan('dev', { stream: logger.stream }))
app.use(BodyParser.json());

// Bind routes middleware to express application
app.use('/', router);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

server.listen(port, () => {
  return new Logger().info(`server is listening on: ${port} 🚀`);
});