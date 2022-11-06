const { Schema, model } = require('mongoose');
const viewSchema = new Schema ({
    fromUserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

exports.View = model('View', viewSchema);