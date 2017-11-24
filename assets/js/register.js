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
    			
    			//	重复性校验

    			var params = {};
	       	    params.phone = $(".phone").eq(0).val().trim();

       	    	$.post("/checkPhone", params, function(data){
					if(data.code === 0){
						$("section i").eq(0).html(data.msg).css({"display":"block","color":"green"});
		       	    	isPhone = true;
					}else{
						$("section i").eq(0).html(data.msg).css({"display":"block","color":"red"});
		       	    	isPhone = false;
					}
				});
       	    }
		});

		var isUpwd = false;
		$("section input").eq(1).on("blur",function(){

	   	    //	密码校验
	   	    var reg = /^.{6,12}$/;

	   	    if(!reg.test($(".upwd").eq(0).val().trim())){
	   	    	$("section span").eq(1).css("display","block");
	   	    	isUpwd = false;
	   	    }else{
	   	    	$("section span").eq(1).css("display","none");
	   	    	isUpwd = true;
	   	    }

	   	});

		var isNickname = false;
		$("section input").eq(2).on("blur",function(){

	   	    //	昵称校验
			var reg = /^.{2,8}$/;

	   	    if(!reg.test($(".nickname").eq(0).val().trim())){
	   	    	$("section span").eq(2).css("display","block");
	   	    	isNickname = false;
	   	    }else{
	   	    	$("section span").eq(2).css("display","none");
	   	    	isNickname = true;
	   	    }

	   	});

		
       	    

		//	点击提交
		$("section a").on("click",function(){

			if(isPhone && isUpwd && isNickname){

				var params = {};
	       	    params.nickname = $(".nickname").eq(0).val().trim();
	       	    params.upwd = $(".upwd").eq(0).val().trim();
	       	    params.phone = $(".phone").eq(0).val().trim();
	       	    
	       	    $.post("/regist", params, function(data){
					location.href = "login.html";
				});
			}
			
			
		})

		
	});
});