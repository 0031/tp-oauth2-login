<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>开始登录</title>
</head>
<body>
	<a class="authorize" href="javascript:;">拉取授权</a>
	<a class="token" href="javascript:;">获取token</a>
	<a class="info" href="javascript:;">获取token信息</a>
	<script>
		window.WebRoot = '/git/tp-oauth2-login/src/tp-oauth2-login';
		window.Static_Path = '/git/tp-oauth2-login/src/tp-oauth2-login/Public';
		window.Action = '/git/tp-oauth2-login/src/tp-oauth2-login/index.php/Home/Index';
		window.Module = '/git/tp-oauth2-login/src/tp-oauth2-login/index.php/Home';
	</script>
	<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/jquery/jquery.min.js"></script>
	<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/jquery/jquery.cookie.js"></script>
	<script>
		$('a.authorize').on('click',function(){
			$.ajax({
				url : Module + '/OAuth2/authorize',
				method : 'post',
				timeout : '10000',
				data : {
					client_id : 'demoapp',
					redirect_uri : 'http://localhost/login/index.php',
					response_type : 'code',
					state : 'true',
				},
				success : function(data){
					var obj = eval('(' + data + ')');
					$.cookie('code',obj['code']);
					alert('获取到授权码：' + obj['code'] + '，请进一步获取token');
				}
			});
		});
		$('a.token').on('click',function(){
			var cookie = $.cookie('code');
			if(cookie == null){
				alert('请先授权');
				return;
			}
			$.ajax({
				url : Module + '/OAuth2/token',
				method : 'post',
				timeout : '10000',
				data : {
					client_id : 'demoapp',
					client_secret : 'demopass',
					grant_type : 'authorization_code',
					code : cookie,
					redirect_uri : 'http://localhost/login/index.php',
				},
				success : function(data){
					// var obj = eval('(' + data + ')');
					alert('获取到access_token：' + data['access_token'] + '，请进一步获取token相关信息');
					$.cookie('access_token',data['access_token']);
				},
				error : function(err){
					var obj = eval('(' + err['responseText'] + ')');
					if(typeof obj['error_description'] != 'undefined'){
						alert('授权失败，请重新拉取授权');
					}
				}
			});
		});
		$('a.info').on('click',function(){
			var cookie = $.cookie('access_token');
			if(cookie == null){
				alert('请先获取token');
				return;
			}
			$.ajax({
				url : Module + '/OAuth2/info',
				method : 'post',
				timeout : '10000',
				data : {
					access_token : cookie,
				},
				success : function(data){
					console.log(data);
				},
				error : function(err){
					var obj = eval('(' + err['responseText'] + ')');
					if(typeof obj['error_description'] != 'undefined'){
						alert('获取token信息失败，请重新获取token');
					}
				}
			});
		});
	</script>
</body>
</html>