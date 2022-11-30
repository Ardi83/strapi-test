const { parse } = require('pg-conncection-string');

module.exports = ({ env }) => {
    const { host, port, database, user, password } = parse(env('DATABASE_URL'));
    return {
        connection: {
            client: 'postgres',
            connection: {
                host,
                port,
                database,
                user,
                password,
            },
            debug: false,
        },
    }
  };