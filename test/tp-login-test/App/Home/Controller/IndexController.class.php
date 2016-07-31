<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	$this->display();
    }
    // 必须要有回调页面
    public function callback(){
    	$this->display();
    }
}