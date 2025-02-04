
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Blog = require('./models/blog.js');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'email'},(email,password,done)=> {
                //match user
                Blog.findOne({email : email})
                .then((user)=>{
                 if(!user) {
                     return done(null,false,{message : 'that email is not registered'});
                 }
                 //match pass
                 bcrypt.compare(password,user.password,(err,isMatch)=>{
                     if(err) throw err;

                     if(isMatch) {
                         return done(null,user);
                     } else {
                         return done(null,false,{message : 'pass incorrect'});
                     }
                 })
                })
                .catch((err)=> {console.log(err)})
        })
        
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Blog.findById(id, function(err, user) {
          done(err, user);
        });
      }); 
}; 


