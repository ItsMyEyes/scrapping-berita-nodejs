const { Router } = require('express');
const { getTopNews } = require('../controller/kumparan-controller');

const router = Router();

router.get('/kumparan/news/:category', getTopNews)

module.exports = router;