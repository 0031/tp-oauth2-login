// 某些页面事件的jquery插件
(function(){
	$.extend({
		/**
		 * 添加windiw.onload()事件，不会覆盖已有的
		 * @param  {Function} callback [回调函数]
		 */
		'addWinOnload' : function(callback){
			if(typeof callback != 'function'){
				return;
			}
			var oldOnload = window.onload;
			if(typeof oldOnload != 'function'){
				window.onload = callback();
			}else{
				window.onload = function(){
					oldOnload();
					callback();
				}
			}
		},
		/**
		 * 绑定窗口最后一次大小改变，再执行回调函数
		 * @param  {Function} callback [回调函数]
		 */
		'bindLastWinResize' : function(callback,delay){
			if(typeof callback != 'function'){
				return;
			}
			if(typeof delay == 'undefined'){
				delay = 100;
			}
			var timeout = null;
			$(window).resize(function(){
				if(timeout){
					clearTimeout(timeout);
				}
				timeout = setTimeout(function(){
					callback();
				},delay);
			});

		}
	});
	function getCurrentTime(){
		return parseInt(new Date().getTime());
	}
})(jQuery);
