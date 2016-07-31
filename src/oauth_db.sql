/*
MySQL Data Transfer
Source Host: localhost
Source Database: oauth_db
Target Host: localhost
Target Database: oauth_db
Date: 2016/7/30 0:00:00
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for oauth_access_tokens
-- ----------------------------
CREATE TABLE `oauth_access_tokens` (
  `access_token` text,
  `client_id` text,
  `user_id` text,
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `scope` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_authorization_codes
-- ----------------------------
CREATE TABLE `oauth_authorization_codes` (
  `authorization_code` text,
  `client_id` text,
  `user_id` text,
  `redirect_uri` text,
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `scope` text,
  `id_token` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_clients
-- ----------------------------
CREATE TABLE `oauth_clients` (
  `client_id` text,
  `client_secret` text,
  `redirect_uri` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_public_keys
-- ----------------------------
CREATE TABLE `oauth_public_keys` (
  `client_id` varchar(80) DEFAULT NULL,
  `public_key` varchar(8000) DEFAULT NULL,
  `private_key` varchar(8000) DEFAULT NULL,
  `encryption_algorithm` varchar(80) DEFAULT 'RS256'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_refresh_tokens
-- ----------------------------
CREATE TABLE `oauth_refresh_tokens` (
  `refresh_token` text,
  `client_id` text,
  `user_id` text,
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `scope` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_scopes
-- ----------------------------
CREATE TABLE `oauth_scopes` (
  `scope` text,
  `is_default` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_users
-- ----------------------------
CREATE TABLE `oauth_users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(2000) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- 如果src目录和test目录不统一请修改第三项
-- 第三项表示：登录请求成功的回调地址
-- ----------------------------
INSERT INTO `oauth_clients` VALUES ('demoapp', 'demopass', 'http://localhost/git/tp-oauth2-login/test/tp-login-test/index.php/callback');
