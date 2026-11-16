const express = require('express');
const { getApiHealth} = require('./apiHealthController');

const router = express.Router();
router.get('/api/health', getApiHealth);



module.exports = router;