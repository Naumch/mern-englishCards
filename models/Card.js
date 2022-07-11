const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    word: {type: String, required: true},
    translation: {type: String, required: true},
    checked: {type: Boolean, default: false},
    owner: {type: Types.ObjectId, required: true, ref: "User"}
});

module.exports = model("Card", schema);