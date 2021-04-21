import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import sinhVienRoutes from './routes/sinhViens.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/sinh-viens', sinhVienRoutes);

const CONNECTION_URL = 'mongodb+srv://admin:admin123456@cluster0.cjuu6.mongodb.net/QLKL?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.plugin(upsertMany);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);