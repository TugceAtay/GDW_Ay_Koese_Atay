const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const schuleRoutes = require('./api/routes/schule');
const lehrerRoutes = require('./api/routes/lehrer');
const schuelerRoutes = require('./api/routes/schueler');
const fachRoutes = require('./api/routes/fach');
const klassenRoutes = require('./api/routes/klassen');
const lernstoffRoutes = require('./api/routes/lernstoff');
const erziehungsberechtigterRoutes = require('./api/routes/erziehungsberechtigter');
const stundenplanRoutes = require('./api/routes/stundenplan');
const testRoutes = require('./api/routes/test');
const testergebnisRoutes = require('./api/routes/testergebnis');
const aufgabeRoutes = require('./api/routes/aufgabe');
const loesungaufgabeRoutes = require('./api/routes/loesungaufgabe');

//mongoose.connect('mongodb+srv://root:Passwrod@cluster.mongodb.net/', {dbName: 'restapi'});
mongoose.connect('mongodb+srv://root:' + process.env.MONGO_ATLAS_PW + '@restapi.mj6dh.mongodb.net/restapi?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// wandelt um.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routen
app.use('/schule', schuleRoutes);
app.use('/lehrer', lehrerRoutes);
app.use('/schueler', schuelerRoutes);
app.use('/fach', fachRoutes);
app.use('/klassen', klassenRoutes);
app.use('/lernstoff', lernstoffRoutes);
app.use('/erziehungsberechtigter', erziehungsberechtigterRoutes);
app.use('/stundenplan', stundenplanRoutes);
app.use('/test', testRoutes);
app.use('/testergebnis', testergebnisRoutes);
app.use('/aufgabe', aufgabeRoutes);
app.use('/loesungaufgabe', loesungaufgabeRoutes);

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

