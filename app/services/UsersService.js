const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

getAllUser = async () => {
    try {
        const users = await User.find();
        return { success: true, body: users };
    } catch (e) {
        return { success: false, error: e.message };
    }
};

// createNewUser = async (req) => {
//     try {
//         let user = new User();
//         user.name = req.body.name;
//         user.age = req.body.age;
//         user.email = req.body.email;
//         user.password = req.body.password;
//
//         const newUser = await user.save();
//         return { success: true, body: newUser };
//     } catch (e) {
//         return { success: false, error: e.message };
//     }
// };

module.exports = { getAllUser, createNewUser };
