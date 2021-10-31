const { scrapGoalRecord } = require('../module/pl-scrapper');
const createError = require('http-errors');

const getRecord = (req, res, next) => {
    if(req.params.category === 'goals'){
        getGoalRecord(res, next);
    } else if(req.params.category === 'assists'){
        getAssistRecord(res, next);
    } else if(req.params.category === 'appearances'){
        getAppearanceRecord(res, next);
    } else {
        next(createError(404));
    }
}

const getGoalRecord = (res, next) => {
    scrapGoalRecord('goals')
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
};

const getAssistRecord = (res, next) => {
    scrapGoalRecord('goal_assist')
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
};

const getAppearanceRecord = (res, next) => {
    scrapGoalRecord('appearances')
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
};

module.exports = {
    getRecord
}