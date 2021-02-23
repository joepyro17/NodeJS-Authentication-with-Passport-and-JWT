const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');
require('dotenv').config();

// Sign Up
passport.use(
    'signup',
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
                let user = await User.findOne({'email': email});

                if (!user)
                    return done(null, false, {message: 'User not found'});

                const validate = await user.comparePassword(password);

                if (!validate)
                    return done(null, false, {message: 'Wrong Password'});

                const body = {_id: user._id, email: user.email};
                const token = jwt.sign({user: body}, process.env.JWT_TOP_SECRET);

                // user = {...user, token: token};

                return done(null, token, { message: 'Logged in Successfully'});
            } catch (err) {
                return done(err);
            }
        }
    )
);

//JWT
passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_TOP_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (err) {
                done(err);
            }
        }
    )
);