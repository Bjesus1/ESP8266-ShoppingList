var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var async = require("async");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'database name'
});

//Start database connection
connection.connect();

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

          var post  = {name: chunk.toString().split('/r/n'), quantity: 1 };

          connection.query('INSERT INTO products SET ?', post, function(err, result) { });

          console.log("The file was saved!");

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

    //Get info from database
    case '/order':

      if (req.method == 'GET') {
      
        var counter = 0;
        var counter = [0,0,0,0,0];
        var queryString = 'SELECT name FROM products';
        console.log("[200] " + req.method + " to " + req.url);

        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.write('<html><head><title>Shiftforward shopping list</title></head><body>');
     
        connection.query(queryString, function(err, rows, fields) {
          if (err) throw err;
           
          for (var i in rows) {
            switch(rows[i].name){
              case rows[i].name = 'cookies':

                console.log('name: ', rows[i].name);
                counter[0]++;
                console.log(counter[0]);
                break;

              default:
                console.log(rows[i].name + " bad ");
            }
          }
          res.write("<h1>Cookies: " + counter[0] + "</h1>");
          res.write("<form action='/server.js'>");
          res.write("<input type='hidden' name='reset' value='1'/>");
          res.write("<button>Reset</button>");
          res.write("</form></body></html");
        });

      } else {
        
        console.log("[405] " + req.method + " to " + req.url);
        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
        res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
      }
  
    break;

    case '/server.js?reset=1':

      if (req.method == 'GET') {

        var sql_string = "DELETE FROM products;";
        connection.query(sql_string, function(err, rows, fields) {
          if (err) throw err;
          console.log("deleted");
        });

        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        res.write('<html><head><title>Shiftforward shopping list</title></head><body>');
        res.write("<h1>Database is now empty</h1>");    
        res.write("</body></html");

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
