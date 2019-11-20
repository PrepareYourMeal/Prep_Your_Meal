const config = require('config');
const express = require('express');
const connectDB = require('./mongo/db');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const recipes = require('./routes/api/recipes');
const ingredients = require('./routes/api/ingredients');
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
//cross origin
app.use(cors())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["verysecretive"]
    })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

//serve react application during production
console.log("App enviornment: " + config.get('NODE_ENV'));
if(config.get('NODE_ENV') == "production"){
    app.use('/', express.static('client/build'));
}
else{
    app.get('/', (req, res) => res.send('API Running'));
}

//Define Routes
app.use('/api/users', users);
app.use('/auth', auth);
app.use('/api/profile', profile);
app.use('/api/recipes', recipes);
app.use('/api/ingredients', ingredients);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));