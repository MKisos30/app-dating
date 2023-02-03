const { User } = require('../Models/user');
const jwt = require('jwt-simple');
const { View } = require('../models/view');
const { Like } = require('../models/like');

exports.removeUser = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const { id } = decoded;

        await User.findByIdAndDelete(id);
        res.send({ removedUser: true })
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const { fullName, city, lookingFor, hobbies, about, profilePicture } = req.body;

        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const { id } = decoded;

        await User.findByIdAndUpdate(id, { fullName, city, lookingFor, hobbies, about, profilePicture })
        res.send({ updateUser: true })
    } catch (error) {
        res.send({ error: error })
        console.log({ error: error })
    }
}

exports.addDetails = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const { city, hobbies, about, profilePicture } = req.body;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const { id } = decoded;

        await User.findByIdAndUpdate(id, {
            city,
            hobbies,
            about,
            profilePicture,
            firstEnter: false
        })
        res.send({ addDetails: true })
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.getUsersByGender = async (req, res) => {
    try {
        const { userInfo } = req.cookies;

        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const { id } = decoded;

        const user = await User.findById(id)
        const userLookingFor = user.lookingFor

        if (userLookingFor) {
            const allUsers = await User.find({ gender: userLookingFor })

            const users = allUsers.filter(i => i._id !== id)
            // console.log(users)
            res.send(users)
        }
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.oneUser = async (req, res) => {
    try {
        const searchUserId = req.body.id;
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const mainUserId = decoded.id

        const userOne = await User.findById(searchUserId)
        const populateUser = await userOne.populate("views.viewId")
        const checkUserViews = populateUser.views.find(i => i.viewId.fromUserId == mainUserId)


        if (!checkUserViews) {
            console.log('not exist')

            const newView = new View({
                fromUserId: mainUserId,
                toUserId: searchUserId
            })

            await newView.save()

            const viewsArray = userOne.views

            viewsArray.push({
                viewId: newView._id
            })

            userOne.views = viewsArray
            await userOne.save()
        }

        if (userOne) {
            const userDetails = { fullName: userOne.fullName, gender: userOne.gender, city: userOne.city, lookingFor: userOne.lookingFor, dateOfBirth: userOne.dateOfBirth, about: userOne.about, profilePicture: userOne.profilePicture, hobbies: userOne.hobbies }
            res.send({ ok: true, userDetails })
        } else {
            res.send({ ok: false, massage: "User does not exist" })
        }
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.likeUser = async (req, res) => {
    try {
        const searchUserId = req.body.id;
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const mainUserId = decoded.id

        const userOne = await User.findById(searchUserId)
        const populateUser = await userOne.populate("likes.likeId")
        const checkUserLikes = populateUser.likes.find(i => i.likeId.fromUserId == mainUserId)

        if (!checkUserLikes) {

            const newLike = new Like({
                fromUserId: mainUserId,
                toUserId: searchUserId
            })

            await newLike.save()

            const arrayLike = userOne.likes

            arrayLike.push({
                likeId: newLike.id
            })

            userOne.likes = arrayLike
            await userOne.save()

            res.send({ likes: true })
        }
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.userLikes = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const mainUserId = decoded.id

        const user = await User.findById(mainUserId)
        const numberOfLikes = user.likes.length
        const numberOfViews = user.views.length
        res.send({ numberOfLikes, numberOfViews })

    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const _id = decoded.id

        const userProfile = await User.findById(_id)
        res.send({ userProfile })

    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.getDadtaLikes = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const _id = decoded.id
        
        const userData = await User.findById(_id)

        console.log('%cuserCont.js line:201 userData.likes', 'color: #007acc;', userData.likes);
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}

exports.getUserViews = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const _id = decoded.id

        const userData = await User.findById(_id) 
        // console.log('%cuserCont.js line:215 userData.views', 'color: #007acc;', userData.views);

        const populateUser = await userData.populate("views.viewId")
        // console.log('%cuserCont.js line:218 populateUser', 'color: #007acc;', populateUser);

        res.send(populateUser)
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error })
    }
}