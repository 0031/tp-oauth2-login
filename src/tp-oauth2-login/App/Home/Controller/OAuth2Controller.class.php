<?php
namespace Home\Controller;
class OAuth2Controller extends \OAuth2\Controller {
	// 构造函数
	public function __construct(){
        parent::__construct();
        // 需要允许跨域请求，否则在获取token时可能报错
        header('Access-Control-Allow-Origin:*');
    }

    /**
     * 拉取授权
     * 请求类型必须为POST,必须参数如下：
     * client_id : 客户端编号
     * redirect_uri : 授权回调地址，站外应用需与设置的回调地址一致
     * response_type : 请求类型，一般为code
     * state : 用于保持请求和回调的状态，在回调时，会在Query Parameter中回传该参数。开发者可以用这个参数验证请求有效性，也可以记录用户请求授权页前的位置。这个参数可用于防止跨站请求伪造（CSRF）攻击
     *
     * 返回数据为json格式
     * 例如 { 'code' : 'CODE'}
     */
    public function authorize(){
		// 验证授权请求
	    if (!$this->oauth_server->validateAuthorizeRequest($this->oauth_request, $this->oauth_response)) {
	        $this->oauth_response->send();
	        die;
	    }
        // 此处取到session中的user_id同时存入token
        $user_id = session('user_id');
        // 处理授权请求
        $this->oauth_server->handleAuthorizeRequest($this->oauth_request, $this->oauth_response, true, $user_id);
        // 获取授权码，此处的授权码可以进一步封装，自定义加密方式，比如md5，sha1等等
        $code = substr($this->oauth_response->getHttpHeader('Location'), strpos($this->oauth_response->getHttpHeader('Location'), 'code=') + 5, 40);
        // 打印授权码
        echo json_encode(array('code' => $code));
    }

    /**
     * 获取token
     * 请求类型必须为POST,必须参数如下：
     * client_id : 客户端编号
     * client_secret : 客户端密钥
     * grant_type : grant类型，一般为authorization_code
     * code : authorization_code类型下的必须参数，即授权码
     * redirect_uri : authorization_code类型下的必须参数，重定向地址
     * 
     * 返回数据为json格式
     * {
     *      'access_token': 'ACCESS_TOKEN', 用户授权的唯一票据
     *      'expires_in': 1234,             access_token的生命周期，单位是秒数
     *      'remind_in':'798114',           access_token的生命周期（该参数即将废弃，开发者请使用expires_in）
     *      'uid':'123abc'                  授权用户的UID，本字段只是为了方便开发者，减少一次user/show接口调用而返回的
     *  }  
     */
    public function token(){
        $this->oauth_server->handleTokenRequest($this->oauth_request)->send();
    }
    /**
     * 获取token信息
     * access_token : 请求令牌，通过token()获取
     * @return token相关的用户信息
     */
    public function info(){
        // 验证获取信息请求
        if (!$this->oauth_server->verifyResourceRequest($this->oauth_request)) {
            $this->oauth_server->getResponse()->send();
            die;
        }
        $tokenData = $this->oauth_server->getAccessTokenData($this->oauth_request);
        // 此时获取的tokenData格式为
        // {
        //      "access_token":"ACCESS_TOKEN",
        //      "client_id":"CLIENT_ID",
        //      "user_id":"USER_ID",
        //      "expires":EXPIRES,
        //      "scope":SCOPE
        // }
        // echo json_encode($tokenData);
        // 如果想屏蔽掉用户的编号而返回用户其他信息可将该变量重新封装一下，例如：
        $userinfo = M('user')->where(array('user_id' => $tokenData['user_id']))->find();
        // 屏蔽用户密码
        $user = array(
        	'user_account' => $userinfo['user_account'],
        	'user_email' => $userinfo['user_email'],
        );
        echo json_encode($user);
    }
}