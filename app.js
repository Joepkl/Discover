
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');


//CONNECTION TO MONGODB DATABASE  
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');

const dbURI = 'mongodb+srv://developer1:test1234@vacaturebank.oyxfpmr.mongodb.net/VacaturebankData?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3500), console.log('Mongodb connected'))
  .catch((error) => console.log(error + 'has occured'))

const initializePassport = require('./passport-config.js');

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const port = process.env.PORT || 3500;


//View engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.resolve('public')))
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Username and password
const Offers = require('./models/joboffers.js');

app.get('/', checkAuthenticated, async (req, res, next) => {

    Offers.find((err, docs) => {
      if(!err) {
        res.render('index', {
          data: docs,
          name: req.user.name
        })
      } else {
        console.log('Failed to retrieve data')
      }
    })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //This is the required data that has to be stored in mongodb
    const blog = new Blog({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })
    
    //Saves user account data in mongodb, password is still secure and encrypted
    blog.save()
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(error)
      })

    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})


app.get('/developer', (req, res) => {
  res.render('developer');
})

app.post('/developer', (req, res) => {

  const offer = new Offers({
    title: req.body.title,
    location: req.body.location,
    businessSectors: req.body.businessSectors,
    introduction: req.body.introduction,
    description: req.body.description,
    responsibilities: req.body.responsibilities,
    profile: req.body.profile,
    workingConditions: req.body.workingConditions,
    study: req.body.study,
    keywords: req.body.keywords
  });

  offer.save()
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })

  res.render('developer');
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

// FIXEN!!!!
app.get('/profile', checkAuthenticated, async (req, res, next) => {
  const user = req.user.id;
  Blog.findById(user).then(results => {

    const allResults = results.favorites.map(element => {
      return Offers.findById(element).exec();
    });

    Promise.all(allResults).then(data => {
      console.log(allResults)
      res.render('profile', {
        data: data
      })
    })
    
  })
  .catch((err) => {
    // console.log(err);
  })
}) 


 



app.get('/disc', (req, res) => {
  res.render('disc')
})

app.get('/:id', (req, res) => {
  Offers.findById(req.params.id)
  .then(results => {
    res.render('detailed', {data: results})
  })
  .catch((err) => {
    console.log(err);
    })
  })  

app.post('/:id', checkAuthenticated, (req, res) => {
  const user = req.user.id;
  const offerId = req.params.id;
  
  Blog.findOneAndUpdate({
    _id: user
  }, {
    $push: {
      favorites: offerId
    }
  })
  .then((result) => {
    console.log(result)
    res.redirect('profile')
  })
})






