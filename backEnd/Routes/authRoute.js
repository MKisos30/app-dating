const { Router } = require('express');
const { register, logIn, userOut, checkIfLogIn } = require('../Controllers/authCont');
const route = Router();

route
    .post('/register', register)
    .post('/logIn', logIn)
    .get('/logOut', userOut)
    .get('/checkIfLogIn', checkIfLogIn)

module.exports = route;