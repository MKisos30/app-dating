const { Schema, model } = require('mongoose');
const likeSchema = new Schema ({
    fromUserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
})

exports.Like = model('Like', likeSchema);