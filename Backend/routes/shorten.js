import express from "express"
import authMiddleware from "../middlewares/authmiddleware.js"
import shortenUrlHandler from "../controllers/shorten.js"
import analyticsHandler from "../controllers/analytics.js"; // <- Add this

const router = express.Router()

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Shorten a long URL
 *     tags:
 *       - URL
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: https://example.com/long/path
 *               customCode:
 *                 type: string
 *                 example: myCustom123
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-31T23:59:59Z
 *     responses:
 *       201:
 *         description: URL successfully shortened
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URL'
 *       400:
 *         description: Validation or input error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.post("/", authMiddleware, shortenUrlHandler)
router.get("/:shortCode/stats", authMiddleware, analyticsHandler); // <- New route


export default router
