import express from 'express';
import { TYPES } from '../constant';
import { container } from '../config/di';
import { UrlController } from '../controller';
import { ValidateRequest } from '../middleware/validation/request.validate';
const router = express.Router();

const validateRequestMiddleware = container.get<ValidateRequest>(TYPES.ValidateRequest);
const urlController = container.get<UrlController>(TYPES.UrlController);

router.get('/health', (req, res) => {
    res.json({
        status: true,
        message: 'Url shortner service is running 🚀'
    });
});

router.post('/encode', validateRequestMiddleware.encodeValidation, urlController.encodeUrl);
router.post('/decode', validateRequestMiddleware.decodeValidation, urlController.decodeUrl);

export default router;