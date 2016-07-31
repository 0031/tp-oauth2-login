<?php
require_once(COMMON_PATH . 'Library/OAuth2/Autoloader.php');
OAuth2\Autoloader::register();
// 整个项目的相关配置
return array(
	//'配置项'=>'配置值'
	'DEFAULT_CHARSET' => 'utf-8', 				// 默认输出编码
	'DEFAULT_TIMEZONE' => 'PRC', 				// 默认时区
	'DEFAULT_AJAX_RETURN' => 'JSON', 			// 默认AJAX 数据返回格式,可选JSON XML ...
	'DEFAULT_JSONP_HANDLER' => 'jsonpReturn', 	// 默认JSONP格式返回的处理方法
	'DEFAULT_FILTER' => 'htmlspecialchars', 	// 默认参数过滤方法 用于I函数...
	// 加载自定义扩展配置文件
	'LOAD_EXT_CONFIG' => 'db,exception,url',
	// 注册其他的根命名空间
	'AUTOLOAD_NAMESPACE' => array(
	    'OAuth2'     => COMMON_PATH . 'Library/OAuth2/',
	),
	'OAUTH2_DB_DSN' => 'mysql:dbname=oauth_db;host=localhost',
	'OAUTH2_DB_U'	=> 'root',
	'OAUTH2_DB_P'	=> 'root',
	// 'ERROR_PAGE' => './Public/error.html',			// 定义错误跳转页面URL地址
	// 'TMPL_EXCEPTION_FILE'=>'./Public/error.html',
);