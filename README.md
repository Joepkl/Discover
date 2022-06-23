# Readme Discover

## Introductie
Discover is een webapplicatie voor een vacaturebank speciaal ontwikkeld voor de bio technische sector. Op discover kan een 
gebruiker een DISC persoonlijkheids test invullen om te kijken welke kernwaarden en eigenschappen bij hem passen. Op basis
van deze resultaten kan Discover gerelateerde vacatures inladen. Wij hebben in totaal zes weken aan dit project gewerkt samen 
met het CMD Agency. In deze zes weken hebben wij per week geiterreerd en gekeken wat het beste bij het eindproduct zou passen.
Uiteindelijk zijn wij tot een succesvol product gekomen waarin alle kern functionaliteiten werkzaam zijn.

## De opdracht
De opdracht is om een vacaturebank te ontwikkelen waar mensen, vaak net afgestudeerd of opleiding niet afgemaakt op zoek
kunnen gaan naar hun eigen kwaliteiten en eigenschappen. Het is de bedoeling dat deze mensen aan de hand van een DISC
persoonlijkheidstest eachter komen wie zij zijn. Op basis van deze resultaten moeten de juiste vacatures worden ingeladen.
Het doel is een geen statische (zoals de meeste bestaande) maar een op het DISC model gebaseerde interactieve vacaturebank die
ervoor zorgt dat gebruikers nieuwe kanten over zichzelf leren, waar zij misschien wel nooit zouden zijn achter gekomen.

## Server side renderen
Wij hebben besloten om onze webapplicatie server side te renderen zodat de laadtijd voor de pagina's sneller is, en de SEO beter is.
Er moet ook veel data verwerkt worden, het is hierdoor handig dat dit allemaal via de server wordt opgehaald zodat er zo min mogelijk 
interactie tussen de client en server side is zodat de pagina relatief snel zal laden, ondanks bijvoorbeeld een slechte internetverbinding.

## Features
* Registreer pagina
* Login pagina
* Uit database gerenderde vacatures
* Zoekfunctie
* DISC Persoonlijkheidstest
* Vacatures aan de hand van DISC resultaten
* Detailpagina per vacature
* Vacature toevoegen aan favoriete

## Activity diagram


## Code uitgelegd
Hieronder gaan wij alle functionaliteiten van de code en de werking daarvan bespreken. De webapplicatie is server side gerenderd door middel van 
Node.js en express. Tevens zijn er voor verschillende functionaliteiten nog externe packages gebruik en de data wordt opgeslagen in een Mongodb
database gecombineerd met Mongoose. Hier later meer over.

### 1. Registreren van een account
De eerste functionaliteit is de registreer functie. De gebruiker kan bij het registeren zijn naam, email en een zelf bedacht wachtwoord invullen.
Deze informatie wordt gekoppeld aan een uniek gebruikers ID. Deze data wordt opgeslagen in een Mongodb collection genaamd Blogs. Doormiddel van
Bcrypt en Passport kon de registreer functionaliteit worden ontwikkeld.
````
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
````
Bij de app.post van de /register route wordt het registreer formulier gesubmit. Wij hebben hier een try statement gebruikt zodat tijdens het
uitvoeren van de code, er tegelijkertijd wordt gezocht naar errors. Als er geen errors worden gevonden worder allereerst een variabele aangemaakt
voor hashedPassword. Dit is door middel van Bcrypt een encrypted wachtwoord geworden. In de functie wordt er een nieuwe blog aangemaakt. Blog 
is in dit geval het datamodel van de collectie blogs. De blogs collectie is voor het maken van een account. Omdat er een nieuwe gebruiker 
wordt aangemaakt hebben we gebruik gemaakt van new Blog zodat Mongoose weet dat er een nieuw dataobject zal worden toegevoegd. Door middel
van body parser kunnen wij heel gemakkelijk de waardes ophalen door middel van req.body.name. Als de data aan het model is toegevoegd wordt 
door middel van de .save() methode de data opgeslagen en toegevoegd aan de database. De gebruiker wordt doorverwezen naar de inlogpagina.

### Inloggen
Als de gebruiker eenmaal een account heeft, komt deze op de inlog pagina terecht. Hier kan die zijn email en wachtwoord invullen om zo
toegang te krijgen tot de vacaturebank. 
````
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
````
In de app.post wordt de functie checkNotAuthenticated en passport.authenticate meegegeven. Als uit deze functie blijkt dat de
gegevens kloppen, dan is er sprake van een succesRedirect. De gebruiker zal dan doorverwezen worden naar de index pagina.

#### Passport-config.js
Deze functie hoort nog bij het inloggen, en is eigenlijk de functie die controleert of de juiste gegevens zijn ingevuld. Waar nodig
zal deze functie de juiste foutmelding geven om de gebruiker te begeleiden. 
````

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
````
Allereerst wordt het email gecontroleerd. Als dit voltooid is, dan zal het wachtwoord worden vergeleken door middel van bcrypt. Als
deze functie voltooid is, dan zal in de app.post de gebruiker worden doorverwezen naar de juiste pagina. Bij succes de indexpagina.

## Renderen van vacatures op de index pagina


## Wishlist
