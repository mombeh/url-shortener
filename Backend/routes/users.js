import express from 'express';
import { loginValidator, validate } from "../validators/registerValidator.js"
import registerHandler from "../controllers/registration.js"
import loginHandler from "../controllers/login.js"

const router = express.Router();

/* GET users listing. */
router.post("/register", validate, registerHandler)
router.post("/login", loginValidator, loginHandler)

export default router
