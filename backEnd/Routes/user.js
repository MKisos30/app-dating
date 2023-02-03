const { Router } = require('express');
// const { register, logIn } = require('../Controllers/auth');
const route = Router();

const {
    // register,
    // logIn,
    // getUserData
    checkIfLogIn,
    removeUser,
    updateUser,
    addDetails,
    getUsersByGender,
    oneUser,
    likeUser,
    userLikes,
    getProfile,
    getDadtaLikes,
    getUserViews
} = require('../Controllers/userCont')

route
    .delete('/removeUser', removeUser)
    .post('/updateUser', updateUser)
    .post('/addDetails', addDetails)
    .get('/getUsersByGender', getUsersByGender)
    .post('/oneUser', oneUser)
    .post('/likeUser', likeUser)
    .get('/userLikes', userLikes)
    .get('/getProfile', getProfile)
    .get('/info/likes', getDadtaLikes)
    .get('/info/views', getUserViews)

module.exports = route;