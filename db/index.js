const oracledb = require('oracledb');
// Load environment variables from .env file (optional)

const dbConfig = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD, 
  connectString: process.env.DB_CONNECTION_STRING 
};

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Successfully connected to Oracle Database XE');
    return connection;
  } catch (err) {
    console.error('Error connecting to Oracle Database XE:', err);
    throw err;
  }
}

async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(query, params);
    return result;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing the connection:', err);
      }
    }
  }
}

export default getConnection;
