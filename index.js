const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

//JSON Middleware
app.use(express.json());

//Session config
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secretkey',
        resave: false,
        saveUninitialized: false
    })
);
//Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/', authRoutes);

//Main route
app.get('/', (req, res) => {
    res.send('API running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));