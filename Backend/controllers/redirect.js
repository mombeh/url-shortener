import { query } from '../config/db.js';
import logger from '../utils/logger.js';


export default async function redirectHandler(req, res) {
  const { shortCode } = req.params;

  try {
    // Step 1: Look up the short URL
    const lookupSql = 'SELECT original_url, expires_at, hits FROM urls WHERE short_url = $1';
    const result = await query(lookupSql, [shortCode]);

    if (result.rows.length === 0) {
      logger.warn(`Short URL not found: ${shortCode}`);
      const error = new Error('Short URL not found');
      error.status = 404;
      return next(error);

    }

    const { original_url, expires_at, hits } = result.rows[0];

    // Step 2: Check expiration
    if (expires_at && new Date() > new Date(expires_at)) {
      logger.info(`Short URL expired: ${shortCode}`);
      const error = new Error('This link has expired');
      error.status = 404;
      return next(error);
    }

    // Step 3: Increment hits
    const updateHitsSql = 'UPDATE urls SET hits = $1 WHERE short_url = $2';
    await query(updateHitsSql, [hits + 1, shortCode]);

    logger.info(`Redirecting to ${original_url} from ${shortCode}`);

    // Step 4: Redirect
    return res.redirect(302, original_url);
  } catch (error) {
    logger.error(`Error redirecting shortCode ${shortCode}:`, error);
    const err = new Error('Server error');
    error.status = 500;
    return next(error);
  }
}
