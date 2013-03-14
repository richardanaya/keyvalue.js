var express = require('express');

var settings = {
    //this will make your name value pairs publically accessable to the world
    useCORS: true,
    inMemory: true //TODO support false for database
}

var authorize = function(token){
    //do something to authorize the user based off header token ( you can make up anything )

    //by default authorization is true
    return true;
}


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var configureServer = function () {
    var server = express.createServer();

    server.configure(
        function () {
            server.use(express.bodyParser());
            if(settings.useCORS){
                server.use(allowCrossDomain);
            }
            //any public file from the public directory, just return it to user if requested
            server.use(express.static(__dirname + '/public/'));
        }
    );
    return server;
};

var port = process.env.PORT || 9999;
var server = configureServer();

var data = {

}

server.get("/data",
    function (req, res) {
        if(!authorize(req.header["KVPAuthorization"])){
            res.send(401);
        }

        var key = req.query.key;
        var val = data[key];
        if(val){
            res.send(val);
        }
        else {
            res.send(404);
        }
    }
);

server.post("/data",
    function (req, res) {
        if(!authorize(req.header["KVPAuthorization"])){
            res.send(401);
        }

        var key = req.query.key;
        var s='';
        req.setEncoding('utf8');
        req.on('data', function(chunk) {
            s += chunk;
        });

        req.on('end', function() {
            data[key] = s;
            res.send("")
        });
    }
);

server.delete("/data",
    function (req, res) {
        if(!authorize(req.header["KVPAuthorization"])){
            res.send(401);
        }
        var key = req.query.key;
        delete data[key];
        res.send("");
    }
);

server.get(/^.*$/,
    function (req, res) {
        res.redirect("index.html");
    }
);

server.listen(port);
