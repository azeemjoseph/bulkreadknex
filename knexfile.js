module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "zane@123",
      database: "excel_data",
      port: "3307",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

// "username": "root",
//     "password": "zane@123",
//     "database": "dbcliniccatalyse_development",
//     "host": "127.0.0.1",
//     "port": "3307",
//     "dialect": "mariadb",
