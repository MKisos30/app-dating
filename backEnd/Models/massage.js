const { Schema, model } = require('mongoose');
const massageSchema = new Schema ({
    textMassage: {
        type: String,
        require: [
            true, 'Must have a massage'
        ]
    },
    fromUserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        require: true
    },
})

exports.Massage = model('Massage', massageSchema);