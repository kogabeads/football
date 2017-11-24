require(["config"],function(){
	require(["jquery","template"],function($,template){
		//	swiper
		var mySwiper = new Swiper('#container',{
			initialSlide :1,
			tap:true,
			passiveListeners: false,
			onSlideChangeStart:function(mySwiper){	//	滑动切换当前标签
		    	$('.tapselecter').removeClass('tap_now');
		    	$('.tapselecter').eq(mySwiper.activeIndex).addClass('tap_now');
		    }
		});


		

		//	iscroll 1 足球现场

		var myIscroll1 = new IScroll(".container1",{ //配置对象
	        tap:true,
	        probeType : 2
	    })

	    //	iscroll 2 足球生活

		var myIscroll2 = new IScroll(".container2",{ //配置对象
	        tap:true,
	        probeType : 2
	    })




















	    //	iscroll 3 关注

		var myIscroll3 = new IScroll(".container3",{ //配置对象
	        tap:true,
	        probeType : 2  
	    })

		//	iscroll 初始化
		var $up = $(".up").eq(0),
    	flag = "",	//	标识符
    	upHeight = $(".up").eq(0).height();

			//	保存实际高度
	    var	attentionHeight = myIscroll3.maxScrollY;	
	    // console.log(attentionHeight,lifeHeight,liveHeight);

	    myIscroll3.on('scroll',function(){

			//	获取当前的滚动方向，和滚动的距离

			//	上拉时文字改变，标识符改变
			if(this.y <= attentionHeight-5 && this.directionY && !flag){
				flag = 'up';
				$up.html('释放加载');
				this.maxScrollY = attentionHeight;
			}

			//	拉上去又收回去
			if(this.y <= attentionHeight+upHeight && this.y >= attentionHeight && this.directionY === -1 && flag==='up'){
				flag='';
				$up.html('上拉加载更多');
			}

		})

	    myIscroll3.on('scrollEnd',function(){

	    	if(this.y < attentionHeight+upHeight && this.y > attentionHeight-5 && !flag){
	    		myIscroll3.scrollTo(0,attentionHeight+upHeight,800);
	    		// console.log("上拉距离不足时，返回正常状态");
	    		// console.log("flag = " + flag);
	    	}

	    	//	加载更多时异步请求
			if(flag === 'up'){
				flag = '';	//	重置标识符
				$up.html('加载中...');
				// myIscroll.scrollTo(0,allHeight-40,800);
				

				////////////////////////////////////////////
				var param = {};
				param.num = 3;
				$.post("/moreAttention",param,function(data){

					var doc = data.con;

					for(var i = 0; i < doc.length; i++){
						var html = `
							<div class="content">
					    		
					    		<div class="msg_head">
					    			
					    			<img src="img/index_headpic.png" alt="">
					    			
					    			<div class="person_info fl">
					    				<p class="person_id">
					    					我叫小萌
					    				</p>
					    				<p class="person_dec">
					    					我是小萌我怕誰！哈哈哈哈！
					    				</p>
					    			</div>
					    			
					    			<p class="amount fl">324654</p>
					    			<i class="iconfont fl">&#xe686;</i>
					    		</div>
								
					    		<div class="msg_con">
					    			<img src=${doc[i].img} alt="">
					    		</div>
								
					    		<div class="msg_dec">
					    			<a>${doc[i].txt}</a>
					    		</div>
					    	</div>
				    	`

				    	$(".content:last").after(html);
					}
					myIscroll3.refresh();	//	刷新对象属性
					
					attentionHeight = myIscroll3.maxScrollY;	//	重新获取高度
				})


				$up.html('上拉加载更多');
				
			}
	    })




















		//	下拉标签变透明
	    myIscroll1.on('scroll', function(event){
	    	if(this.y < -10){
	    		$(".tap").eq(0).css("opacity", 0.7);
	    	}else if(this.y > -10){
	    		$(".tap").eq(0).css("opacity", 1);
	    	}
	    });

	    myIscroll2.on('scroll', function(event){
	    	if(this.y < -10){
	    		$(".tap").eq(0).css("opacity", 0.7);
	    	}else if(this.y > -10){
	    		$(".tap").eq(0).css("opacity", 1);
	    	}
	    });


		//	关注热点页面切换


		$(".tapselecter").on("click",function(){	//	标签切换
			mySwiper.slideTo($(this).index(),300,true);
		})

		$(".header_con_left").eq(0).on("click",function(){
			$(".header_con_left").eq(0).addClass("header_con_now");
			$(".header_con_right").eq(0).removeClass("header_con_now");
			$(".hot").eq(0).removeClass("hide");
			$(".attention").eq(0).addClass("hide");

		    //	swiper
			mySwiper.init();
			
			myIscroll1.refresh();
			myIscroll2.refresh();


		})

		$(".header_con_right").eq(0).on("click",function(){
			$(".header_con_right").eq(0).addClass("header_con_now");
			$(".header_con_left").eq(0).removeClass("header_con_now");
			$(".hot").eq(0).addClass("hide");
			$(".attention").eq(0).removeClass("hide");

			myIscroll3.refresh();
		})


		//	退出按钮
		$(".out").eq(0).on("click",function(){

			localStorage.setItem("login",0);
			location.href = "/html/login.html";

		})


		//	校验登录状态
		if (window.localStorage) {

			if(!localStorage.getItem('login') == 1){

				location.href = "html/login.html";
			}
	        
		};
	});
});