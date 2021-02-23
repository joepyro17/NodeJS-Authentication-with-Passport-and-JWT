const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');

// Sign Up
passport.use('signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {

            let user = new User();
            user.name = req.body.name;
            user.age = req.body.age;
            user.email = email;
            user.password = password;

            try {
                const newUser = await user.save();
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        }
    ));

// Login
passport.use('login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const user = await User.findOne({'email': email});

                if (!user)
                    return done(null, false, {message: 'User not found'});

                const validate = await user.comparePassword(password);

                if (!validate)
                    return done(null, false, {message: 'Wrong Password'});

                return done(null, user, {message: 'Logged in Successfully'});
            } catch (err) {
                return done(err);
            }
        }
    )
);
