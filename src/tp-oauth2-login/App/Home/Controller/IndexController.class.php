<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
	public function index(){
		$this->show('蟋蚁博客oauth2授权登录');
	}
}