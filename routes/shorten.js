import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import shortenUrlHandler from "../controllers/shorten.js"

const router = express.Router()

router.post("/shorten", authMiddleware, shortenUrlHandler)

export default router
