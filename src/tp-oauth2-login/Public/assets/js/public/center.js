(function(){
	$.fn.extend({
		// 垂直居中所有子元素
		// 只要把padding,margin调的合适，基本上还是可以居中的，可能有时有点差异
		// 不考虑子元素换行的情况，如有换行请最好用标签包裹
		// 传入参数childrenClass : 子类的class
		'verticalCenterChildren' : function(options){
			var defaults = {
				'adjust' : 0,			// 如果没能正常居中，再适当添加高度
				'delay' : 0,			// 延时
				'childrenClass' : '', 	// 指定要居中的子类class,默认空，表示居中全部子元素
			}
			options = $.extend(defaults,options);
			var children = $(this).children(options.childrenClass);
			// 子元素是纯文本，直接设置行高即可
			if(children.length == 0){
				$(this).css({
					'line-height' : $(this).height() + 'px',
				});
				return;
			}
			// 将子元素的一些属性放入数组中
			var attrs = new Array();
			$.each(children,function(key,value){
				// 定义子元素属性
				var attr = {
					// 由于设置垂直居中，因此垂直方向上的属性需要获得三个高度
					'outerHeight' : 0,		// 元素高度，包含padding + border + margin
					'margin-top' : 0,		// 元素上边距
					'margin-bottom' : 0,	// 元素下边距
					'display' : null,		// 元素的block、inline-block类型
				};
				// 获取属性，并转为数字
				attr['outerHeight'] = $(value).outerHeight(true);
				attr['margin-top'] = parseInt($(value).css('margin-top').substring(0,$(value).css('margin-top').length - 2));
				attr['margin-bottom'] = parseInt($(value).css('margin-bottom').substring(0,$(value).css('margin-bottom').length - 2));
				attr['display'] = $(value).css('display');
				attrs[key] = attr;
			});
			// 1.获取父元素的高度
			var parentHeight = $(this).height();
			// 2. 计算子元素总高度
			var heightTotal = 0;
			//	2.1 假设全部都是块级元素，计算出高度
			for(var i = 0; i < attrs.length; i ++){
				heightTotal += attrs[i]['outerHeight'];
				if(i == attrs.length - 1){
					// 如果子元素超出父元素的总高度，那么不用去掉边距，否则去掉边距
					if(heightTotal <= parentHeight){
						// 最后一个元素需要减掉一个边距
						// 当上边距大于下边距时，去掉上边距
						// 否则去掉下边距
						var margin = attrs[i]['margin-bottom'];
						if(attrs[i]['margin-bottom'] < attrs[i]['margin-top']){
							margin = attrs[i]['margin-top'];
						}
						heightTotal -= margin;
					}
				}
			}
			// 	2.2 选择连续行内元素中最高的一个，去除其他的高度
			for(var i = 0; i < attrs.length; i ++){
				if(attrs[i]['display'] != 'block'){
					// 如果只有一个元素就不用前后查找了
					if(attrs.length > 1){
						// 几个块级元素相邻
						// 向前查找，直到找到块级元素或者数组首位置停止
						for(var j = i; j > 0; j --){
							if(attrs[j]['display'] == 'block'){
								j ++;
								break;
							}
						}
						// 向后查找，直到找到块级元素或者数组末位置停止
						for(var k = i; k < attrs.length; k ++){
							if(attrs[k]['display'] == 'block'){
								// 将计数位置调至i，避免再连续计数
								i = k;
								// 将k回归到上一个行内元素的位置
								k --;
								break;
							}else{
								// i的位置后跳，避免再连续计数
								i ++;
							}
						}
						// 两者之差大于0,说明行内元素是连续的
						if(k - j > 0){
							var maxHeight = attrs[j]['outerHeight'];
							// 循环取到最大高度
							for(var l = j; l < k; l ++){
								if(attrs[l]['outerHeight'] > maxHeight){
									maxHeight = attrs[l]['outerHeight'];
								}
								// 先从总高度中把行内元素的高度去除
								heightTotal -= attrs[l]['outerHeight'];
							}
							// 总高度加上一个最大高度
							heightTotal += maxHeight;
						}
					}
				}
			}
			// 设置居中，根据计算得到top值
			var top = (parentHeight - heightTotal) / 2;
			// 设置样式
			$.each(children,function(key,value){
				if($(this).css('position') == 'static'){
					$(this).css('position','relative');
				}
				$(this).animate({
					'top' : top,
				},options.delay);
			});
		}
	});
})(jQuery);
