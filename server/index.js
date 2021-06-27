import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';
import cors from 'cors';
import path, { dirname }  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import postRoutes from './routes/posts.js';
import sinhVienRoutes from './routes/sinhViens.js';
import giangVienRoutes from './routes/giangViens.js';
import deTaiRoutes from './routes/deTais.js';
import systemSettingRoutes from './routes/systemSettings.js';
import authRoutes from './routes/auths.js';
import thuMucRoutes from './routes/thuMucs.js';
import bieuMauRoutes from './routes/bieuMaus.js';
import customSettingRoutes from './routes/customSettings.js';
import phongHocRoutes from './routes/phongHocs.js';
import hoiDongRoutes from './routes/hoiDongs.js';
import kyThucHienRoutes from './routes/kyThucHiens.js';
import userRoutes from './routes/users.js';
import taskLogRoutes from './routes/taskLogs.js';
import reportRoutes from './routes/reports.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/sinh-viens', sinhVienRoutes);
app.use('/giang-viens', giangVienRoutes);
app.use('/de-tais', deTaiRoutes);
app.use('/system-setting', systemSettingRoutes);
app.use('/auth', authRoutes);
app.use('/thu-mucs', thuMucRoutes);
app.use('/bieu-maus', bieuMauRoutes);
app.use('/custom-setting', customSettingRoutes);
app.use('/phong-hocs', phongHocRoutes);
app.use('/hoi-dongs', hoiDongRoutes);
app.use('/ky-thuc-hiens', kyThucHienRoutes);
app.use('/users', userRoutes);
app.use('/task-logs', taskLogRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5000;

mongoose.plugin(upsertMany);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB has been connected"))
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))