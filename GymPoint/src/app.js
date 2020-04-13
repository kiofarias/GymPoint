import express from 'express';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.route();
  }

  middlewares() {
    this.server.use(express.json());
  }

  route() {
    this.server.use(routes);
  }
}

export default new App().server;
