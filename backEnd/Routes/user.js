const { Router } = require('express')
const route = Router();

const {
    register,
    logIn,
    // getUserData
    checkIfLogIn,
    removeUser,
    updateUser,
    addDetails,
    getUsersByGender,
    oneUser,
    likeUser,
    userLikes,
    getProfile
} = require('../Controllers/userCont')

route
    .post('/register', register)
    .post('/logIn', logIn)
    // .get('/getUserData', getUserData)
    .get('/checkIfLogIn', checkIfLogIn)
    .delete('/removeUser', removeUser)
    .post('/updateUser', updateUser)
    .post('/addDetails', addDetails)
    .get('/getUsersByGender', getUsersByGender)
    .post('/oneUser', oneUser)
    .post('/likeUser', likeUser)
    .get('/userLikes', userLikes)
    .get('/getProfile', getProfile)

module.exports = route;