import { query } from '../config/db.js';

export default async function analyticsHandler(req, res) {
  const { shortCode } = req.params;
  const userId = req.user.id;

  try {
    const sql = `
      SELECT original_url, short_url, created_at, expires_at, hits
      FROM urls
      WHERE short_url = $1 AND user_id = $2
    `;
    const result = await query(sql, [shortCode, userId]);

    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'You do not have access to this URL\'s stats' });
    }

    const data = result.rows[0];

    return res.json({
      originalUrl: data.original_url,
      shortCode,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      clicks: data.hits,
      createdAt: data.created_at,
      expiresAt: data.expires_at
    });

  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
}
