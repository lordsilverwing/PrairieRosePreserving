var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
// session middleware
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var imgModel = require('./model');

// load the env vars
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
  });

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

const indexRoutes = require('./routes/index')
const productsRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");


// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
app.get('/', (req, res) => {
  imgModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('imagesPage', { items: items });
      }
  });
});
app.post('/', upload.single('image'), (req, res, next) => {
 
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  imgModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/');
      }
  });
});
var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})
 
var upload = multer({ storage: storage });

// mount all routes with appropriate base paths
app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
