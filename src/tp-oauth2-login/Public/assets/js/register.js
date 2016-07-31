(function(){
	$.extend({
		'getRegisterHtml' : function(){
			return getHtml();
		}
	});
	function getHtml(){
		return ''
		+'<form class="register-form form-horizontal" method="post">'
		+	'<h4 class="text-center">欢迎注册</h4>'
		+	'<div class="user-info">'
		+		'<div class="form-group">'
		+			'<label>账户</label>'
		+			'<div class="input-group input-group-icon">'
		+				'<input type="text" class="form-control bk-radius" name="account" placeholder="请输入您的用户名"/>'
		+				'<span class="input-group-addon">'
		+					'<span class="icon">'
		+						'<i class="fa fa-user"></i>'
		+					'</span>'
		+				'</span>'
		+			'</div>'
		+		'</div>'
		+		'<div class="form-group">'
		+			'<label>密码</label>'
		+			'<div class="input-group input-group-icon">'
		+				'<input type="password" class="form-control bk-radius" name="password" placeholder="请输入您的密码"/>'
		+				'<span class="show-pwd input-group-addon" title="显示密码">'
		+					'<span class="icon">'
		+						'<i class="fa fa-eye-slash"></i>'
		+					'</span>'
		+				'</span>'
		+			'</div>'
		+		'</div>'
		+		'<div class="form-group">'
		+			'<label>邮箱</label>'
		+			'<div class="input-group input-group-icon">'
		+				'<input type="email" class="form-control bk-radius" name="email" placeholder="请输入您的常用邮箱"/>'
		+				'<span class="input-group-addon">'
		+					'<span class="icon">'
		+						'<i class="fa fa-envelope"></i>'
		+					'</span>'
		+				'</span>'
		+			'</div>'
		+		'</div>'										
		+		'<div class="row text-right">'
		+			'<a href="javascript:;" class="register-btn btn btn-info col-xs-3 hidden-xs">注册</a>'
		+			'<a href="javascript:;" class="have-account btn btn-default hidden-xs col-xs-offset-1">已有账号?</a>'
		+			'<a href="javascript:;" class="register-btn btn btn-info btn-lg col-xs-12 visible-xs">注册</a>'
		+			'<a href="javascript:;" class="have-account btn btn-default btn-lg col-xs-12 visible-xs">已有账号?</a>'
		+		'</div>'
		+	'</div>'
		+'</form>';
	}
})();