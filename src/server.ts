import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
// Import local.
import app from './routes/app';

dotenv.config();
const PORT: number = parseInt(`${process.env.PORT || 5000}`);

app.use(helmet());
app.use(cors({
  origin: 'http://localhost',
  methods: ['GET','POST','PUT','DELETE']
}));


app.listen(PORT, () => {
  console.log('Servidor Online');
  console.log(`Na porta: ${PORT}`);
});