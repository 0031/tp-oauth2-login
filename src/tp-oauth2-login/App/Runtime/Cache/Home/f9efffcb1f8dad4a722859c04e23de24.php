<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
	<head>
    	<meta charset="UTF-8" />
		<title>欢迎登陆</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">	
		<link rel="shortcut icon" href="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/images/logo/logo.ico">
		<link href="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		<link href="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/icheck/css/blue.css" rel="stylesheet">
		<link href="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/css/style.css" rel="stylesheet">
	</head>
	<body>
		<div class="container-fluid content">
			<div class="row">
				<div id="content" class="col-sm-12 full">
					<div class="row">
						<div class="login-box">
							<div class="panel">
								<div class="panel-body">
									<div class="header text-center">
										<img src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/images/logo/logo.png" class="img-responsive" alt="蟋蚁博客管理系统" title="蟋蚁博客管理系统"/>
									</div>
									<form class="login-form form-horizontal" method="post">
										<h4 class="text-center">欢迎登陆</h4>
										<div class="user-info">
											<div class="form-group">
												<label>账户</label>
												<div class="input-group input-group-icon">
													<input type="text" class="form-control bk-radius" name="account" placeholder="请输入您的用户名"/>
													<span class="input-group-addon">
														<span class="icon">
															<i class="fa fa-user"></i>
														</span>
													</span>
												</div>
											</div>											
											<div class="form-group">
												<label>密码</label>
												<div class="input-group input-group-icon">
													<input type="password" class="form-control bk-radius" name="password" placeholder="请输入您的密码"/>
													<span class="show-pwd input-group-addon" title="显示密码">
														<span class="icon">
															<i class="fa fa-eye-slash"></i>
														</span>
													</span>
												</div>
											</div>
											<div class="row" style="margin-bottom: 0">
												<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
													<div class="icheck-remember">
														<input id="remember" name="remember" type="checkbox" />
														<label for="remember">记住我</label>
													</div>
												</div>
												<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 text-right">
													<a class="no-account" href="javascript:;">没有账号?</a>
												</div>
											</div>
											<div class="row text-right" style="margin: 5px 0 10px 0">
												<a href="javascript:;" class="login-btn btn btn-info hidden-xs col-xs-offset-4">登录</a>
												<a href="javascript:;" class="login-btn btn btn-info btn-block btn-lg visible-xs col-sm-12">立即登录</a>
											</div>
											<div class="text-with-hr">
												<span>其他方式</span>
											</div>											
											<div class="other-way text-center">
												<a class="weibo-account btn btn-weibo"><i class="fa fa-weibo"></i></a>
												<a class="weixin-account btn btn-comments"><i class="fa fa-comments"></i></a>
											</div>
										</div>
									</form>
									<p class="text-center">
										<span>Cabrite <i class="fa fa-coffee"></i></span>
										<span class="hidden-xs">联系客服 - <a href="http://www.qxcwe.cn" title="Cabrite客服中心" target="_blank">蟋蚁博客</a></span>
										<span>查看主页 - <a href="http://www.qxcwe.cn" title="Cabrite博客首页" target="_blank">蟋蚁博客</a></span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script>
			window.WebRoot = '/git/tp-oauth2-login/src/tp-oauth2-login';
			window.Static_Path = '/git/tp-oauth2-login/src/tp-oauth2-login/Public';
			window.Action = '/git/tp-oauth2-login/src/tp-oauth2-login/index.php/Home/Login';
			window.Module = '/git/tp-oauth2-login/src/tp-oauth2-login/index.php/Home';
		</script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/jquery/jquery.min.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/jquery/jquery.cookie.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/bootstrap/js/bootstrap.min.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/icheck/icheck.min.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/eventHelper.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/scrollByScroll.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/alert.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/center.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/checkForm.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/httpCode.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/public/json.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/register.js"></script>
		<script src="/git/tp-oauth2-login/src/tp-oauth2-login/Public/assets/js/login.js"></script>
	</body>
</html>