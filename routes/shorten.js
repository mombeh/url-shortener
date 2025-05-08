import express from "express"
import authMiddleware from "../middlewares/authmiddleware.js"
import shortenUrlHandler from "../controllers/shorten.js"

const router = express.Router()

router.post("/", authMiddleware, shortenUrlHandler)


export default router
