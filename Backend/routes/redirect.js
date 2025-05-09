import express from 'express';
import redirectHandler from '../controllers/redirect.js';

const router = express.Router();

router.get('/:shortCode', redirectHandler);

export default router;
