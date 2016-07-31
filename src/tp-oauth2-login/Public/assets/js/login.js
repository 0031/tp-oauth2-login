(function(){
	// 大小改变标志，防止短时间内频繁变换，多次执行
	var isChangeSize = false;
	var oldResize = parseInt(new Date().getTime());
	var newResize = null;
	// 切换背景图片
	switchBgImg();
	$(document).ready(function(){
		init();
		bindBtn();
		$.bindLastWinResize(init);
		$('.icheck-remember input').iCheck({
			checkboxClass: 'icheckbox_square-blue',
		    radioClass: 'iradio_square-blue',
		    increaseArea: '20%' // optional
		});
		$('.weibo-account,.weixin-account').on('click',function(){
			warning('未接入第三方登录通道!');
		});
		getCookie();
	});
	function switchBg(){                                                                                                                                                                                                                                                                                                                                     
		// 获取窗口宽高
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		var bodyHeight = $('body').height();
		var bodyWidth = $('body').width();
		// 将body宽高设置为窗口宽高
		$('body').css({
			'width' : winWidth
		});
		$('body').css({
			'height' : winHeight
		});
	}
	function center(){
		$('body').verticalCenterChildren({
			'delay' : 500,			// 延时
			'childrenClass' : 'body>.content',
		});
	}
	function switchBgImg(){
		// 随机产生一个数字组成背景图名称
		$('body').css('background-image','url('+ Static_Path +'/assets/images/login/' + parseInt(Math.random() * 10) + '.jpg)');
	}
	function getCookie(){
		// 读取cookie
		if($('input[name=account]').val() == ''){
			$('input[name=account]').val($.cookie('account'));
		}
		if($('input[name=password]').val() == ''){
			$('input[name=password]').val($.cookie('password'));
		}
		if($.cookie('remember') == 'true'){
			$('input[name=remember]').iCheck('check');
		}
		if($.cookie('pageName') == 'register'){
			$('a.no-account').trigger('click');
		}
	}
	i = 1;
	function init(){
		// 切换背景宽高
		switchBg();
		// 登录框居中
		center();
	}
	function bindBtn(){
		loginloginSubmitBtn();
		registerloginSubmitBtn();
		noAccountBtn();
		haveAccountBtn();
		keyDown();
		autoClearPwd();
		showPwdBtn();
	}
	// 暂时禁用按钮
	function disabled(message){
		$('a.login-btn,a.no-account,a.register-btn,a.have-account').off('click').on('click',function(){
			warning(message);
			return false;
		});
	}
	function enabled(){
		bindBtn();
	}
	// 点击登录
	function loginloginSubmitBtn(){
		$('a.login-btn').off('click').on('click',function(){
			if($('a.login-btn').attr('data-loging') == '1'){
				warning('正在登录中...');
				return false;
			}
			loginSubmit();
		});
	}
	// 点击注册
	function registerloginSubmitBtn(){
		$('a.register-btn').off('click').on('click',function(){
			if($('a.register-btn').attr('data-loging') == '1'){
				warning('正在注册中...');
				return false;
			}
			registerSubmit();
		});
	}
	// 登录页点击没有账号
	function noAccountBtn(){
		$('a.no-account').off('click').on('click',function(){
			$.cookie('pageName','register');
			if($('.register-form').length == 0){
				$('.login-form').fadeOut(500);
				var html = $.getRegisterHtml();
				setTimeout(function(){
					$('.login-form').after(html);
					bindBtn();
				},500);
				$('.register-form').fadeIn(500);
			}else{
				$('.login-form').fadeOut(500);
				setTimeout(function(){
					$('.register-form').fadeIn(500);
				},500);
			}
			setTimeout(function(){
				init();
			},1000);
		});
	}
	// 注册页点击已有账号
	function haveAccountBtn(){
		$('a.have-account').off('click').on('click',function(){
			$.cookie('pageName','login');
			$('.register-form').fadeOut(500);
			setTimeout(function(){
				$('.login-form').fadeIn(500);
				
			},500);
			setTimeout(function(){
				init();
			},1000);
		});
	}
	// 绑定回车键
	function keyDown(){
		$('body').off('keydown').on('keydown',function(e){
			var key = e.keyCode || e.which;
			// 回车键
			if(key == 13){
				if($('.login-form').css('display') != 'none'){
					$('a.login-btn').eq(0).trigger('click');
				}else{
					$('a.register-btn').eq(0).trigger('click');
				}
			}
			// Delete键
			if(key == 46){
				if(!$('input[type!=checkbox]').is(':focus')){
					// 按delete键清空输入数据，前提是输入框没有获取焦点
					if($('.login-form').css('display') != 'none'){
						$('.login-form').find('input[name=account],input[name=password]').val('');
					}else{
						$('.register-form').find('input[name=account],input[name=password],input[name=email]').val('');
					}
				}
			}
		});
	}
	function autoClearPwd(){
		$('.login-form input[name=account]').off('change').on('change',function(){
			$('.login-form input[name=password]').val('');
		});
	}
	function showPwdBtn(){
		$('.show-pwd').off('click').on('click',function(){		// 显示隐藏密码
			if($(this).find('.fa').hasClass('fa-eye-slash')){	// 修改图标
				$(this).attr('title','隐藏密码');
				$(this).find('.fa').removeClass('fa-eye-slash');
				$(this).prev().attr('type','text');				// 前一个兄弟节点，即为密码框，显示密码
				$(this).find('.fa').addClass('fa-eye');			
			}else if($(this).find('.fa').hasClass('fa-eye')){
				$(this).attr('title','显示密码');
				$(this).find('.fa').removeClass('fa-eye');
				$(this).prev().attr('type','password');			// 前一个兄弟节点，即为密码框，显示密码
				$(this).find('.fa').addClass('fa-eye-slash');
			}
		});
	}
	function loginSubmit(){
		// 检测输入框是否为空
		var err = $('.login-form').checkForm({
			items : [
				{
					'attrName' : 'type',
					'attrValue': 'text',
				},
				{
					'attrName' : 'type',
					'attrValue': 'password',
				},
			],
			'verify' : 'isNull',
		});			
		if(err != ''){
			warning(err);
			// 禁止提交
			return false;
		}
		$.each($('a.login-btn'),function(){
			$(this).attr('data-old-html',$(this).html());
			$(this).attr('data-loging',1);
			$(this).html('登录中...');
		});
		disabled('正在登录中...');
		var account = $('.login-form input[name=account]').val();
		var password = $('.login-form input[name=password]').val();
		var remember = $('.login-form input[name=remember]').prop('checked');
		if(remember){
			// 将用户名和密码保存到cookie，保存七天
			$.cookie('remember', remember,{ expires: 7 });
			$.cookie('account', account,{ expires: 7 });
			$.cookie('password', password,{ expires: 7 });
		}else{
			// 销毁cookie
			$.cookie('remember', 'false');
			$.cookie('account', '');
			$.cookie('password', '');
		}
		$.ajax({
			url : Action + '/loging',
			method : 'post',
			timeout : '10000',
			data : {
				account : account,
				password : password,
				remember : remember,
			},
			success : function(data){
				// 转换得到json对象
    			data = $.isJsonStr(data);
				if(data['errno'] == $.SUCCESS){
					$.alert({
						'parent' : 'body',
						'alertClass' : 'alert-custom alert-success',
						'title' : '恭喜',
						'message' : '登录成功, 即将转至首页!',
						'delay' : 5000,
					});
					// 提交页面
					setTimeout(function(){
						// back(data['data']);
						// 拉取授权
						getAuthorize();
					},1500);
				}else if(data['errno'] == $.ACCOUNT_INVALID){
					// 清除密码
					$.cookie('password', '');
					$('.login-form input[name=password]').val('');
					error(data['errors']);
				}else{
					error(data['errors']);
				}
			},
			error : function(data){
				error('连接失败, 请检查您的网络!');
			},
			complete : function(){
				enabled();
				recoveryLogin();
			}
		});
	}
	function registerSubmit(){
		// 检测输入框是否为空
		var err = $('.register-form').checkForm({
			items : [
				{
					'name' : '用户名',
					'attrName' : 'type',
					'attrValue': 'text',
				},
				{
					'name' : '密码',
					'attrName' : 'type',
					'attrValue': 'password',
				},
				{
					'name' : '邮箱',
					'attrName' : 'type',
					'attrValue': 'email',
				}
			],
			'verify' : 'isNull',
		});
		if(err != ''){
			warning(err);
			// 禁止提交
			return false;
		}
		// 检测输入框长度是否合理
		err = $('.register-form').checkForm({
			items : [
				{
					'name' : '用户名',
					'attrName' : 'type',
					'attrValue': 'text',
					'smin' : 5,
					'smax' : 64,
				},
				{
					'name' : '密码',
					'attrName' : 'type',
					'attrValue': 'password',
					'smin' : 6,
					'smax' : 64,
				}
			],
			'verify' : 'len',
		});
		if(err != ''){
			warning(err);
			// 禁止提交
			return false;
		}
		// 检测邮箱是否正确
		err = $('.register-form').checkForm({
			items : [
				{
					'name' : '邮箱',
					'attrName' : 'type',
					'attrValue': 'email',
				}
			],
			'verify' : 'isEmail',
		});
		if(err != ''){
			warning(err);
			// 禁止提交
			return false;
		}
		$.each($('a.register-btn'),function(){
			$(this).attr('data-old-html',$(this).html());
			$(this).attr('data-registing',1);
			$(this).html('注册中...');
		});
		var account = $('.register-form input[name=account]').val();
		var password = $('.register-form input[name=password]').val();
		var email = $('.register-form input[name=email]').val();
		var ajax = $.ajax({
			url : Module + '/Register/registing',
			method : 'post',
			timeout : '10000',
			data : {
				account : account,
				password : password,
				email : email,
			},
			success : function(data){
				// 转换得到json对象
    			data = $.isJsonStr(data);
				if(data['errno'] == $.SUCCESS){
					$.alert({
						'parent' : 'body',
						'alertClass' : 'alert-custom alert-success',
						'title' : '注册成功',
						'message' : '请牢记密码, 立即登录吧!',
						'delay' : 5000,
					});
					// 返回至登录页
					$('.login-form input[name=account]').val(account);
					$('.login-form input[name=password]').val(password);
					$('a.have-account').trigger('click');
					if($('.login-form .show-pwd').prev().attr('type') == 'password'){
						$('.login-form .show-pwd').trigger('click');
					}
					$('.register-form input[name=account]').val('');
					$('.register-form input[name=password]').val('');
					$('.register-form input[name=email]').val('');
					$('.register-form input').removeClass('input-success');
				}else{
					error(data['errors']);
				}
			},
			error : function(data){
				error('连接失败, 请检查您的网络!');
			},
			complete : function(){
				enabled();
				recoveryRegister();
			}
		});
	} 
	function error(message){
		$.alert({
			'parent' : 'body',
			'alertClass' : 'alert-custom alert-danger',
			'title' : '对不起',
			'message' : message,
			'delay' : 3000,
		});
		recoveryLogin();
	}
	function warning(message){
		$.alert({
			'parent' : 'body',
			'alertClass' : 'alert-custom alert-warning',
			'title' : '请注意',
			'message' : message,
			'delay' : 3000,
		});
	}
	function recoveryLogin(){
		$.each($('a.login-btn'),function(){
			$(this).html($(this).attr('data-old-html'));
			$(this).removeAttr('data-loging');
			$(this).removeAttr('data-old-html');
		});
	}
	function recoveryRegister(){
		$.each($('a.register-btn'),function(){
			$(this).html($(this).attr('data-old-html'));
			$(this).removeAttr('data-loging');
			$(this).removeAttr('data-old-html');
		});
	}
	function back(data){
		var redirect_uri = getParamter('redirect_uri');
		if(redirect_uri != null){
			var redirect = getParamter('redirect_uri') + '?data=' + JSON.stringify(data);
			location.href = redirect;
		}
	}
	// 拉取授权信息
	function getAuthorize(){
		$.ajax({
			url : Module + '/OAuth2/authorize',
			method : 'post',
			timeout : '10000',
			data : {
				client_id : getParamter('client_id'),
				redirect_uri : getParamter('redirect_uri'),
				response_type : getParamter('response_type'),
				state : getParamter('state'),
			},
			success : function(data){
				var obj = eval('(' + data + ')');
				var code = obj['code'];
				// 获取到code然后调转到原来的页面
				location.href = getParamter('redirect_uri') + '?code=' + code;
			}
		});
	}
	// 获取地址栏参数
	function getParamter(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r != null){
	     	return  unescape(r[2]);
	     }
	     return null;
	}
})();