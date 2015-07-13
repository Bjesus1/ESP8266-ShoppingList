var http = require('http');
var fs = require('fs');
 
http.createServer(function (req, res) {
  // set up some routes
  switch(req.url) {
    // show the user a simple form
    case '/':
      console.log("[200] " + req.method + " to " + req.url);
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.write('<html><head><title>Hello</title></head><body>');
      res.write('<h1>insert /order in the url</h1>'); 
      res.write('</body></html');
      res.end();
      break;

    case '/products':
 
    if (req.method == 'POST') {
      console.log("[200] " + req.method + " to " + req.url);
        
      req.on('data', function(chunk) {
        console.log("Received body data:");
        console.log(chunk.toString());

        fs.appendFile("C:/Users/Bruno/Documents/ShoppingList/products.txt", chunk.toString() + "\r\n", function(erroror) {
          if(erroror) {
              return console.log(erroror);
          }

          console.log("The file was saved!");
        }); 

      });
      
      req.on('end', function() {
        // empty 200 OK response for now
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.end();
      });
      
    } else {
      console.log("[405] " + req.method + " to " + req.url);
      res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
      res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
    }
  
  break;

  //Read the File using when the request is get

  case '/order':
 
    if (req.method == 'GET') {
      console.log("[200] " + req.method + " to " + req.url);
        
      fs.readFile('C:/Users/Bruno/Documents/ShoppingList/products.txt', function(error, data) {
        if(error) throw error;
        var array = data.toString().split("\r\n");
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.write('<html><head><title>Hello</title></head><body>');

        var product = {};
        array.map( function (a) { if (a in product) product[a] ++; else product[a] = 1; } );
        
        res.write('<h1>Cookies=' + product["cookies"] + '</h1>'); 
        res.write('<h1>water=' + product["water"] + '</h1>'); 
        res.write('</form></body></html');
        res.end();
      });

    } else {
      console.log("[405] " + req.method + " to " + req.url);
      res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
      res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
    }
  
  break;

    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      console.log("[404] " + req.method + " to " + req.url);
  };
}).listen(3020); 
