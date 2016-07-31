<?php
// 关于url地址的相关配置
return array(
	// 开启路由，重新映射，将url简单化
	'URL_ROUTER_ON' => true,
	'URL_MAP_RULES' => array(
		'index'				=> 'Home/Index/index',
		'callback'			=> 'Home/Index/callback',
	),
);