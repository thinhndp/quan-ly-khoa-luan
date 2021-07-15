import express from 'express';

import { getSystemSetting, updateSystemSetting } from '../controllers/systemSettingCtrl.js';

const router = express.Router();

router.get('/', getSystemSetting);
router.post('/', updateSystemSetting);

export default router;
