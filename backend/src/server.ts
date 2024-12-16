import app from './app';
import { pool } from './db';

const PORT = process.env.PORT || 8080;

// Test Database Connection
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });
