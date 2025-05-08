import { nanoid } from "nanoid"
import validator from "validator"
import { query } from "../config/db.js"
import logger from "../utils/logger.js"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"

export default async function shortenUrlHandler(req, res) {
  const { longUrl, customCode, expiresAt } = req.body
  const userId = req.user.id

  if (!longUrl || !validator.isURL(longUrl)) {
    return res.status(400).json({ message: "A valid longUrl is required" })
  }

  let shortCode = customCode || nanoid(7)

  // Validate custom code format (optional)
  const codeRegex = /^[a-zA-Z0-9_-]{4,20}$/
  if (customCode && !codeRegex.test(customCode)) {
    return res.status(400).json({ message: "Custom code must be 4-20 characters, alphanumeric or - _" })
  }

  // Validate expiresAt (optional)
  let expiresAtDate = null
  if (expiresAt) {
    const date = new Date(expiresAt)
    if (isNaN(date.getTime()) || date < new Date()) {
      return res.status(400).json({ message: "expiresAt must be a valid future date" })
    }
    expiresAtDate = date
  }

  // Check for code conflicts
  const existing = await query("SELECT id FROM urls WHERE short_url = $1", [shortCode])
  if (existing.rows.length > 0) {
    return res.status(409).json({ message: "Short code is already in use" })
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
      shortUrl: `${BASE_URL}/${shortCode}`
    })

  } catch (err) {
    logger.error("Error creating short URL", err)
    return res.status(500).json({ message: "Error creating short URL" })
  }
}
