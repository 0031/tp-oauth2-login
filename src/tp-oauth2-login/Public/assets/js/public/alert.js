// 基于bootstrap的弹出警告框
// 有进入消失效果的还需依赖animate.css
(function() {
	$.extend({
		"alert" : function(options){
			var defaults = {
				"parent" : "body",					// 警告框父元素，默认以body为基准，可以是id也可以是class
				"size" : "sm",						// 警告框的大小，默认bg 80%, md 60% sm 40%
				"alertClass" : "alert-success", 	// 弹出层div类名称，主要控制颜色
				"animate" : "animated bounceInUp",	// 弹出层出现效果
				"title" : "Well done",				// 提示标题
				"message" : "success.",				// 提示内容
				"close" : true,						// 是否有右上角关闭按钮
				"style" : "",						// 自定义弹出层样式
				"delay" : 1500,						// 消息显示持续时间
			};
			options = $.extend(defaults,options);
			// 添加特效
			options.alertClass = options.alertClass + " " + options.animate;
			// 修改显示位置与弹出层大小
			var style = options.style;
			style += " margin: 0 auto; ";
			if($(parent).width() < 600){
				style += " width: 80%; ";
			}else{
				if($(parent).width() < 800){
					if(options.size == "md"){
					style += " width: 70%; ";
					}else if(options.size == "sm"){
						style += " width: 60%; ";
					}else{
						style += " width: 80%; ";
					}
				}else{
					if(options.size == "md"){
					style += " width: 60%; ";
					}else if(options.size == "sm"){
						style += " width: 40%; ";
					}else{
						style += " width: 80%; ";
					}
				}
			}
			options.style = style;
			var html = getHtml(options);
			// 将这段代码嵌入到父元素的第一个位置
			if($(options.parent).find(".alert-box").length){
				$(options.parent).find(".alert-box").remove();
			}
			$(options.parent).prepend(html);
			// 让提示框随滚动条滚动,并且延时消失
			$(options.parent).find(".alert-box").scorllByScorll(20,options.delay);
		}
	});
	/**
	 * 根据提示信息与弹出框的颜色类名称来确定静态页面代码
	 */
	function getHtml(options){
		// 先获取模板内容
		var tpl = getTpl(options.title,options.close);
		// 替换字串
		var html = tpl.replace(/\${alertClass}/g,options.alertClass);
		html = html.replace(/\${style}/g,options.style);
		html = html.replace(/\${title}/g,options.title);
		html = html.replace(/\${message}/g,options.message);
		
		// 根据父元素宽度来设定当前元素宽度
		var parent = $(options.parent);
		var width = $(options.parent).width();
		if(width == 0){
			width = 200;
		}
		html = html.replace(/\${width}/g,"width:" + width + "px");
		return html;
	}
	/**
	 * 弹出框的颜色类名称来确定静态页面模板代码
	 */
	function getTpl(title,close){
		// ${alertClass}类名称	${title}标题		${message}提示内容	
		var tpl = "";
		tpl = "<div class=\"alert-box\" style=\"position: fixed;${width};z-index:999999;\">"
		if(close){
			tpl += "<div class=\"alert ${alertClass} alert-dismissible\" role=\"alert\" style=\"${style}\">"
			+			"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>";	
		}else{
			tpl += "<div class=\"alert ${colorClass}\" role=\"alert\">";
		}
		if(title != ""){
			tpl += "<strong>${title}!</strong> ${message}";
		}else{
			tpl += "${message}";
		}
		tpl += "</div>";
		tpl += "</div>";
		return tpl;
	}
})(jQuery);