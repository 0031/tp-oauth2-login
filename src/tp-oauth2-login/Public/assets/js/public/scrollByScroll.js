// 相对于滚动条滚动
(function(){
	// 设置定时器，方便监听滚动条是否停止
	// 需要特别注意，计时器变量设置为全局变量，否则导致函数多次执行
	var timeout = false;
	$.fn.extend({
		// adjust 适当修改提示框与顶部距离
		"scorllByScorll" : function(adjust,delay){
			var _this_ = this;
			// 一开始进入是即定位元素位置
			setPos(_this_,adjust);
			$(_this_).css({
				"position" : "fixed",
			});
			// 如果是父元素是body,html，或者父元素本身有定位，那么不用监听滚动条，
			// 否则提示框位置可能不会正确显示在可视区域
			if($(_this_).attr("class") == $("body").children().eq(0).attr("class")
			|| $(_this_).attr("class") == $("html").children().eq(0).attr("class")
			|| $(_this_).parent().css("position") == "relative"
			|| $(_this_).parent().css("position") == "fixed"	
			){
				setPos(_this_, - $(document).scrollTop() + adjust);
			}else{
				// 监听滚动条滚动事件
				$(document).scroll(function(){
					isStop(_this_,adjust,setPos);
				});
			}
			// 延时移除提示框
			if(isNaN(delay)){
				delay = 1500;
			}
			setTimeout(function(){
				remove(_this_);
			},delay);
		}
	});
	// 给提示框定位
	function setPos(obj,adjust){
		var top = $(document).scrollTop();
		$(obj).animate({
			"top" : top + adjust,
			"speed" : 10,
		});
	}
	// 移除提示框
	function remove(obj){
		$(obj).fadeOut(500,function(){
			$(this).remove();
		});
	}
	// 判断滚动条是否停止
	// 变量不能直接返回，返回造成函数多次执行，因此此处用回调函数的形式
	function isStop(obj,adjust,callback){
		$(document).scroll(function(){
			if (timeout){
				clearTimeout(timeout);
			}
		    timeout = setTimeout(function(){   
		        if(typeof callback === "function"){
		        	callback(obj,adjust);
		        }
		    },100);
		});
	}
})(jQuery);