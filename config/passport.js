const passport = require("passport");
const User = require('../models/User');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./keys');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
    // User.findById(id).then(user => {
    //     done(null, user);
    // });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            let userData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                googleId: profile.id,
                token: accessToken
            };
            done(null, userData);
            // console.log(profile);
            // const existingUser = await User.findOne({ googleId: profile.id });
            // if (existingUser) {
            //     done(null, existingUser);
            // } else {
            //     const newUser = await new User({
            //         googleId: profile.id,
            //         name: profile.displayName,
            //         email: profile.emails[0].value
            //     });
            //     await newUser.save();
            //     done(null, newUser);
            // }
        } catch (e) {
            console.log(e)
        }
    })
);