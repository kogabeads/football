var express = require("express");//加载express模块
var bodyParser  = require('body-parser');

var mongoose = require("mongoose");

//mongoose.connect("mongodb://127.0.0.1:27017/1705mongo"); //链接数据库，协议，IP，端口，数据库名

//var db = mongoose.connection;//数据库链接对象

/*db.on('open',function() { 
	 console.log("数据库链接")
});*/

//最新的链接方式

mongoose.Promise = global.Promise; //node下面 没有 window ，全局是global
mongoose.connect("mongodb://127.0.0.1:27017/football",{useMongoClient: true})// //为了兼容老的mongdb链接，加了以后mongoose会帮我们增加很多配置
        .then(function(db){
        	console.log("数据库链接成功！")
        })

//  attention数据库
var UserSchemaAttentions = mongoose.Schema({
  nickname:String,
  upwd:String,
  phone:String
})

var Attention = mongoose.model("attentions",UserSchemaAttentions)

//创建express 实例 
var app = express();

//插件提前帮我把前端的请求处理一下
//指定静态资源路径
app.use(express.static('assets'));
//导入model

var User = require('./models/user');

app.use(bodyParser.json()); //处理前端请求json
app.use(bodyParser.urlencoded({ //处理form表单
   extended: true
}));




//注册

app.post('/regist', function(req,res) {
	var {nickname,upwd,phone} = req.body;
	//model的存储方法
    var user = new User({
    	nickname,upwd,phone
    })

    
    user.save(function(err,doc){ //错误，当前保存的文档
       if (err) {
       	  console.error("保存失败");
       	  res.json({
       	  	 code:1,
       	  	 msg:"保存失败"
       	  })
       	 return
       };
        
      res.json({
      	code:0,
      	msg:"保存成功！"
      })  
    });

});

//手机号重复性校核

app.post('/checkPhone', function(req,res) {
	var {phone} = req.body;
  //model的存储方法
    var user = new User({
      phone
    });
    User.find({"phone":phone},function(err,doc){
      if(doc.length!=0){
        res.json({
             code:1,
             msg:"手机号已经被注册使用"
          });
      }else{
        res.json({
             code:0,
             msg:"手机号可以用"
          });
      }
    });

});

//手机号存在性校核

app.post('/havePhone', function(req,res) {
	var {phone} = req.body;
  //model的存储方法
    var user = new User({
      phone
    });
    User.find({"phone":phone},function(err,doc){
      if(doc.length!=0){
        res.json({
             code:0,
             msg:"手机号存在"
          });
      }else{
        res.json({
             code:1,
             msg:"手机号不存在!!"
          });
      }
    });

});


//手机号密码正确性校核

app.post('/isTrue', function(req,res) {
	var {upwd,phone} = req.body;
  //model的存储方法
    var user = new User({
      upwd,phone
    });
    User.find({"phone":phone},function(err,doc){
    
      if(doc[0].upwd == upwd){
        res.json({
             code:0,
             msg:"账号密码匹配正确"
          });
      }else{
        res.json({
             code:1,
             msg:"账号或密码输入错误!!"
          });
      }
    });

});

//关注加载更多请求

app.post('/moreAttention', function(req,res) {
  var {num} = req.body;

  Attention.find({},function(err,doc){
    
      if (err) {
          console.error("读取失败");
          res.json({
             code:1,
             msg:"读取失败"
          })
         return
       };
        
      res.json({
        code:0,
        msg:"读取成功！",
        con:doc
      })  

    });

});


//创建服务器
app.listen(8090,function(){
	console.log("启动成功！")
})
