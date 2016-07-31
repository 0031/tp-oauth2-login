tp-oauth2-login
===============

> Version : 1.0.2

介绍
----

在开发项目的时候，会经常用到用户的登录注册  
如果把登录注册模块抽取出来，将节省开发成本  
因此本仓库诞生了!

架构
----

 - [ThinkPHP] 3.2.3  
 - [OAuth] 2.0  

运行环境
--------

 - [PHP] 5.3.9+
 - [cURL]
 - [MySQL] 5.5+ (数据库可自行修改)

更新日志
--------
1.0.2
 - 将README.md文件规范化

1.0.1
 - 创建仓库
 - 返回数据屏蔽用户编号与用户密码
 - 开启Tp路由，使Url简单化
  
运行注意事项
------------

 - PHP需要打开Curl
 - 将项目clone到PHP运行目录www/git/，不用再次配置，即可运行
 - 自定义配置
 	需要修改如下文件中的一些地址参数
 	1. /tp-oauth2-login/test/tp-login-test/App/Home/View/Index/index.html
 	2. /tp-oauth2-login/test/tp-login-test/Public/assets/js/cab.js
 	3. /tp-oauth2-login/src/oauth_db.sql，最后的INSERT INTO语句 

在线测试
--------

 - [点击此处测试]
 - 可自行注册，默认账户：admin/123456

期待您的加入
------------

> 	QQ [396679132]  
	Email 396679132@qq.com  
	欢迎骚扰  ^_^ !

  [ThinkPHP]: http://www.thinkphp.cn/
  [OAuth]: http://oauth.net/2/
  [PHP]: http://www.php.net/
  [cURL]: http://php.net/manual/en/book.curl.php/
  [MySQL]: http://http://www.mysql.com/
  [点击此处测试]: http://test.qxcwe.cn/
  [396679132]: http://wpa.qq.com/msgrd?v=3&uin=396679132&site=qq&menu=yes/