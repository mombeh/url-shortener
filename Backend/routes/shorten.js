import express from "express"
import authMiddleware from "../middlewares/authmiddleware.js"
import shortenUrlHandler from "../controllers/shorten.js"
import analyticsHandler from "../controllers/analytics.js"; // <- Add this

const router = express.Router()

router.post("/", authMiddleware, shortenUrlHandler)
router.get("/:shortCode/stats", authMiddleware, analyticsHandler); // <- New route


export default router
