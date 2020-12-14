
const apiAufrufMitRequest = require('./aufrufReqestApi');

const http = require('http');

// Server aufruf mit 2 GET Optionen aufrufbar = request und node
http.createServer((req, res) => {
        if(req.url === "/request"){
            apiAufrufMitRequest.apiAufruf(function(response){ // Ruft die Funktion von der Request.js
                //console.log(JSON.stringify(response));
                res.write(JSON.stringify(response));
                res.end();
            });
        }
}).listen(3000);

console.log("Server läuft auf den PORT 3000");
