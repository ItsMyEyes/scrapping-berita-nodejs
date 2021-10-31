const { scrapTopTopics } = require('../module/google-trend-scrapper');
const createError = require('http-errors');

const country = {
    ID: '?geo=ID',
    US: '?geo=US',
    JP: '?geo=JP',
    GB: '?geo=GB',
    SG: '?geo=SG',
    IN: '?geo=IN'
}

const getTopTopics = (req, res, next) => {
    const path = country[req.params.country.toUpperCase()];

    if(!path){
        next(createError(404));
    }

    scrapTopTopics(path)
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
    getTopTopics
}