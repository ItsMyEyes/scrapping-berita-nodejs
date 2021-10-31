const { scrapTopNews } = require('../module/kumparan-scrapper');
const createError = require('http-errors');

const category = {
    all: '/',
    trending: '/news'
}

const getTopNews = async (req, res, next) => {
    const path = category[req.params.category];

    if(!path){
        next(createError(404));
    }

    try {
        const data = await scrapTopNews(path);
        res.json({
            data
        });
    } catch(error) {
        next(createError(500));
    }
}

module.exports = {
    getTopNews
}