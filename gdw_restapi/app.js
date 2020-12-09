const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const schuleRoutes = require('./api/routes/schule');
const lehrerRoutes = require('./api/routes/lehrer');
const schuelerRoutes = require('./api/routes/schueler');
const fachRoutes = require('./api/routes/fach');
const klassenRoutes = require('./api/routes/klassen');
const lernstoffRoutes = require('./api/routes/lernstoff');

//mongoose.connect('mongodb+srv://root:Passwrod@cluster.mongodb.net/', {dbName: 'restapi'});
mongoose.connect('mongodb+srv://root:' + process.env.MONGO_ATLAS_PW + '@restapi.mj6dh.mongodb.net/restapi?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise; // no deprication warning more.

// logger
app.use(morgan('dev'));
// wandelt um.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// security
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// Routen
app.use('/schule', schuleRoutes);
app.use('/lehrer', lehrerRoutes);
app.use('/schueler', schuelerRoutes);
app.use('/fach', fachRoutes);
app.use('/klassen', klassenRoutes);
app.use('/lernstoff', lernstoffRoutes);

// Error Objekt.
app.use((req, res, next) => {
    const error = new Error('Nichts gefunden');
    error.status = 404;
    next(error);
});

// Wenn obere Error fail, nicht gefunden ist + Ausgaben von oben.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;

