import dotenv from 'dotenv';
// Import local.
import app from './routes/app';
import mongoConn from './config/mongo/mongo';
import logger from './config/winston/logger'

dotenv.config();
const PORT: number = parseInt(`${process.env.PORT || 5000}`);

app.listen(PORT, () => {
  logger.info('Servidor Online');
  logger.info(`Na porta: ${PORT}`);
  // Banco de dados.
  mongoConn();
});