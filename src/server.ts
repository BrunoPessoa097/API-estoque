import dotenv from 'dotenv';
// Import local.
import app from './routes/app';

dotenv.config();
const PORT: number = parseInt(`${process.env.PORT || 5000}`);

app.listen(PORT, () => {
  console.log('Servidor Online');
  console.log(`Na porta: ${PORT}`);
});