<?php
// Oauth2库请求的简单封装
// 以下参数需要在配置文件中提前配置
// OAUTH2_DB_DSN 	Oauth2数据库DSN，例如mysql:dbname=my_oauth2_db;host=localhost
// OAUTH2_DB_U		Oauth2数据库用户名
// OAUTH2_DB_P		Oauth2数据库用户密码
namespace OAuth2;

class Controller{
	protected $oauth_server;
    protected $oauth_storage;
    protected $oauth_request;
    protected $oauth_response;

    public function __construct(){
        // 配置基本的数据存储对象
        $this->oauth_storage = new \OAuth2\Storage\Pdo(array('dsn' => C('OAUTH2_DB_DSN'), 'username' => C('OAUTH2_DB_U'), 'password' => C('OAUTH2_DB_P')));
        // 通过一个存储对象或数组的存储对象OAuth2服务器类
        $this->oauth_server = new \OAuth2\Server($this->oauth_storage);
        // 添加“客户证书”授权类型(这是最简单的)
        $this->oauth_server->addGrantType(new \OAuth2\GrantType\ClientCredentials($this->oauth_storage));
        // 添加“授权码” 授权类型，AuthorizationCode是最常用的
        $this->oauth_server->addGrantType(new \OAuth2\GrantType\AuthorizationCode($this->oauth_storage));
        // 创建请求
        $this->oauth_request = \OAuth2\Request::createFromGlobals();
        // 创建响应
        $this->oauth_response = new \OAuth2\Response();
    }
}
