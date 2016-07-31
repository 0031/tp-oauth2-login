<?php
namespace Home\Controller;
use Think\Controller;
class RegisterController extends Controller {
	// 注册逻辑
	public function registing(){
		$last = session('last_req_time');
    	if(time() - $last <= $TIMEOUT){
    		session('last_req_time',time());
    		$this->ajaxReturn(C('OPERATION_FREQUENT_EX'));
    	}
    	// 注册请求都以post形式
        if(IS_POST){
        	// 写入当前请求时间
			session('last_req_time',time());
        	// 获取参数
			$account = I("post.account", "", "trim");
			$password = md5(I("post.password", "", "trim"));
			$email = I("post.email", "", "trim");
			if(empty($account) || empty($password) || empty($email)) {
				$this->ajaxReturn(C('PARAM_NULL_EX'));
			}
			// 1.先判断用户是否存在
			$map1 = array(
				'user_account' => $account,
			);
			if(M('user')->where($map1)->find()){
				$this->ajaxReturn(
					array(
						'errno' => C('RECORD_ALREADY_EXISTED_EX.errno'),
						'errors' => '用户名已被注册!',
					)
				);
			}
			// 2.判断邮箱是否已经存在
			$map2 = array(
				'user_email' => $email,
			);
			if(M('user')->where($map2)->find()){
				$this->ajaxReturn(
					array(
						'errno' => C('RECORD_ALREADY_EXISTED_EX.errno'),
						'errors' => '邮箱已被注册!',
					)	
				);
			}
			// 3.开始插入数据
			$map3 = array(
				'user_account' => $account,
				'user_password' => $password,
				'user_email' => $email,
			);
			M('user')->add($map3);
			$json = array(
				'errno' => C('SUCCESS.errno'),
				'errors' => '注册成功, 请牢记您的密码!',
			);
			$this->ajaxReturn($json);
		}else {
        	$this->ajaxReturn(C('METHOD_NOT_ALLOWED_EX'));
        }
	}
}