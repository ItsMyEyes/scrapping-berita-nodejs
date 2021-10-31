const homeRouter = require('./home');
const plRouter = require('./pl');
const detikRouter = require('./detik');
const kompasRoouter = require('./kompas');
const kumparanRouter = require('./kumparan');
const googleRouter = require('./google-trend');

module.exports = (app) => {
    app.use(plRouter);
    app.use(detikRouter);
    app.use(kompasRoouter);
    app.use(kumparanRouter);
    app.use(googleRouter);
    homeRouter(app);
}