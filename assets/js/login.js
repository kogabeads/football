require(["config"],function(){
	require(["jquery"],function($){

		//	合理性判定

		var isPhone = false;
		$("section input").eq(0).on("blur",function(){

			//	手机号校验
       	    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

       	    if(!reg.test($(".phone").eq(0).val().trim())){
       	    	$("section span").eq(0).css("display","block");
       	    	$("section i").eq(0).css("display","none");
       	    	isPhone = false;
       	    }else{

       	    	$("section span").eq(0).css("display","none");
    			
    			//	存在性校验

    			var params = {};
	       	    params.phone = $(".phone").eq(0).val().trim();

       	    	$.post("/havePhone", params, function(data){
					if(data.code === 0){
						$("section i").eq(0).css("display","none");
		       	    	isPhone = true;
					}else{
						$("section i").eq(0).html(data.msg).css({"display":"block","color":"red"});
		       	    	isPhone = false;
					}
				});
       	    }
		});

			


	   	//	点击提交
		$("section a").on("click",function(){

			


	   	    //	密码校验
	   	    var reg = /^.{6,12}$/;

	   	    if(!reg.test($(".upwd").eq(0).val().trim())){
	   	    	$("section span").eq(1).css("display","block");
	   	    }else{

	   	    	var isUpwd = false;

	   	    	$("section span").eq(0).css("display","none");
    			
    			//	正确性校验

    			var params = {};
    			params.phone = $(".phone").eq(0).val().trim();
	       	    params.upwd = $(".upwd").eq(0).val().trim();

       	    	$.post("/isTrue", params, function(data){
					if(data.code === 0){

						$("section i").eq(0).css("display","none");
		       	    	isUpwd = true;
		       	    	console.log(isUpwd);

						if(isPhone && isUpwd){

					        //存，存储的value类型只能是字符串
					        localStorage.setItem("login",1);
					        location.href = "../index.html";
					        console.log("保存成功");

						}

					}else{
						$("section i").eq(0).html(data.msg).css({"display":"block","color":"red"});
		       	    	isUpwd = false;
					}
				});
	   	    	
	   	    }


			
			
		})
		
	});
});