const router = require('express').Router();
const passport = require('passport');
// path: auth/

// GET /login
// GET /auth/login mandar (login.html que tiene un formulario dummy y un link para acceder por google que redirige a /auth/google)
router.get('/login', (req, res) => {
    res.render('login');
});

// GET /google/login
// GET /auth/google/login (temporalmente regresa un texto)
router.get('/google/login', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// GET /google/callback
// GET /auth/google/callback (temporalmente regresa un texto)
router.get('/google/callback', passport.authenticate('google'), 
    function (req, res) {
        // print req.query.code
        console.log(req.query.code);
        // successful authentication, redirect to /
        res.redirect('/');
    }
);

// GET /verifyLogin
// GET /auth/verifyLogin (temporalmente regresa el status 401 con cualquier texto)
router.get('/verifyLogin', (req, res) => {
    if (req.isAuthenticated()) {
        // extraPoint$
        res.header('user', req.user);
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});

// GET /logout
// GET /auth/logout (temporalmente regresa un texto)
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

module.exports = router;
