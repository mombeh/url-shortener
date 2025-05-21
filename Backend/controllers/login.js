// controllers/login.js
import { query } from "../config/db.js";
import logger from "../utils/logger.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function loginHandler(req, res, next) {
  const { email, password } = req.body;

  try {
    const findUserSQL = `SELECT id, email, first_name, last_name, password FROM users WHERE email = $1`;
    const userResult = await query(findUserSQL, [email]);

    if (userResult.rowCount === 0) {
      logger.warn(`Login attempt failed: User not found - ${email}`);
      const error = new Error("Invalid Credentials");
      error.status = 401;
      return next(error);
    }

    const user = userResult.rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      logger.warn(`Login attempt failed: Incorrect password - ${email}`);
      const error = new Error("Invalid Password");
      error.status = 401;
      return next(error);
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      },
      (err, token) => {
        if (err) {
          logger.error(`Error generating JWT for ${email}: `, err);
          const error = new Error("Error generating authentication token");
          error.status = 500;
          return next(error);
        }

        logger.info(`User logged in successfully: ${email} (ID: ${user.id})`);
        res.json({
          message: "Login Successful!",
          token,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    logger.error(`Error during login process for ${email}: `, err);
    const error = new Error("Server error during login");
    error.status = 500;
    return next(error);
  }
}
