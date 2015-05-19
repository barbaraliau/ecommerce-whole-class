//--requires--//
var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		Passport = require('passport'),
		mongoose = require('mongoose'),
		GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
		env = require('./.envVar.js');

//--placeholders--//
var app = express(),
		port = 9001,
	  GoogleClientID = env.GOOGLE_CLIENT_ID,
		GoogleClientSecret = env.GOOGLE_CLIENT_SECRET;

//--imported controllers--//
var UserCtrl = require('./controllers/user-control.js')

//---connect mongoDB----//
var mongoURI = 'mongodb://localhost/full-stack-ecommerce';
mongoose.connect(mongoURI);
mongoose.connection.once('open', function(){
	console.log("Connected to db at " + mongoURI);
})

//-----Passport OAuth---//
Passport.serializeUser(function(user, done) {
  done(null, user);
});

Passport.deserializeUser(function(obj, done) {
	UserCtrl.updateOrCreate(obj.id).then(function(results){
		done(null, results);
	}, function(err){
		 done(null, err);
	})

});

Passport.use(new GoogleStrategy({
	clientID: GoogleClientID,
	clientSecret: GoogleClientSecret,
	callbackURL: 'http://localhost:9001/auth/google/callback'
},
	 function(token, tokenSecret, profile, done) {
	 	  process.nextTick(function () {
      return done(null, profile);
    });
}))

//----middleware---//
app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat' }));
app.use(Passport.initialize());
app.use(Passport.session());

//----Oauth path---//
app.get('/auth/google', Passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
//----Oauth middleware----//
app.get('/auth/google/callback',
  Passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  function(req, res) {
    res.redirect('/api/me');
  });

app.get('/api/me', function(req, res){
	return res.json(req.user);
})




//----listen----//
app.listen(port, function(){
	console.log('Listening on port ' + port)
})