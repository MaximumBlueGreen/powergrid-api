require('dotenv').config()
const path = require('path')

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: path.normalize(path.join(__dirname, '/migrations')),
  },
}
