-- --------------------------------------------------------
-- Host:                         localhost
-- Server Version:               10.8.3-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank Struktur für scooter-gmbh
CREATE DATABASE IF NOT EXISTS `scooter-gmbh` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `scooter-gmbh`;

-- Exportiere Struktur von Tabelle scooter-gmbh.billing
CREATE TABLE IF NOT EXISTS `billing` (
  `billing_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ride_id` int(11) NOT NULL,
  `cost` float DEFAULT NULL,
  PRIMARY KEY (`billing_id`),
  KEY `FK_billing_ride` (`ride_id`),
  KEY `FK_billing_user` (`user_id`),
  CONSTRAINT `FK_billing_ride` FOREIGN KEY (`ride_id`) REFERENCES `ride` (`ride_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_billing_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.billing: ~12 rows (ungefähr)
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` (`billing_id`, `user_id`, `ride_id`, `cost`) VALUES
	(164, 79, 497, 1.07),
	(165, 79, 498, 1.07),
	(166, 79, 499, 1.07),
	(167, 79, 500, 1.07),
	(168, 79, 501, 1.07),
	(169, 79, 502, 1.07),
	(170, 79, 503, 1.07),
	(171, 79, 504, 1.07),
	(172, 79, 505, 1.07),
	(173, 79, 506, 1.07),
	(174, 79, 507, 1.07),
	(175, 79, 508, 1.07);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.credit
CREATE TABLE IF NOT EXISTS `credit` (
  `credit_id` int(20) NOT NULL AUTO_INCREMENT,
  `quantity` float NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`credit_id`),
  KEY `FK_credit_user` (`user_id`),
  CONSTRAINT `FK_credit_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.credit: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` (`credit_id`, `quantity`, `user_id`) VALUES
	(62, 7.16, 79);
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.login
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `psw` tinyblob DEFAULT NULL,
  `firstLogon` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_login_user` (`user_id`),
  CONSTRAINT `FK_login_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.login: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` (`id`, `user_id`, `psw`, `firstLogon`) VALUES
	(69, 79, _binary 0x2432622431302439685534555a39744265637a66316e7554354e636b4f6246536d536c3330364c3838754a376a4d3462544270707056555a64704761, '1670503702245');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.otp
CREATE TABLE IF NOT EXISTS `otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `secret` blob NOT NULL,
  `qrCode` varchar(50) NOT NULL DEFAULT '',
  `ascii` longblob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_otp_user` (`user_id`),
  CONSTRAINT `FK_otp_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.otp: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` (`id`, `user_id`, `secret`, `qrCode`, `ascii`) VALUES
	(49, 79, _binary 0x7b226173636969223a22686650464d515074513e45544f5b614f497a3c633028537450687549715b2e65222c22686578223a2236383636353034363464353135303734353133653435353434663562363134663439376133633633333032383533373435303638373534393731356232653635222c22626173653332223a224e4254464152534e4b46494849554a3649564b45365733424a3545585550444447415546473543514e42325553344b33465a5351222c226f7470617574685f75726c223a226f7470617574683a2f2f746f74702f53636f6f746572253230476d62482532302537432532306e6f61687a65756d6572253430676d61696c2e636f6d3f7365637265743d4e4254464152534e4b46494849554a3649564b45365733424a3545585550444447415546473543514e42325553344b33465a5351227d, '', _binary 0x686650464d515074513e45544f5b614f497a3c633028537450687549715b2e65);
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.ride
CREATE TABLE IF NOT EXISTS `ride` (
  `ride_id` int(11) NOT NULL AUTO_INCREMENT,
  `duration` float NOT NULL DEFAULT 0,
  `scoter_id` int(11) NOT NULL,
  PRIMARY KEY (`ride_id`),
  KEY `FK_ride_scooter` (`scoter_id`),
  CONSTRAINT `FK_ride_scooter` FOREIGN KEY (`scoter_id`) REFERENCES `scooter` (`scooter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=509 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.ride: ~13 rows (ungefähr)
/*!40000 ALTER TABLE `ride` DISABLE KEYS */;
INSERT INTO `ride` (`ride_id`, `duration`, `scoter_id`) VALUES
	(496, 1, 5),
	(497, 1, 5),
	(498, 1, 5),
	(499, 1, 5),
	(500, 1, 5),
	(501, 1, 5),
	(502, 1, 5),
	(503, 1, 5),
	(504, 1, 5),
	(505, 1, 5),
	(506, 1, 5),
	(507, 1, 5),
	(508, 1, 5);
/*!40000 ALTER TABLE `ride` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.role: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.scooter
CREATE TABLE IF NOT EXISTS `scooter` (
  `scooter_id` int(11) NOT NULL,
  `lat` float NOT NULL DEFAULT 0,
  `lng` float NOT NULL DEFAULT 0,
  `label` varchar(50) NOT NULL DEFAULT '0',
  `battery` int(11) DEFAULT 80,
  `ip` varchar(50) DEFAULT NULL,
  `last_contect` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`scooter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.scooter: ~2 rows (ungefähr)
/*!40000 ALTER TABLE `scooter` DISABLE KEYS */;
INSERT INTO `scooter` (`scooter_id`, `lat`, `lng`, `label`, `battery`, `ip`, `last_contect`) VALUES
	(1, 53.5511, 9.99368, '0', 80, '172.20.30.187', '20221209134513'),
	(5, 53.5511, 9.99368, '0', 15, NULL, NULL);
/*!40000 ALTER TABLE `scooter` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.scooter_data_gy521
CREATE TABLE IF NOT EXISTS `scooter_data_gy521` (
  `scooter_id` int(11) DEFAULT NULL,
  `timestamp_sc` varchar(50) DEFAULT NULL,
  `ax` varchar(50) DEFAULT NULL,
  `ay` varchar(50) DEFAULT NULL,
  `az` varchar(50) DEFAULT NULL,
  `gx` varchar(50) DEFAULT NULL,
  `gy` varchar(50) DEFAULT NULL,
  `gz` varchar(50) DEFAULT NULL,
  KEY `FK_scooter_data_gy521_scooter` (`scooter_id`),
  CONSTRAINT `FK_scooter_data_gy521_scooter` FOREIGN KEY (`scooter_id`) REFERENCES `scooter` (`scooter_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.scooter_data_gy521: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `scooter_data_gy521` DISABLE KEYS */;
/*!40000 ALTER TABLE `scooter_data_gy521` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.scooter_data_tem_hum
CREATE TABLE IF NOT EXISTS `scooter_data_tem_hum` (
  `scooter_id` int(11) DEFAULT NULL,
  `timestamp_sc` varchar(50) DEFAULT NULL,
  `temp` varchar(50) DEFAULT NULL,
  `hum` varchar(50) DEFAULT NULL,
  KEY `FK__scooter` (`scooter_id`),
  CONSTRAINT `FK__scooter` FOREIGN KEY (`scooter_id`) REFERENCES `scooter` (`scooter_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.scooter_data_tem_hum: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `scooter_data_tem_hum` DISABLE KEYS */;
/*!40000 ALTER TABLE `scooter_data_tem_hum` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.scoter_data
CREATE TABLE IF NOT EXISTS `scoter_data` (
  `timestamp` varchar(50) DEFAULT NULL,
  `ax` varchar(50) DEFAULT NULL,
  `ay` varchar(50) DEFAULT NULL,
  `az` varchar(50) DEFAULT NULL,
  `gx` varchar(50) DEFAULT NULL,
  `gy` varchar(50) DEFAULT NULL,
  `gz` varchar(50) DEFAULT NULL,
  `temp` varchar(50) DEFAULT NULL,
  `hum` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.scoter_data: ~0 rows (ungefähr)
/*!40000 ALTER TABLE `scoter_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `scoter_data` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle scooter-gmbh.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `Gender` varchar(50) DEFAULT NULL,
  `MobileNr` varchar(50) DEFAULT NULL,
  `Birthday` varchar(50) DEFAULT NULL,
  `role` int(11) DEFAULT 1,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Email` (`Email`),
  KEY `FK_user_role` (`role`),
  CONSTRAINT `FK_user_role` FOREIGN KEY (`role`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;

-- Exportiere Daten aus Tabelle scooter-gmbh.user: ~1 rows (ungefähr)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `name`, `Email`, `Gender`, `MobileNr`, `Birthday`, `role`) VALUES
	(79, 'Noah zeumer', 'noahzeumer@gmail.com', 'male', '491515151', '2002-03-25', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
