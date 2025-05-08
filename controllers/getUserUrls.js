import { query } from '../config/db.js';
import logger from '../utils/logger.js';

export default async function getUserUrls(req, res) {
  const userId = req.user.id;

  try {
    const sql = `
      SELECT short_url AS "shortCode",
             original_url AS "longUrl",
             created_at AS "createdAt",
             expires_at AS "expiresAt",
             hits AS "clicks"
      FROM urls
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await query(sql, [userId]);

    return res.status(200).json({ urls: result.rows });
  } catch (error) {
    logger.error("Error fetching user's URLs:", error);
    return res.status(500).json({ message: 'Server error fetching URLs' });
  }
}
