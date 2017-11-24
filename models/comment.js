var mongoose = require("mongoose");
var CommentSchema = require('../schemas/comment');

var Comment = mongoose.model('comments',CommentSchema); //映射建立成功，并生产了具有数据库操作能力的Usermodel
module.exports = Comment