// 检验表单完整性
// 1.传入表单<form>，传入参数options(包含需要检验的input元素的id/name/type/class)
// 2.根据类型来判断校验方式(1>判断空[isNull] 2>判断邮箱[isEmail] 3>判断相等[isEqual] 4>判断选中[isChecked] 5>判断字符长度[len]...)
// 3.挨个获取元素，校验表单数据
// 4.校验结果返回
// 5.如果结果正确则通过，不正确生成模态窗口，回传给用户

// 以jQuery插件的形式封装
(function($) {
	var color = false;		// 是否为输入框改变颜色
	var _this_ = null;
	$.fn.checkForm = function(options){
		var err = '';				// 错误消息提示
		// 默认值选项
		var defaults = {
			'items' : [				// 检验项
				{
				'attrName' : 'type',// 属性名称
				'attrValue': 'text',// 属性值
				'smin' : 6,			// 默认字串最小长度
				'smax' : 20,		// 默认字串最大长度
				},
			],
			'verify' : 'isNull',	// 检查类型，枚举类型isNull/isEmail/isChecked/isEqual/len
			'color' : true,			// 默认不改变输入框颜色
		};
		// 获取外部参数，如果不存在则为默认值
		var options = $.extend(defaults,options);
		var cache = '';				// 缓存错误，防止循环后被刷掉
		color = options.color == true ? true : false;
		fast = options.fast == true ? true : false;
		// 保存this指针
		_this_ = $(this); 
		// 插件核心
		this.each(function(){
			$.each(options.items,function(key,value){
				// 1.获取单个检验项
				var item = value;
				// 3.判断要检查的类型是否正确
				options.verify = getVerify(options.verify);
				// 4.开始检验，获取返回消息
				err = check(item,options.verify);
				// 如果错误不空写入到缓存变量中，避免下次循环被空值覆盖
				if(err != ''){
					cache = err;
				}
			});
		});
		return cache;
	}
	/**
	 * 检验字符串长度
	 * @return {[type]} [description]
	 */
	function checkStrLen(item){
		var res = item;
		var dmin = 6;
		var dmax = 20;
		if(typeof res.smin == 'undefined'){
			res.smin = dmin;
		}
		if(typeof res.smax == 'undefined'){
			res.smax = dmax;
		}
		if(res.smin < res.smax){
			// 最大值不得小于0
			if(res.smax < 0){
				res.smin = dmin;
				res.smax = dmax;
			}
		}else{
			// 最小值不能小于0
			if(res.smin < 0){
				res.smin = dmin;
				res.smax = dmax;
			}else{
				// 交换顺序
				var temp = res.smin;
				res.smin = res.max;
				res.max = temp;
			}
		}
		return res;
	}
	/**
	 * 判断检验项目 
	 * isNull/isEmail/isChecked/isEqual/len
	 */
	function getVerify(verify){
		// 此函数主要是避免外部任意传参数
		var arr = ['isNull','isEmail','isChecked','isEqual','len'];
		// verify必须是arr中的一个，否则置为默认isNull
		if(arr.indexOf(verify) == -1){
			verify = 'isNull';
		}
		return verify;
	}
	function check(item,verify){
		var err = '';
		var cache = '';				// 缓存错误，防止循环后被 空 刷掉
		var attrName = item.attrName;
		var attrValue = item.attrValue;
		var arr = [];				// 新建数组，保存每个input值，方便比较
		var objArr = [];			// 新建数组，保存每个input对象
		if(verify == 'isNull'){// 判断空
			_this_.find('input[' + attrName + '*=' + attrValue + ']').each(function(){
				var obj = this;
				err = isNull(obj);
				if(err != ''){
					cache = err;
				}
			});
		}else if(verify == 'isEmail'){// 判断邮箱
			_this_.find('input[' + attrName + '*=' + attrValue + ']').each(function(){
				var obj = this;
				err = isEmail(obj);
				if(err != ''){
					cache = err;
				}
			});
		}else if(verify == 'isChecked'){// 判断选中
			_this_.find('input[' + attrName + '*=' + attrValue + ']').each(function(){
				var obj = this;
				err = isChecked(obj);
				if(err != ''){
					cache = err;
				}
			});
		}else if(verify == 'isEqual'){// 判断相等
			_this_.find('input[' + attrName + '*=' + attrValue + ']').each(function(){
				var obj = this;
				if(obj.val() != ''){							
					arr.push(obj.val());
				}
				objArr.push(obj);
			});
			cache = isEqual(arr,objArr);
		}else if(verify == 'len'){// 判断长度
			item = checkStrLen(item);
			_this_.find('input[' + attrName + '*=' + attrValue + ']').each(function(){
				var obj = this;
				err = len(obj,item.name,item.smin,item.smax);
				if(err != ''){
					cache = err;
				}
			});
		}
		return cache;
	}
	/**
	 * 判断空
	 * @param  obj	输入框对象   
	 */
	function isNull(obj){
		var err = '';
		if($.trim($(obj).val()) == ''){
			err = '请将数据填充完整！';
			clearValue(obj);// 清空数据
		}
		if(color){
			clearColor(obj,'input-warning');// 先清空color
			if(err != ''){				
				$(obj).addClass('input-warning');
			}else{				
				$(obj).addClass('input-success');
			}
		}
		return err;
	}
	/**
	 * 判断邮箱
	 */
	function isEmail(obj){
		var err = '';
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; // 验证邮箱的正则表达式
		if(!reg.test($(obj).val())){
		    err = '邮箱格式不正确！';
		}
		if(color){
			clearColor(obj,'input-danger');// 先清空color
			if(err != ''){
				$(obj).addClass('input-danger');
			}else{				
				$(obj).addClass('input-success');
			}
		}
		return err;
	}
	/**
	 * 判断选中
	 * 返回true/fasle
	 */
	function isChecked(obj){
		var err = '';
		err = $(obj).is(':checked');
		if(color){
			clearColor(obj,'input-warning');// 先清空color
			if(err != ''){
				$(obj).addClass('input-warning');
			}else{				
				$(obj).addClass('input-success');
			}
		}
		return err;
	}
	/**
	 * 检测是否相等
	 * 检测arr数组中的值
	 * objArr存放input对象方便改变颜色
	 */
	function isEqual(arr,objArr){
		var err = '';
		var v = arr[0];// 赋初值
		if(arr.length < 2){
			return '数据不一致';// 小于2没法比较
		}else{
			$.each(arr,function(key,value){
				if(value != v){
					err = '数据不一致';// 值不等
					return false;// 结束循环
				}
			});
		}
		if(color){
			$.each(objArr,function(key,value){				
				clearColor(this,'input-warning');// 先清空color
				if(err != ''){
					$(this).addClass('input-warning');
				}else{
					$(this).addClass('input-success');
				}
			});
		}
		return err;
	}
	/**
	 * 检测字符串长度
	 */
	function len(obj,name,smin,smax){
		var err = '';
		var len = $(obj).val().length;
		if(len < smin){
			err = name + '长度不够, 至少'+smin+'位！';
		}else if(len > smax){
			err = name + '太长了, 最多不超过'+smax+'位！';
		}
		if(color){
			clearColor(obj,'input-danger');// 先清空color
			if(err != ''){				
				$(obj).addClass('input-danger');
			}else{				
				$(obj).addClass('input-success');
			}
		}
		return err;
	}
	/**
	 * 清空原有的颜色
	 */
	function clearColor(obj,className){
		$(obj).removeClass(className);
	}
	/**
	 * 清空数据
	 */
	function clearValue(obj){
		$(obj).val('');
	}
	/**
	 * 删除数组中的重复元素
	 */
	function delDupInArr(arr){
		var res = arr;
		for (var i = 0; i < res.length; i++) {
			for (var j = i + 1; j < res.length; j++) {
				if(res[i] == res[j]){
					res.splice(j,1);
					j --;
				}
			};
		}
		return res;
	}
})(jQuery);

