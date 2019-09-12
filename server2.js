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
        fs.readFile("./usersList.html", function(error, data){
            if(error){
                response.writeHead(404);
                response.write('Error found');
            }
            else{
                response.writeHead(200,{'content-type':'text/html'});
                response.write(data);
            }   
        });
    }

    // else if(request.url.indexOf('listUsers')>0){
        
    else if(request.url=="/usersList"){
/* ------------------------------------ Using callback function------------------------- */

            /*db.usersListUsingCallback(function (list){ 
                console.log(list);
                var details = JSON.stringify(list);
                response.writeHead(200,{'content-type':'application/json'});
                response.write(details);
            });
            console.log("end of userListFunction");*/


/* ------------------------------------ Using Promise function------------------------- */
            var prom = db.usersListUsingPromise();
            prom.then(function(data){
                console.log(data);
                var details = JSON.stringify(data);
                response.writeHead(200,{'content-type':'application/json'});
                response.write(details);
            }).catch(function(err){
                response.writeHead(500,{'content-type':'application/json'});
                response.write(err);
            })
            console.log("end of userListFunction");
        }   
});
server.listen(1234);
console.log("http://localhost:1234/home");