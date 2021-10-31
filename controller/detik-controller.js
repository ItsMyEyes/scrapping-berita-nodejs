const { scrapTopNews, scrapTopTopics, scrapTopVideos, scrapCovid } = require('../module/detik-scrapper');
const createError = require('http-errors');

const category = {
    all: "/",
    finance: "/finance",
    tech: "/inet",
    sport: "/sport",
    health: "/health",
    food: "/food",
    otomotif: "/oto",
    travel: "/travel"
}

const getTopNews = (req, res, next) => {
    const path = category[req.params.category];

    if(!path){
        next(createError(404));
    }

    scrapTopNews(path)
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
}

const getTopTopics = (req, res, next) => {
    scrapTopTopics()
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
}

const getTopVideos = (req, res, next) => {
    scrapTopVideos()
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
}

const getCovid = (req, res, next) => {
    scrapCovid()
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
}

module.exports = {
    getTopNews,
    getTopTopics,
    getTopVideos,
    getCovid
}