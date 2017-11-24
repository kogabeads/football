var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	nickname:String,
	upwd:String,
	phone:String
})

module.exports = UserSchema;