const createError = require('http-errors');

module.exports = (app) => {
    app.use((req, res, next) => {
        if(req === '/'){
            res.json({
                message: "hello"
            })
        }
        
        next(createError(404));
    });
}