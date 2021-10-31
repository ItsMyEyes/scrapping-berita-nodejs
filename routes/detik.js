const { Router } = require('express');
const { getTopNews, getTopTopics, getTopVideos, getCovid } = require('../controller/detik-controller')

const router = Router();

router.get('/detik/topics', getTopTopics);
router.get('/detik/videos', getTopVideos);
router.get('/detik/covid', getCovid);
router.get('/detik/news/:category', getTopNews);

module.exports = router;