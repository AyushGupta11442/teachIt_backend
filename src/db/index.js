import pkg from 'pg';
const { Pool } = pkg;

export const dbclient = async () => {
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5234,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'user'
  });

  try {
    console.log('Connecting to the database');
    return pool;
  } catch (err) {
    console.error('Connection error', err.stack);
    throw err;
  }
};
