const request = require('request');

// CORONA API
//_EXTERNAL_URL = 'https://corona-api.com/countries/De';

// DUDEN API
//_EXTERNAL_URL = 'https://www.openthesaurus.de/synonyme/search?q=Krieg&format=application/json';

_EXTERNAL_URL = 'https://corona-api.com/countries/De';

const aufrufApiMitRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
        if (err) {
            return callback(err);
        }
        return callback(body);
    });
};

module.exports.apiAufruf = aufrufApiMitRequest;
