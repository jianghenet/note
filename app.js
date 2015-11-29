var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [JSON.stringify(request.query)];
  if(method.toUpperCase() == 'GET'){
    response.end('<html><body><form action="/save/" method="POST"><textarea name="note"></textarea> <input type="submit" value="Save"> </form></body></html>') 
  }else if(method.toUpperCase() == 'POST'){
    var post='';  
    request.on('data',function(chunk){
      post += chunk;
    }); 
    request.on('end',function(){
      post=querystring.parse(post);
      response.end(util.inspect(post));
    });
  }else{
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    response.write(JSON.stringify(responseBody));
    response.end();

  }

}).listen(11123);
console.log('Service starting 0.0.0.0:11123');
