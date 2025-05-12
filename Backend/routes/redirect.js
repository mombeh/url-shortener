import express from 'express';
import redirectHandler from '../controllers/redirect.js';

const router = express.Router();

/**
 * @swagger
 * /redirect/{shortCode}:
 *   get:
 *     summary: Redirect to original URL using short code
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The short code for the URL
 *     responses:
 *       302:
 *         description: Redirects to original URL
 *       404:
 *         description: Short URL not found or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/:shortCode', redirectHandler);

export default router;
