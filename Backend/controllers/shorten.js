import { nanoid } from "nanoid"
import validator from "validator"
import { query } from "../config/db.js"
import logger from "../utils/logger.js"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

export default async function shortenUrlHandler(req, res, next) {
  const { longUrl, customCode, expiresAt } = req.body
  const userId = req.user.id

  if (!longUrl || !validator.isURL(longUrl)) {
    const error = new Error(' A valid url is required');
    error.status = 404;
    return next(error);
  }

  let shortCode = customCode || nanoid(7)

  // Validate custom code format (optional)
  const codeRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_-]{5,15}$/;
  if (customCode && !codeRegex.test(customCode)) {
    const error = new Error("Custom code must be 4-20 characters, alphanumeric or - _");
    error.status = 404;
    return next(error);
  }

  // Validate expiresAt (optional)
  let expiresAtDate = null
  if (expiresAt) {
    const date = new Date(expiresAt)
    if (isNaN(date.getTime()) || date < new Date()) {
      const error = new Error("expiresAt must be a valid future date");
      error.status = 404;
      return next(error);
    }
    expiresAtDate = date
  }

  // Check for code conflicts
  const existing = await query("SELECT id FROM urls WHERE short_url = $1", [shortCode])
  if (existing.rows.length > 0) {
    const error = new Error('Short code is already in use');
    error.status = 409;
    return next(error);
  }

  // Insert into DB
  try {
    await query(`
      INSERT INTO urls (short_url, original_url, user_id, created_at, expires_at, hits)
      VALUES ($1, $2, $3, NOW(), $4, 0)
    `, [shortCode, longUrl, userId, expiresAtDate])

    logger.info(`Short URL created for user ${userId}: ${shortCode}`)

    return res.status(201).json({
      shortCode,
      shortUrl: `${BASE_URL}/redirected to/${shortCode}`
    })

  } catch (err) {
    logger.error("Error creating short URL", err)
    const error = new Error('Error creating short URL');
    error.status = 500;
    return next(error);
  }
}
