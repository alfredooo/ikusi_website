var fs      = require('fs'),
    mime    = require('mime'),
    http    = require('http');

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

//Create server
var port =  8081;
var server  = http.createServer(init).listen(port);

function init(req, res) {
    var path ='web';

    if(req.url == '/'){
        path = path + '/index.html' //kdfjsd.co
    }
    else{
        path = path + req.url;
    }

    fs.exists(path,function(exist){
        if(exist){
            fs.readFile(path,function(error,content){
                if (error){
                    res.writeHead(500);
                    res.end();
                    console.log("here");
                } else {
                    res.writeHead(200,{'Content-Type':mime.lookup(path)});
                    res.end(content);
                }
            });
        }
        else{
            res.writeHead(404);
            res.end();
        }
    });
}