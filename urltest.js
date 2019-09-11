const url = require('url');
// var x = url.parse(request.url);
var x = "http://localhost:1234/createUser?userName=bhagath&email=bhagathkumarborra3%40gmail.com";
var y = url.parse(x, true);
console.log(y.host);
console.log(y.port);
console.log(y.query);

var queryData = y.query;
var uname = queryData.userName;
console.log(uname);
var email = queryData.email;
console.log(queryData.email);
