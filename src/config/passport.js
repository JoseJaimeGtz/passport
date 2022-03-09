const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('working');
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        // lookup user using User class
        let user = User.find(profile.id);
        user.then(user => {
            // if not exist, save it using User and call done(null, createdUser)
            if (!user) {
                let nUser = User.create(profile);
            } else { // if it does exist call done(null, user)
                return done(null, user);
            }
        })

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.find(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});