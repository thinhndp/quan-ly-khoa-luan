import express from 'express';

import { getCustomSettingByName, updateCustomSettingByName } from '../controllers/customeSettingCtrl.js';

const router = express.Router();

router.post('/get', getCustomSettingByName);
router.post('/update', updateCustomSettingByName);

export default router;
