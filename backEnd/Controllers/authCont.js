const { User } = require("../Models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');

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

        if (agePotencialUser <= 18) {
            console.log("You must have be more than 18")
            return res.send({ ok: false, massage: "You must have be more than 18" })
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            console.log("User already exist")
            return res.send({ ok: false, massage: "User already exist" })
        }

        if (password !== confirmPassword) {
            console.log('The passwords is not same')
            return res.send({ ok: false, massage: 'The passwords is not same' })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const user = new User({ fullName, email, password: hashpass, lookingFor, gender, massages: [], likes: [], view: [], dateOfBirth })
        await user.save();

        res.send({ ok: true })
    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error: error.massage })
    }
}

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            console.log("User doesn't exist")
            return res.send({ ok: false, error: "User doesn't exist" })
        }

        const samePass = await bcrypt.compare(password, userExist.password)

        if (!samePass) {
            console.log("Password is not correct")
            return res.send({ ok: false, error: 'Password is not correct' })
        }

        const payload = { name: userExist.name, id: userExist._id }
        const token = jwt.encode(payload, process.env.SECRET)
        res.cookie('userInfo', token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true })
        res.send({ ok: true, firstEnter: userExist.firstEnter })

    } catch (error) {
        res.send({ error: error.massage })
        console.log({ error: error.massage })
    }
}

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

exports.userOut = async (req, res) => {
    //add res.send auth, catch in cluent, if false => navigate to /
    try {
        res.clearCookie('userInfo')
        res.send({logIn:false})
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

