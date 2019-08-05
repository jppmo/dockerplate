CREATE DATABASE IF NOT EXISTS node_db;

/* 
CREATE USER 'root'@'%' IDENTIFIED BY 'nodedbtest';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
 */

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'nodedbtest';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nodedbtest';


USE node_db;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(200) DEFAULT NULL,
  `client_secret` varchar(500) DEFAULT NULL,
  `data_uris` varchar(500) DEFAULT NULL,
  `grants` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id_UNIQUE` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/* INSERT INTO `client` VALUES (1,'browser','browserTestSecret','http://localhost:4000/oauth/token','authorization_code'); */
INSERT INTO `client` VALUES (1,'browser','browserTestSecret','http://localhost:4010','authorization_code');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `client_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_client_idx` (`client_id`),
  CONSTRAINT `fk_users_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES (3,'test','password','2019-07-27 16:53:25','2019-07-27 16:53:25','browser'),(4,'test2',NULL,'2019-07-27 17:07:24','2019-07-27 17:07:24',NULL),(5,'test3','test2','2019-07-27 17:08:37','2019-07-27 17:08:37',NULL);


DROP TABLE IF EXISTS `authorizationCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authorizationCode` (
  `authorization_code` varchar(300) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  `redirect_uri` varchar(300) DEFAULT NULL,
  `client_id` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`authorization_code`),
  KEY `fk_authorizationCode_client_idx` (`client_id`),
  KEY `fk_authorizationCode_users_idx` (`user_id`),
  CONSTRAINT `fk_authorizationCode_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_authorizationCode_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorizationCode`
--

/*!40000 ALTER TABLE `authorizationCode` DISABLE KEYS */;
/* INSERT INTO `authorizationCode` VALUES ('4caebce6aa447f02123d1821cd34c03d85b8c71e','2019-08-04 18:21:51','http://localhost:4000/oauth/token','browser',3),('709ff28f273b0773aaff31a1f632e6d012b21a5a','2019-07-28 21:04:02','http://localhost:4000/oauth/token','browser',3),('d2095098edfb084dd9942336b7c0493903c5e1fa','2019-07-28 21:12:35','http://localhost:4000/oauth/token','browser',3),('fbc8d83aa8cb0b8c622265beaede68947ef770db','2019-08-04 12:52:31','http://localhost:4000/oauth/token','browser',3); */
INSERT INTO `authorizationCode` VALUES ('004e7c65eba31beb269dac8336cbafdbbedc7433','2019-08-05 20:55:31','http://localhost:4010','browser',3),('4caebce6aa447f02123d1821cd34c03d85b8c71e','2019-08-04 18:21:51','http://localhost:4000/oauth/token','browser',3),('63c06cf9c9115e7999951da0c05ca49eabaa69b4','2019-08-05 20:53:00','http://localhost:4000/oauth/token','browser',3),('709ff28f273b0773aaff31a1f632e6d012b21a5a','2019-07-28 21:04:02','http://localhost:4000/oauth/token','browser',3),('d2095098edfb084dd9942336b7c0493903c5e1fa','2019-07-28 21:12:35','http://localhost:4000/oauth/token','browser',3),('fbc8d83aa8cb0b8c622265beaede68947ef770db','2019-08-04 12:52:31','http://localhost:4010','browser',3);
/*!40000 ALTER TABLE `authorizationCode` ENABLE KEYS */;


--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `access_token` varchar(200) NOT NULL,
  `access_token_expires_at` date DEFAULT NULL,
  `client_id` varchar(200) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`access_token`),
  KEY `fk_token_users_idx` (`user_id`),
  KEY `fk_token_client_idx` (`client_id`),
  CONSTRAINT `fk_token_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_token_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/* INSERT INTO `token` VALUES ('055ff33ee1e48b4a5d03d998b014697ac6da552d','2019-08-06','browser',NULL),('09eb60f4e5eb8b830df91a5f460287eeb7849523','2019-07-30','browser',NULL),('1623f18d8a6f2a012f5c5ae1d7bc33c12eb95cc8','2019-08-06','browser',NULL),('2cc63531564834f45c6182e24ba80dc4294a8f0e','2019-08-06','browser',NULL),('41e11f0e65ff818c24faecb4dc5a964065140763','2019-07-30','browser',NULL),('47dc5ef6e53bf07a90704f44745f522186c3b5f4','2019-07-30','browser',NULL),('5fd71374d884730118088156e17e654166850519','2019-08-06','browser',NULL),('88fef9ef654e9d25be9cad0a990956357fcac7f3','2019-07-30','browser',NULL),('9929319ae3a15a9957e7a466ef669b7d32472b9c','2019-07-30','browser',NULL),('a5faee6c726e3778bb1098409bc2fadee73bb149','2019-08-06','browser',NULL),('a886675391e211703e1a3adb2fb47a55b6c266a1','2019-07-30','browser',NULL),('c9b8dcfdb478225904eccd529949e72fe5b02601','2019-07-30','browser',NULL),('ce997c2ed1d2c13f6d0156a61ce703815a082ae8','2019-07-30','browser',NULL),('d741105efcecf2a9a795c6ccf7029db5d9e3ce67','2019-07-30','browser',NULL),('da7c7e1e810749dce8fd5facf97d481491414362','2019-08-06','browser',NULL),('e6fa7b72f45070e75d7dd7667411336c055350d5','2019-08-06','browser',NULL),('e78bbeb40a85e063fcfdd517103751e9cf63597f','2019-08-06','browser',NULL),('ec73a74b359ee5a0e2ece32d64953977fcd28bdd','2019-08-06','browser',NULL),('f3b3649c4cd367d68d5b888321f3e86738e7be34','2019-07-30','browser',NULL); */
INSERT INTO `token` VALUES ('00ef54e5059dcdf2be4c0fa633676bdeee1c441e','2019-08-07','browser',NULL),('055ff33ee1e48b4a5d03d998b014697ac6da552d','2019-08-06','browser',NULL),('09eb60f4e5eb8b830df91a5f460287eeb7849523','2019-07-30','browser',NULL),('1623f18d8a6f2a012f5c5ae1d7bc33c12eb95cc8','2019-08-06','browser',NULL),('176b5c93041a62842ab7e7e4fac7d93262d32321','2019-08-07','browser',NULL),('2cc63531564834f45c6182e24ba80dc4294a8f0e','2019-08-06','browser',NULL),('41e11f0e65ff818c24faecb4dc5a964065140763','2019-07-30','browser',NULL),('4571a8c9c20ab99dcdce44461a4390541d2587ff','2019-08-06','browser',NULL),('47dc5ef6e53bf07a90704f44745f522186c3b5f4','2019-07-30','browser',NULL),('5fd71374d884730118088156e17e654166850519','2019-08-06','browser',NULL),('88fef9ef654e9d25be9cad0a990956357fcac7f3','2019-07-30','browser',NULL),('9929319ae3a15a9957e7a466ef669b7d32472b9c','2019-07-30','browser',NULL),('a5faee6c726e3778bb1098409bc2fadee73bb149','2019-08-06','browser',NULL),('a886675391e211703e1a3adb2fb47a55b6c266a1','2019-07-30','browser',NULL),('c9b8dcfdb478225904eccd529949e72fe5b02601','2019-07-30','browser',NULL),('ce997c2ed1d2c13f6d0156a61ce703815a082ae8','2019-07-30','browser',NULL),('d741105efcecf2a9a795c6ccf7029db5d9e3ce67','2019-07-30','browser',NULL),('d947f7dc00a1c75213022460995227e7dac0ac5c','2019-08-07','browser',NULL),('da7c7e1e810749dce8fd5facf97d481491414362','2019-08-06','browser',NULL),('e6fa7b72f45070e75d7dd7667411336c055350d5','2019-08-06','browser',NULL),('e78bbeb40a85e063fcfdd517103751e9cf63597f','2019-08-06','browser',NULL),('ec73a74b359ee5a0e2ece32d64953977fcd28bdd','2019-08-06','browser',NULL),('f3b3649c4cd367d68d5b888321f3e86738e7be34','2019-07-30','browser',NULL);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;

