const http = require('http');
const fs = require('fs');
const url = require('url');
const db = require("./db_connection.js");

var server = http.createServer(function(request, response){
    console.log('Request URL--', request.url)
    if(request.url == "/home"){
        fs.readFile("./home.html", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                response.writeHead(200,{'content-type':'text/html'});
                response.write(data);
            }
            // response.end();
        });
    }
    else if(request.url.indexOf('createUser') > 0){
        var y = url.parse(request.url, true);
        console.log(y.query);
        db.insertUser(y.query);
        db.usersList();
        response.writeHead(200,{'content-type':'text/html'});
        response.write("Insertion success");
    }
      
});
server.listen(1234);
console.log("http://localhost:1234/home");