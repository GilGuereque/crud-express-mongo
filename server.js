// server.js
console.log('May Node be with you');
// use express
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
// connect to mongoDB
const MongoClient = require('mongodb').MongoClient;

//connection string while removing deprecation warning:
// MongoClient.connect('mongodb+srv://gguereque326:Morrison23@cluster0.yfrzs8v.mongodb.net/?retryWrites=true&w=majority',{
// useUnifiedTopology: true
// }, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database');
// });

//connection string using promises:
MongoClient.connect('mongodb+srv://gguereque326:Morrison23@cluster0.yfrzs8v.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology:
true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('invincible-quotes')
  const quotesCollection = db.collection('quotes')
  //MIDDLEWARES
  app.set('view engine', 'ejs');

  // ROUTES
  // setting body-parser before CRUD handlers
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(bodyParser.json());
  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs',{ quotes: results });
      })
      .catch(error => console.error(error));
    //res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  });
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/');
    })
    .catch(error => console.error(error));
  });

  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: 'Yoda' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
      .then(result => {
        res.json('Success');
      })
      .catch(error => console.error(error))
  });

  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
      { name: req.body.name }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json('Deleted Darth Vadar\'s quote')
      })
      .catch(error => console.error(error))
  })

  // LISTEN

  app.listen(3000, function() {
    console.log('listening on 3000');
  });
})
.catch(error => console.error(error));



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
  // app.get('/', (req, res) => {
  //   res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  // });
  //console.log(__dirname);

  // POST method
//   app.post('/quotes',(req,res) => {
//     console.log('Helllo there!');
//   });
// app.post('/quotes', (req, res) => {
//     console.log(req.body)
//   });


  // LISTEN
  // create the server that the browser can connect to
// app.listen(3000, function() {
//     console.log('listening on 3000');
// });