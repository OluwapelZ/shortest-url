import express from 'express';
import { TYPES } from '../constant';
import { diContainer } from '../config/di';
import { UrlController } from '../controller';
const router = express.Router();

const urlController = diContainer.get<UrlController>(TYPES.UrlController);

router.get('/health', (req, res) => {
    res.json({
        status: true,
        message: 'Url shortner service is running 🚀'
    });
});

router.post('/encode', urlController.encodeUrl);
router.post('/decode', urlController.decodeUrl);

export default router;