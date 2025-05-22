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
      const error = new Error('You do not have access to this URL\'s stats');
      error.status = 403;
      return next(error);
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

  } catch (err) {
    console.error("Analytics error:", error);
    const error = new Error('Server error');
    error.status = 500;
    return next(error)
  }
}
