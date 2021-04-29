-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2021 at 07:03 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `business_service`
--

-- --------------------------------------------------------

--
-- Table structure for table `biz_categories`
--

CREATE TABLE `biz_categories` (
  `BusinessID` int(100) NOT NULL,
  `CategoryID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `biz_categories`
--

INSERT INTO `biz_categories` (`BusinessID`, `CategoryID`) VALUES
(79, 1235),
(80, 1238),
(83, 1238),
(84, 1236),
(85, 1235),
(85, 1239);

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `BusinessID` int(100) NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `City` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Telephone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `URL` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`BusinessID`, `Name`, `Address`, `City`, `Telephone`, `URL`) VALUES
(79, 'Infrore', 'Khuất Duy Tiến, Thanh Xuan', 'Hanoi ', '+84384426529', 'infore.vn'),
(80, 'MTP Entertainment', 'Láng Hạ, Đống Đa', 'Hà Nội', '0384426529', 'mtp.st.vn'),
(83, 'MTP Entertainment', 'Láng Hạ, Đống Đa', 'Hà Nội', '0384426529', 'mtp.st.vn'),
(84, 'HUST', '1 Dai Co Viet Street', 'Hanoi', '+84384426529', 'hust.edu.vn'),
(85, 'GOT IT', 'Ba Đình', 'Hà Nội', '+84384426529', 'gotit.ai');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(100) NOT NULL,
  `Title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` varchar(400) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CategoryID`, `Title`, `Description`) VALUES
(1234, 'Esport', 'Sponsor and hold esport events'),
(1235, 'IT', 'Building software products'),
(1236, 'Health', 'Provide health services'),
(1237, 'Sport', 'Managing and holding sport events'),
(1238, 'Entertainment', 'Music, Films or other Art related fields'),
(1239, 'Education', 'School and Education Management'),
(1241, 'Media', 'Hold events and Promotion');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `biz_categories`
--
ALTER TABLE `biz_categories`
  ADD PRIMARY KEY (`BusinessID`,`CategoryID`),
  ADD KEY `category_constraint` (`CategoryID`);

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`BusinessID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business`
--
ALTER TABLE `business`
  MODIFY `BusinessID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1243;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `biz_categories`
--
ALTER TABLE `biz_categories`
  ADD CONSTRAINT `business_constraint` FOREIGN KEY (`BusinessID`) REFERENCES `business` (`BusinessID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `category_constraint` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
