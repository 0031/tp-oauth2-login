oauth2认证服务器核心文件
========================

运行步骤
--------

	1. 在mysql中运行下列sql脚本文件
	 - oauth_db.sql  oauth2必要的数据库文件

	 - user_db.sql  登录注册必要的数据库文件
	2. 配置数据库
	 - /tp-oauth2-login/App/Common/Conf/db.php中修改user_db.sql生成的数据库配置
	 - /tp-oauth2-login/App/Common/Conf/config.php中修改oauth_db.sql生成的数据库配置
	 - 其他配置项请参考ThinkPHP官方文档
	3. 将项目转移到运行环境中
	 - 将项目clone到PHP运行目录www/git/，不用再次配置，即可运行