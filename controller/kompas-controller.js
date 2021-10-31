const { scrapTopNews } = require('../module/kompas-scrapper');
const createError = require('http-errors');

const category = {
    top: '/terpopuler',
    headline: '/headline',
    sorotan: '/sorotan'
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
    });
}

module.exports = {
    getTopNews
}