const passport = require("passport");
const express = require("express");

const router = express.Router();

router.get('/test', (req, res) => {
    res.send("Auth working properly");
});

router.get('/google', passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}));

router.get('/google/callback', passport.authenticate("google"), (req, res) => {
    let token = req.user.token;
    res.redirect("/profile?token=" + token);
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
});

router.get("/current_user", (req, res) => {
    res.send(req.user);
});


// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const User = require('../../models/User');
// const bcrypt = require('bcryptjs');
// const config = require('config');
// const {check, validationResult} = require('express-validator');
// const jwt = require('jsonwebtoken');


// // GET api/auth
// // authentication route
// // Public access
// router.get('/', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         res.json(user);
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error');
//     }
// });

// // POST api/auth
// // Authenticate user and get token
// // access - Public
// router.post('/', [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (! errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()});
//     }

//     const {email, password} = req.body;

//     try { // check if user exists
//         let user = await User.findOne({email});

//         if (! user) {
//             return res.status(400).json({
//                 errors: [
//                     {
//                         msg: 'Invalid Credentials'
//                     }
//                 ]
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (! isMatch) {
//             return res.status(400).json({
//                 errors: [
//                     {
//                         msg: 'Invalid Credentials'
//                     }
//                 ]
//             });
//         }


//         // return JWT
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };

//         jwt.sign(payload, config.get('jwtSecret'), {
//             expiresIn: 3600
//         }, (err, token) => {
//             if (err) 
//                 throw err;
            


//             res.json({token});
//         });


//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error...');
//     }
// });

module.exports = router;
