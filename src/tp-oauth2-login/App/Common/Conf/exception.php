<?php
// 数据库相关配置
return array(
	'SUCCESS' => array(
		'errno' => 200,
		'errors' => '请求成功!',
	),
	// 系统异常
	'NOT_FOUND_EX' => array(
		'errno' => 404,
		'errors' => '所请求的页面不存在!',
	),
	'METHOD_NOT_ALLOWED_EX' => array(
		'errno' => 405,
		'errors' => '请求方式错误!',
	),
	'REQUEST_TIMEOUT_EX' => array(
		'errno' => 408,
		'errors' => '请求超时, 请重新登录!',
	),
	'SERVER_ERROR_EX' => array(
		'errno' => 500,
		'errors' => '未知错误, 请稍后重试!',
	),

	// 数据库相关异常
	'ACCOUNT_INVALID_EX' => array(
		'errno' => 101,
		'errors' => '用户名密码错误或者此用户已被禁用!',
	),
	'PARAM_NULL_EX' => array(
		'errno' => 10001,
		'errors' => '参数不完整!',
	),
	'RECORD_ALREADY_EXISTED_EX' => array(
		'errno' => 10002,
		'errors' => '记录已存在!',
	),
	'RESULT_NULL_EX' => array(
		'errno' => 10008,
		'errors' => '查询结果为空!',
	),
	'OPERATION_FREQUENT_EX' => array(
		'errno' => 10009,
		'errors' => '操作过于频繁, 不妨喝杯茶休息下!',
	),
);