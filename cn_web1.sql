-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2021 at 03:54 PM
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
-- Database: `cn_web1`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `fee` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `subject` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `level` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `cur_amount` int(11) DEFAULT 0,
  `due_registration_date` datetime DEFAULT NULL,
  `status` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `fee`, `teacher_id`, `subject`, `min`, `max`, `level`, `cur_amount`, `due_registration_date`, `status`) VALUES
(1, 'english 12', 1200000, 76, 'english', 30, 70, 'advanced', 40, '0000-00-00 00:00:00', '1'),
(2, 'math 12', 2500000, 75, 'math', 50, 100, 'beginner', 50, '0000-00-00 00:00:00', '1'),
(3, 'physic 12', 2500000, 77, 'physics', 50, 100, 'intermidiate', 80, '0000-00-00 00:00:00', '0'),
(4, 'english 10', 3500000, 76, 'english', 50, 100, 'beginner', 0, '2021-05-13 17:00:00', 'new'),
(5, 'math 10', 4500000, 77, 'math', 70, 100, 'beginner', 0, '2021-05-13 17:00:00', 'new'),
(6, 'math 10', 4500000, 77, 'math', 70, 100, 'beginner', 0, '2021-05-13 17:00:00', 'new'),
(7, 'math 10', 4500000, 77, 'math', 70, 100, 'beginner', 0, '2021-05-13 17:00:00', 'new');

-- --------------------------------------------------------

--
-- Table structure for table `course_notification`
--

CREATE TABLE `course_notification` (
  `id` int(11) NOT NULL,
  `content` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `create_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course_notification`
--

INSERT INTO `course_notification` (`id`, `content`, `course_id`, `create_at`) VALUES
(1, 'nghỉ học 5/4', 1, '0000-00-00 00:00:00'),
(2, 'đổi phòng học nhé', 1, '0000-00-00 00:00:00'),
(3, 'hôm nay cô B dạy thay cô nhé', 2, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `course_student`
--

CREATE TABLE `course_student` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course_student`
--

INSERT INTO `course_student` (`student_id`, `course_id`) VALUES
(4, 1),
(78, 1),
(79, 1);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `time_created` datetime NOT NULL,
  `filename` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `course_id`, `time_created`, `filename`) VALUES
(1, 1, '0000-00-00 00:00:00', 'lab1.pdf'),
(2, 1, '0000-00-00 00:00:00', 'lab2.pdf'),
(3, 2, '0000-00-00 00:00:00', 'algebra.pdf'),
(4, 2, '0000-00-00 00:00:00', 'statistic.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `taskname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`id`, `taskname`, `content`, `created_at`, `course_id`) VALUES
(1, 'english', 'readling', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `exam_student`
--

CREATE TABLE `exam_student` (
  `exam_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `exam_student`
--

INSERT INTO `exam_student` (`exam_id`, `student_id`, `score`) VALUES
(1, 4, 9),
(1, 78, 8),
(1, 79, 6);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--



-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `course_id` int(11) NOT NULL,
  `weekday_id` int(11) NOT NULL,
  `time_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`course_id`, `weekday_id`, `time_id`) VALUES
(1, 2, 1),
(1, 4, 2),
(1, 6, 2),
(4, 2, 3),
(5, 2, 3),
(5, 4, 3),
(6, 2, 3),
(6, 4, 3),
(7, 2, 3),
(7, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `system_notification`
--

CREATE TABLE `system_notification` (
  `id` int(11) NOT NULL,
  `content` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `school` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `role` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `firstname`, `lastname`, `phone`, `school`, `active`, `role`) VALUES
(4, 'thangnd', '$2y$10$MiFtWZxdigJzcOXXDEQTMOAdWVJdBuSrTQmmOb35WyTTxefiFqLMa', 'tajhsdg', 'dsaf', '328409328', 'dsfdhsk', 1, 'student'),
(5, 'seaniwq234342eordev', '$2y$10$VGSWCcmksc67qSU64GhsKe4qPhkUr7mwoKRbeKdbtGMujok2X.Vc2', 'sfef@gmail.com', 'adawd', 'ASD', '1231', 1, 'ASD'),
(29, 'thangprovjp', '$2y$10$BaX7I9cQS0MWJcKSkaVGTuuD95CVxkXMY.krtpiG/0NCfmX20L4/W', 'Nguyen', 'Thang', 'Nguyen Du', '0917789338', 1, 's'),
(45, 'thangprovjpkhack ', '$2y$10$trq600FaRZ3tRiD4raMxSuAhnrbzzewRtugUD/H6GtDqHFR8375Hy', 'Thang', 'Nguyen', 'Nguyen Du', '0921312341', 1, 's'),
(67, 'thangprovjpkhack1', '$2y$10$YltII41guhqcXpA5YIV4xORenpvFhJxUQFxCiaBO4S6gG04MpX8Oq', 'Thang', 'Nguyen', 'Nguyen Du', '0921312341', 1, 's'),
(69, 'thangprovjpvkl', '$2y$10$okFoT9.0Jqhq9f5pnUrSw./V6adwdv1HHg2s8o0LRBYf0RxV7Ttj.', '1231231', '123123', 'lksdfjl', '2342342341', 1, 's'),
(72, 'thangprovjp12', '$2y$10$kbyBCTlBVRaC2XT2TWAGROLCwHXOvECP2icc4Sz491nX7/C1td3kq', 'ídkjhfk', 'jkskjdfh', 'lkdjfhlkj', '21389129083', 1, 's'),
(73, 'thangabc', '$2y$10$KTXBLeB3zh2onp4iSGlQYOXh1ov9GRzQ3zC0L/C0qgWGKQqUQHDSi', 'Nguyen', 'Thang', 'NguyenDuc', '879327423', 1, 's'),
(74, 'admin1', '$2y$10$ynJwzKwehTQk/CKyulkUZuGCU3md9LIeGW0oxPr3EDG8V13hVt6bK', 'sfef@gmail.com', 'adawd', 'ASD', '1231', 1, 'admin'),
(75, 'teacher', '$2y$10$gsECs23Zvdviy.vp9g8OHuuHrdh2hRp2ajQhEd/6bToJLzkOyFIRu', 'sfef@gmail.com', 'adawd', 'ASD', '1231', 1, 'teacher'),
(76, 'teacher1', '$2y$10$1eSlwoJoJSLIeGyNG5P0LOBVTUviBN2Si7ID7JP75mVolPntUf6c6', 'Quan Hoang', 'adawd', 'ASD', '1231', 1, 'teacher'),
(77, 'teacher2', '$2y$10$gEWiXkClKUROU8oS7C6DX.P4VzRvy2F/bLbkXdACk6wj.xpAg6z6K', 'NXT', 'adawd', 'ASD', '1231', 1, 'teacher'),
(78, 'student3', '123456', 'NXT', 'adawd', '1231', NULL, 0, 'student'),
(79, 'student4', '$2y$10$XloqKwAp6eE6iWk/2Mi2Oelj651w1M4SFTu.xmyDk/3VwA2jkHEMO', 'NXT', 'adawd', '1231', NULL, 0, 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `t_id_idx` (`teacher_id`);

--
-- Indexes for table `course_notification`
--
ALTER TABLE `course_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cid4_idx` (`course_id`);

--
-- Indexes for table `course_student`
--
ALTER TABLE `course_student`
  ADD PRIMARY KEY (`student_id`,`course_id`),
  ADD KEY `cid3_idx` (`course_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cid6_idx` (`course_id`);

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cid5_idx` (`course_id`);

--
-- Indexes for table `exam_student`
--
ALTER TABLE `exam_student`
  ADD PRIMARY KEY (`exam_id`,`student_id`),
  ADD KEY `sid5_idx` (`student_id`);

--
-- Indexes for table `payment`
--


--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`course_id`,`weekday_id`);

--
-- Indexes for table `system_notification`
--
ALTER TABLE `system_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`,`username`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `course_notification`
--
ALTER TABLE `course_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `system_notification`
--
ALTER TABLE `system_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `t_id` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course_notification`
--
ALTER TABLE `course_notification`
  ADD CONSTRAINT `cid4` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `cid6` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exam`
--
ALTER TABLE `exam`
  ADD CONSTRAINT `cid5` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exam_student`
--
ALTER TABLE `exam_student`
  ADD CONSTRAINT `eid` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sid5` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sid` FOREIGN KEY (`sid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `cid2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
