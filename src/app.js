const express = require('express');
const path = require('path');
require('dotenv').config();
require('./config/passport');
const loginRouter = require('./routes/auth.route');
const app = express();

app.set('views', path.join(__dirname, '/public/html'));
app.use(express.static(path.join(__dirname, '/public/html')));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const cookieSession = require('cookie-session');

const passport = require('passport');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/auth', loginRouter);

app.get('/', (req, res) => res.render('home'));
app.get('/profile', (req, res) => res.render('profile'));

module.exports = app;