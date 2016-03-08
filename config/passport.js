var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var crypto = require('crypto');

function validatePassword(password, user){
	var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64).toString('hex');
	return user.hash == hash;
}

passport.use(new LocalStrategy({
		usernameField: 'userLogin'
	},
	function (username, password, done){
		models.Usuario.findOne({
			where: {
				userLogin: username
			}
		}).then(function (user, err){
			if(err) {return done(err);}
			if(!user){
				return done(null, false, {
					message: 'El usuasrio proporcionado no existe'
				})
			}
			if(!validatePassword(password,user)){
				return done(null, false, {
					message: 'Contraseña incorrecta'
				})
			}
			return done(null, user);
		});
	}
));