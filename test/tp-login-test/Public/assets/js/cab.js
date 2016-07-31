(function(){
	// 请求token地址
	var tokenUrl = 'http://localhost/git/tp-oauth2-login/src/tp-oauth2-login/index.php/token';
	// 根据token获得用户信息的地址
	var userInfoUrl = 'http://localhost/git/tp-oauth2-login/src/tp-oauth2-login/index.php/info';
	
	// 前两个地址是oauth服务器地址
	// 后面两个地址是测试项目页面地址

	// 获取token后回调地址
	var callbackUrl = 'http://localhost/git/tp-oauth2-login/test/tp-login-test/index.php/callback';
	// 返回首页地址
	var indexUrl = 'http://localhost/git/tp-oauth2-login/test/tp-login-test/index.php';
	$(document).ready(function(){
		getAccessToken(getUserInfo,processRes);
	});
	/**
	 * 结果处理
	 * @param  {[type]} data [description]
	 */
	function processRes(userInfo){
		// 此处userInfo中包含了用户信息，可以保存到cookie，也可以通过请求写入到后台session
		// 这里的例子写入到cookie中，其他页面通过cookie来获取，页面中需要先引入jquery.cookie支持
		$.cookie('user_info',userInfo,{expires: 7,path: '/'});
		location.href = indexUrl;
	}
	/**
	 * 获取token
	 * @param  function tokenCb 获取token成功后的回调函数
	 * @param  function userCb  获取userInfo所需的回调函数
	 */
	function getAccessToken(tokenCb,userCb){
		$.ajax({
			url : tokenUrl,
			method : 'post',
			timeout : '10000',
			data : {
				client_id : 'demoapp',
				client_secret : 'demopass',
				grant_type : 'authorization_code',
				code : getParamter('code'),
				redirect_uri : callbackUrl,
			},
			success : function(data){
				tokenCb(data['access_token'],userCb);
			},
			error : function(err){
				var obj = eval('(' + err['responseText'] + ')');
				if(typeof obj['error_description'] != 'undefined'){
					alert('授权失败，请重试!');
				}
			}
		});
	}
	// 根据token获取用户信息
	function getUserInfo(access_token,userCb){
		$.ajax({
			url : userInfoUrl,
			method : 'post',
			timeout : '10000',
			data : {
				access_token : access_token,
			},
			success : function(data){
				userCb(data);
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