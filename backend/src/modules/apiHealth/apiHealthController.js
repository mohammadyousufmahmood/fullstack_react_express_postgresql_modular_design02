const pool = require('../../db/pool');
const logger = require('../../lib/logger');


async function getApiHealth(req, res) {
    try {
        const [result] = await pool.query('SELECT 1 + 1 AS result');
        if (result[0].result === 2) {
            res.status(200).json({ status: 'OK' });
        } else {
            logger.error('Unexpected result from database health check:', result);
            res.status(500).json({ status: 'Database health check failed' });
        }
    } catch (error) {
        logger.error('Database health check error:', error);
        res.status(503).json({ status: 'Database health check failed' });
    }
}


module.exports = {
    getApiHealth,
};

