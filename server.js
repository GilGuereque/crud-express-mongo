// server.js
console.log('May Node be with you');
// use express
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
// connect to mongoDB
const MongoClient = require('mongodb').MongoClient;

// setting body-parser before CRUD handlers
app.use(bodyParser.urlencoded({ extended: true }))

// get request with Express
//app.get(endpoint, callback);

// We normally abbreviate `request` to `req` and `response` to `res`.
//app.get('/', function (req, res) {
    // do something here
// })

// my get request with Express:
// app.get('/', function(req,res){
//     res.send('Hello World');
// });

// ES6 verson:
// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });


// HANDLERS:
  // send file to index.html. __dirname is the current directory you're in.
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  });
  //console.log(__dirname);

  // POST method
//   app.post('/quotes',(req,res) => {
//     console.log('Helllo there!');
//   });
app.post('/quotes', (req, res) => {
    console.log(req.body)
  });


  // LISTEN
  // create the server that the browser can connect to
app.listen(3000, function() {
    console.log('listening on 3000');
});