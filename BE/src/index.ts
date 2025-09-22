import 'dotenv/config';
import express from 'express'
import mongodb from './db';
import router from './routes';
import cors from 'cors'
const app = express()
mongodb()
app.use(express.json())
app.use(cors({origin:'http://localhost:5173'}))
app.use('/api',router)

app.listen(3000)