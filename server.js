const config = require('config');
const express = require('express');
const connectDB = require('./mongo/db');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const recipes = require('./routes/api/recipes');
const ingredients = require('./routes/api/ingredients');
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//cross origin
app.use(cors())

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
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/recipes', recipes);
app.use('/api/ingredients', ingredients);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));