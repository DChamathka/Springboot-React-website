-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 28, 2021 at 01:20 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greenagrodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

DROP TABLE IF EXISTS `farmers`;
CREATE TABLE IF NOT EXISTS `farmers` (
  `id` bigint(20) NOT NULL,
  `crop` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`id`, `crop`, `email`, `first_name`, `last_name`, `phone`) VALUES
(26, 'Milk', 'lasithsa@gmail.com', 'Lasith', NULL, '0771212121'),
(42, 'Milk', 'lasithsa@gmail.com', 'Lasith', 'Anura', '0113456788'),
(46, 'Eggs', 'spererasithum@gmail.com', 'Sithum', 'Perera', '0771225845');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(58);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) NOT NULL,
  `availability` bit(1) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `availability`, `product_name`, `price`, `type`) VALUES
(1, b'1', 'Banana', 25, 'Fruit'),
(2, b'0', 'Orange (Medium)', 11, 'Fruit'),
(3, b'1', 'Orange', 15, 'Fruit'),
(4, b'0', 'Cabage', 35, 'Vegetable'),
(11, b'1', 'corn', 20, 'Grain'),
(19, b'1', 'Soya beans', 20, 'Grain'),
(20, b'1', 'Butter', 200, 'AnimalProduct'),
(22, b'1', 'Potato', 21, 'Vegetable'),
(41, b'1', 'Orange (Medium)', 9, 'Fruit');

-- --------------------------------------------------------

--
-- Table structure for table `visit_requests`
--

DROP TABLE IF EXISTS `visit_requests`;
CREATE TABLE IF NOT EXISTS `visit_requests` (
  `id` bigint(20) NOT NULL,
  `contact_no` varchar(10) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `insititute` varchar(255) DEFAULT NULL,
  `no_of_visiters` int(11) DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  `requester` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `visit_requests`
--

INSERT INTO `visit_requests` (`id`, `contact_no`, `create_date`, `insititute`, `no_of_visiters`, `request_date`, `requester`) VALUES
(28, '0115565242', '2021-10-27 18:23:13', 'School of Agriculture - Colombo', 10, '2022-10-30 00:00:00', 'S.T.A.Ranjan'),
(29, '0115015242', '2021-10-27 18:27:05', 'School of Agri', 50, '2021-11-06 00:00:00', 'A.P.Kumara'),
(47, '0115015588', '2021-10-28 13:57:31', 'School of Agri', 10, '2021-12-23 00:00:00', 'A.K. Perera'),
(49, '0115015242', '2021-10-28 14:39:33', 'School of Agriculture - Colombo', 10, '2021-10-14 00:00:00', 'A.P.Kumara'),
(55, '0115015242', '2021-10-28 15:30:42', 'School of Agri', 10, '2021-10-17 00:00:00', 'A.P.Kumara');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
