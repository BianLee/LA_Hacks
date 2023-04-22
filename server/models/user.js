const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        uid: {type: String, required: true},
        email: {type: String, required: true},
    },
    {
        timestamps: false,
    }
);
const User = mongoose.model("user", UserSchema);
module.exports = User;
