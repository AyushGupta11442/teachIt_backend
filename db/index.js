import pkg from 'pg';
const { Client } = pkg;

export const dbclient = async () => {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5234,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'ayush11442',
    database: process.env.DB_NAME || 'user'
  });

  try {
    await client.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Connection error', err.stack);
    throw err;
  }
};
