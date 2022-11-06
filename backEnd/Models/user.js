const { Schema, model } = require('mongoose');
const userSchema = new Schema ({
    fullName: {
        type: String,
        require: [
            true, 'The user must have a name'
        ],
    },
    email: {
        type: String,
        require: [
            true, 'The user must have E-mail'
        ]
    },
    paswword: {
        type: String,
        require: [
            true, 'The user must have password'
        ]
    },
    firstEnter: {
        type: Boolean,
        default: true, 
    },
    city: {
        type: String,
    },
    lookingFor: {
        type: String,
        require: [
            true, 'You must choose what you looking for'
        ]
    },
    dateOfBirth: {
        type: Date,
    },
    hobbies: [{
        typeOfHobbie: {
            type: String
        }
    }],
    about: {
        type: String
    },
    profilePicture: {
        type: String,
    },
    massages: [
        {
            massageId: {
                type: Schema.Types.ObjectId,
                ref: "Massage"
            }
        }
    ],
    like: [
        {
            likeId: {
                type: Schema.Types.ObjectId,
                ref: "Like"
            }
        }
    ],
    view: [
        {
            viewId: {
                type: Schema.Types.ObjectId,
                ref: "View"
            }
        }
    ],
})

exports.User = model('User', userSchema);