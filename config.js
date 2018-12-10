const NODE_ENV = process.env.NODE_ENV || 'develop'

let config = {
  project: 'express-es6-boilerplate',
  version: '0.1',
  port: 8080,
  db: {
    host: 'mysql-micro-sep.czpjgtsu7oqq.ap-northeast-2.rds.amazonaws.com',
    database: 'dev',
    username: 'dev',
    password: 'qwerTY!@',
    dialect: 'mysql',
    timezone: '+09:00',
    forceSync: false,
    alter: false
  },
  sentry: {
    DSN: ''
  },
  privateKey: 'express-sequelize-boilerplate',
  header: {
    token: 'x-access-token'
  },
  pagination: {
    defaultPage: 1,
    defaultPageSize: 10
  }
}

if (NODE_ENV == 'public-develop') {
  config.port = 8041
}

if (NODE_ENV == 'production') {
  config.port = 10080
}

module.exports = config
