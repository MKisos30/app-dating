
const bcrypt = require('bcryptjs');
const { User } = require('../Models/user');
const jwt = require('jwt-simple');
const { View } = require('../models/view');
const { Like } = require('../models/like');

const getAgeOfNewUser = (dateOfBirth) => {
    const today = new Date();
    const birthdate = new Date(dateOfBirth);
    
    const age = (Date.parse(today) - Date.parse(birthdate)) / (365 * 24 * 3600 * 1000);
  
    const ageFull = age.toFixed(1);
    return ageFull
}

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, lookingFor, gender, dateOfBirth } = req.body;

        const agePotencialUser = getAgeOfNewUser(dateOfBirth)

        if (agePotencialUser >= 18) {
            const userExist = await User.findOne({ email });
            
            if (!userExist) {
                if (password === confirmPassword) {
                    const hashpass = await bcrypt.hash(password, 10)
    
                    const user = new User({ fullName, email, password: hashpass, lookingFor, gender, massages: [], likes: [], view: [], dateOfBirth })
                    await user.save();
    
                    res.send({ ok: true })
                } else {
                    res.send({ ok: false, massage: 'The passwords is not same' })
                }
            } else {
                res.send({ ok: false, massage: "User already exist" })
            }
        } else {
            res.send({ok:false, massage:"You must have be more than 18"})
        }
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error: error.massage })
    }
}

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        console.log(userExist)
        if (userExist) {
            const samePass = await bcrypt.compare(password, userExist.password)

            if (samePass) {
                const payload = { name: userExist.name, id: userExist._id }
                const token = jwt.encode(payload, process.env.SECRET)
                res.cookie('userInfo', token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true })
                res.send({ ok: true, firstEnter: userExist.firstEnter })
            } else {
                res.send({ ok: false, massage: 'Password is not correct' })
            }

        } else {
            res.send({ ok: false, massage: "User doesn't exist" })
        }

    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error: error.massage })
    }
}

exports.userOut = async (req, res) => {
    try {
        res.clearCookie()
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

// exports.getUserData = async (req, res) => {
//     try {
//         const { userInfo } = req.cookies;
//         const decoded = jwt.decode(userInfo, process.env.SECRET);
//         const { id } = decoded;
//         const user = await User.findById(id);
//     } catch (error) {
//         res.send(error)
//         console.log(error)
//     }
// }

exports.checkIfLogIn = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        if (userInfo) {
            res.send({ logIn: true })
        } else {
            res.send({ logIn: false })
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}


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
        const { fullName, city, lookingFor, hobbie, about, profilePicture } = req.body;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const { id } = decoded;

        // לעשות מניפולציה לתחביבים לעדכן אותם
        await User.findByIdAndUpdate(id, { fullName, city, lookingFor, hobbie, about, profilePicture })
        res.send({ updaeUser: true })
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error: error.massage })
    }
}

exports.addDetails = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const { city, hobbies, about } = req.body;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const { id } = decoded;

        console.log(city, hobbies, about, dateOfBirth)
        await User.findByIdAndUpdate(id, {
            city,
            hobbies,
            about, dateOfBirth,
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
        const checkUserLikes = populateUser.likes.find(i=>i.likeId.fromUserId==mainUserId)

        if(!checkUserLikes) {

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

            res.send({likes: true})
        }
    } catch (error) {
        res.send({error: error.massage})
        console.log({error}) 
    }
}

exports.userLikes = async (req, res) => {
    try {
        const { userInfo } = req.cookies;
        const decoded = await jwt.decode(userInfo, process.env.SECRET)
        const mainUserId = decoded.id

        const user = await User.findById(mainUserId)
        const numberOfLikes = user.likes.length
        const numberOfViews= user.views.length
        res.send({numberOfLikes, numberOfViews})

    } catch (error) {
        res.send({error: error.massage})
        console.log({error}) 
    }
}