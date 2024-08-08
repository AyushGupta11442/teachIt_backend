import {dbclient} from '../db/index.js';
import bcrypt from 'bcrypt';

export const createuser = async (username, password, email) => {
    const pool = await dbclient();
    const client = await pool.connect(); // Get a connection from the pool
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at;
      `;
      const values = [username, email, hashedPassword];
  
      const result = await client.query(query, values);
      const newUser = result.rows[0];
      console.log('User created successfully:', newUser);
      return newUser;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    } finally {
      client.release(); // Release the client back to the pool
    }
  };