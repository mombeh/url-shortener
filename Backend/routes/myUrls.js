//myurl.js
import express from 'express';
import authMiddleware from '../middlewares/authmiddleware.js';
import getUserUrls from '../controllers/getUserUrls.js';

const router = express.Router();

router.get('/', authMiddleware, getUserUrls);

export default router;
