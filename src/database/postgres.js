import pg from 'pg';

const { Pool } = pg;

const user = 'postgres';
const password = 'postgres';
const host = 'localhost';
const port = 5432;
const database = 'shortURL';

const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});

const query = connection.query('SELECT * FROM users');

query.then(result => {
    console.log(result.rows);
});

export default connection;