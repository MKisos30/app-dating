const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    fullName: {
        type: String,
        require: [true, 'The user must have a name']
    },
    email: {
        type: String,
        require: [
            true, 'The user must have E-mail'
        ],
        unique: true
    },
    password: {
        type: String,
        require: [
            true, 'The user must have password'
        ]
    },
    gender: {
        type: String,
        require: [
            true, 'The user must have a gender'
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
    // hobbies: [{
    //     typeOfHobbie: {
    //         type: String
    //     }
    // }],
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
    likes: [
        {
            likeId: {
                type: Schema.Types.ObjectId,
                ref: "Like"
            }
        }
    ],
    views: [
        {
            viewId: {
                type: Schema.Types.ObjectId,
                ref: "View"
            }
        }
    ],
})

exports.User = model('User', UserSchema);