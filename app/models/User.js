const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// User Schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
            min: 10,
            max: 70,
        },
    },
    {
        timestamps: true,
    }
);

// Hash Password
UserSchema.pre('save', function(next){
    // This is ES5 and not working with arrow function with use ES6
    const user = this;
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // Generate a salt
    bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR), function(err, salt) {
        if (err) return next(err);
        // Hash the password using the new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            // Override the password
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
