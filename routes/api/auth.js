const passport = require("passport");
const express = require("express");
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const router = express.Router();
const config = require('config');

router.get('/test', (req, res) => {
    res.send("Auth working properly");
});

router.get('/google', passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}));

router.get('/google/callback', passport.authenticate("google"), async (req, res) => {
    let userId = req.user.userId;
    let token = req.user.token;
    const jwtPayload = {
        authToken: token
    }

    const authJwtToken = jwt.sign(jwtPayload, config.get('jwtSecret'));

    const cookieOptions = {
        httpOnly: true,
        expires: 0
    }

    res.cookie('accessJWT', authJwtToken, cookieOptions);

    return res.redirect(`/home?token=${token}&userId=${userId}`);
    // let token = req.user.token;
    // let profile = await Profile.findOne({ user: req.user.id });
    // if (!profile) {
    //     return res.redirect(`/createProfile?token=${token}&id=${req.user.id}`);
    // }
    // return res.redirect(`/profile?token=${token}&id=${profile.id}`);
});

router.get("/logout", auth, async (req, res) => {
    const userJWT = req.cookies.accessJWT
    const userJWTPayload = jwt.verify(userJWT, config.get('jwtSecret'));

    res.clearCookie('accessJWT');
    const user = await User.findOneAndUpdate({ authToken: userJWTPayload.authToken },
        {
            authToken: null
        });
    console.log(user);
    req.logout();
    res.redirect("/");
});

router.get("/current_user", auth, (req, res) => {
    res.send(req.user);
});



module.exports = router;
