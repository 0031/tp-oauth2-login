<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
	private static $TIMEOUT = 3;
	public function login(){
		$this->display();
	}
	// 登入
    public function loging(){
    	$last = session('last_req_time');
    	if(time() - $last <= $TIMEOUT){
    		session('last_req_time',time());
    		$this->ajaxReturn(C('OPERATION_FREQUENT_EX'));
    	}
    	// 登录请求都以post形式
        if(IS_POST){
        	// // 检验access_token是否匹配
        	// $oauth = A('OAuth2');
        	// if(!$oauth->check()){
        	// 	$this->ajaxReturn(C('PARAM_NULL_EX'));
        	// }
        	// 写入当前请求时间
			session('last_req_time',time());
        	// 获取参数
			$account = I('post.account', '', 'trim');
			$password = md5(I('post.password', '', 'trim'));
			// $password = I('post.password', '', 'trim');
			if(empty($account) || empty($password)) {
				// $this->show('账户不能为空');
				$this->ajaxReturn(C('PARAM_NULL_EX'));
			}
			$map = array(
				'user_account' => $account,
				'user_password' => $password,
			);
			// 获取到记录
			$userinfo = M('user')->where($map)->find();
			if($userinfo) {
				// 此处将user_id写入到session中，以便授权用户使用
				session('user_id',$userinfo['user_id']);
				$this->ajaxReturn(C('SUCCESS'));
			} else {				
				$this->ajaxReturn(C('ACCOUNT_INVALID_EX'));
			}
        } else {
        	$this->ajaxReturn(C('METHOD_NOT_ALLOWED_EX'));
        }
    }
    // 登出
    public function logout(){
    	echo 'logout';
    }
}