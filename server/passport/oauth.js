// const passport = require("passport")
//
// import User from "../models/User";
//
// const {createToken} = require("../jwt");
//
// const GoogleStrategy  = require('passport-google-oauth20').Strategy;
//
//
//
// // const GOOGLE_REDIRECT_URL = "https://confident-curie-8fac38.netlify.app/auth/callback/google"
// const GOOGLE_REDIRECT_URL = process.env.BACKEND_URI + "/auth/callback/google"
// // it will redirect to = "/.netlify/functions/server/auth/callback/google"  [netlify.toml]
//
//
// passport.use(new GoogleStrategy({
// 		clientID: process.env.GOOGLE_CLIENT_ID,
// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 		callbackURL: GOOGLE_REDIRECT_URL
// 	},
// 	async function(accessToken, refreshToken, profile, cb) {
// 		try{
// 			let email = profile.emails &&  profile.emails[0] && profile.emails[0].value
// 			let user: any = await User.findOne({ $or: [{email: email}, {googleId: profile.id}] }, {})
//
// 			if(user){
// 				let token = createToken(user._id, user.email)
// 				let { password, created_at, updated_at, ...other } = user
// 				return cb(null, {...other, token});
// 			} else {
// 				// create a new user
// 				user = {
// 					avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
// 					email: profile.emails &&  profile.emails[0] && profile.emails[0].value,
// 					googleId: profile.id,
// 					password: "",
// 					first_name: profile.displayName,
// 					username: profile.displayName,
// 					last_name: "",
// 					created_at: Date.now(),
// 					updated_at: Date.now(),
// 				}
// 				user = new User(user)
// 				user = await user.save(true)
// 				let token = createToken(user._id, user.email)
// 				let { password,  created_at, updated_at, ...other } = user
// 				return cb(null, {...other, token});
// 			}
//
// 		} catch (ex){
// 				return cb(ex, null);
// 		}
// 	}
// ));
//
//
// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });
//
