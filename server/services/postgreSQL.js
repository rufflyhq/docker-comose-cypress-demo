const { Pool, Client } = require('pg');

const tableName = 'users';
const insertQuery = `INSERT INTO ${tableName}(name, email) VALUES($1, $2) RETURNING *`;
const query = `SELECT * FROM ${tableName}`;
const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (name text, email text)`;
const deleteQuery = `DELETE FROM ${tableName} WHERE email = $1`;

const createTable = client => {
  return client.query(tableQuery).then(() => client);
};

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const insertUser = (name, email) => {
  return pool
    .connect()
    .then(createTable)
    .then(async client => {
      const data = await client.query(insertQuery, [name, email]);
      client.release();
      return data;
    });
};

const getUsers = () => {
  return pool
    .connect()
    .then(createTable)
    .then(async client => {
      const data = await client.query(query);
      client.release();
      return data;
    });
};

const deleteUser = email => {
  return pool
    .connect()
    .then(createTable)
    .then(async client => {
      const data = await client.query(deleteQuery, [email]);
      client.release();
      return data;
    });
};

module.exports = {
  insertUser,
  getUsers,
  deleteUser,
};
