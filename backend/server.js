import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import app from './app.js';

dotenv.config();

connectDB()
  .then(() => {
    app.on('error', (err) => {
      console.error('Error: ' + err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error('Error: ' + err);
    throw err;
  });