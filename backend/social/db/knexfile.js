// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const {knexSnakeCaseMappers} = require('objection')
module.exports = {

  
  development: {
    client: 'postgresql',
    connection: {
       host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE ,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations',
      },
    seeds:{
      directory: './seeds'
    },
    ...knexSnakeCaseMappers,
  },

  

};
