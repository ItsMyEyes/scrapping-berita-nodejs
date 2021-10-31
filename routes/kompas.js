const { Router } = require('express');
const { getTopNews } = require('../controller/kompas-controller');

const router = Router();

router.get('/kompas/news/:category', getTopNews);

module.exports = router;