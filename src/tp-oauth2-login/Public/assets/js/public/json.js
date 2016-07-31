// 判断json数据是json对象还是json字符串
(function(){
	$.extend({
		"isJsonStr" : function(data){
			if(typeof(data) == 'string'){
				data = eval( '(' + data + ')' );
			}
			// 转换过后如果不是对象类型说明传的不是正确的json数据
			if(typeof(data) == 'object'){
				return data;
			}else{
				return '';
			}
		}
	});
})(jQuery);