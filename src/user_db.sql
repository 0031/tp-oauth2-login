/*
MySQL Data Transfer
Source Host: localhost
Source Database: user_db
Target Host: db.qxcwe.cn
Target Database: localhost
Date: 2016/7/30 0:05:23
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for user
-- ----------------------------
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户表编号',
  `user_account` varchar(64) DEFAULT NULL COMMENT '可用做登录，英文与数字的搭配，不包含特殊字符',
  `user_password` varchar(64) DEFAULT NULL COMMENT '用户密码',
  `user_email` varchar(128) DEFAULT NULL COMMENT '用户找回密码的唯一凭证',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户表';

