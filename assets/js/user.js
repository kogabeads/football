require(["config"],function(){
	require(["jquery"],function($){
		//	swiper
		var mySwiper = new Swiper('#container',{
			initialSlide :0,
			tap:true,
			passiveListeners: false,
			onSlideChangeStart:function(mySwiper){	//	滑动切换当前标签
		    	$('.tapselecter').removeClass('tap_now');
		    	$('.tapselecter').eq(mySwiper.activeIndex).addClass('tap_now');
		    }
		});

		//	iscroll
		var  myIscroll = new IScroll(".container",{ //配置对象
	         tap:true
	    })


		//	标签切换
		$(".tapselecter").on("click",function(){
			mySwiper.slideTo($(this).index(),300,true);
		})
	});
});