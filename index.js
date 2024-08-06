import dotenv from 'dotenv';
import { dbclient } from './db/index.js'; // Make sure this path is correct
import app from './app.js';

dotenv.config();

dbclient()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to the database: ${error}`);
    process.exit(1);
  });
