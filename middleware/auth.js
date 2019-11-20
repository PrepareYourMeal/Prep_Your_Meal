const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const auth = async function (req, res, next) {
    const userJWT = req.cookies.accessJWT
    if (!userJWT) {
        return res.status(401).send('Invalid or missing auth token');
    }

    const userJWTPayload = jwt.verify(userJWT, config.get('jwtSecret'));
    if (!userJWTPayload) {
        res.clearCookie('accessJWT');
        return res.status(401).send('Invalid or missing auth token');
    }
    const user = await User.findOne({ authToken: userJWTPayload.authToken });
    if (!user) {
        return res.status(401).send('User not logged in')
    }

    req.user = user;
    next();
}

module.exports = auth;