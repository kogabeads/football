var mongoose = require("mongoose");
var UserSchema = require('../schemas/user');

var User = mongoose.model('users',UserSchema); //映射建立成功，并生产了具有数据库操作能力的Usermodel
module.exports = User