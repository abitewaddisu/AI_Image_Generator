import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
    res.send('Hello from DALL-E!');
});

try {
    connectDb(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port http://localhost:${process.env.PORT}`);
    });
} catch (error) {
    console.log(error)
}

