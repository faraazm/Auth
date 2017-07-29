const { secret } = require('../config/config');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;

function initPassport(passport){
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
	opts.secretOrKey = secret;

	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ id: jwt_payload._id })
			.then((user) => {
				return user
				? done(null, user)
				: done(null, false);
			})
			.catch(error => done(error, false));
	}));
}

module.exports = initPassport;