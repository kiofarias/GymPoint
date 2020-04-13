import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Student from '../app/models/Student';

const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conn = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.conn));
    models.map((model) => model.associate && model.associate(this.conn.models));
  }
}

export default new Database();
