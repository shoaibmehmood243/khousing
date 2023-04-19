-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2023 at 12:21 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `khousing`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `company_name` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `company_name`, `created_at`, `updated_at`) VALUES
(3, 'shoaib\'s company', '2023-04-16 05:25:44', NULL),
(4, 'Shoaib\'s company', '2023-04-16 05:28:54', NULL),
(5, 'Himanshu\'s company', '2023-04-18 13:47:43', NULL),
(6, 'JUNAID AHMAD\'s company', '2023-04-18 16:10:13', NULL),
(7, 'Usama \'s company', '2023-04-18 19:13:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leases`
--

CREATE TABLE `leases` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `lease_term` varchar(300) NOT NULL,
  `lease_start_date` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `company_id` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `name`, `company_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Portfolio 1', 3, 1, '2023-04-16 05:25:44', NULL),
(2, 'Portfolio 1', 4, 1, '2023-04-16 05:28:54', NULL),
(3, 'Test Portfolio', 3, 1, '2023-04-17 20:19:28', NULL),
(4, 'Portfolio 1', 5, 1, '2023-04-18 13:47:43', NULL),
(5, 'Portfolio 1', 6, 1, '2023-04-18 16:10:13', NULL),
(6, 'new', 3, 1, '2023-04-18 17:35:02', NULL),
(7, 'test', 3, 1, '2023-04-18 19:11:00', NULL),
(8, 'Portfolio 1', 7, 1, '2023-04-18 19:13:24', NULL),
(9, 'test', 3, 1, '2023-04-18 19:13:27', NULL),
(10, 'test', 3, 1, '2023-04-18 19:15:41', NULL),
(11, 'test', 3, 1, '2023-04-18 19:16:08', NULL),
(12, 'test', 5, 1, '2023-04-18 19:18:08', NULL),
(13, 'Testing', 7, 1, '2023-04-18 19:20:04', NULL),
(14, 'test2', 5, 1, '2023-04-18 19:20:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `portfolio_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `property_type` varchar(100) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `latitude` varchar(500) NOT NULL,
  `longitude` varchar(500) NOT NULL,
  `reviews` int(11) DEFAULT NULL,
  `sq_feet` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `user_id`, `portfolio_id`, `company_id`, `property_type`, `address`, `latitude`, `longitude`, `reviews`, `sq_feet`, `created_at`, `updated_at`, `is_active`) VALUES
(27, 4, 1, 3, 'townhouse', '182 Santa Barbara Road, Hope Island Queensland 4212, Australia', '37.79188683673469', '-122.40078314285715', NULL, NULL, '2023-04-16 07:57:54', NULL, 1),
(28, 4, 1, 3, 'single', '182 Sansome Road, Mooresville, North Carolina 28115, United States', '37.79188683673469', '-122.40078314285715', NULL, NULL, '2023-04-16 08:00:09', NULL, 1),
(29, 4, 1, 3, 'apartment', '182 Sansome Road, Mooresville, North Carolina 28115, United States', '37.79188683673469', '-122.40078314285715', NULL, NULL, '2023-04-16 11:09:34', NULL, 1),
(30, 4, 1, 3, 'townhouse', '182 Santa Barbara Road, Hope Island Queensland 4212, Australia', '37.79188683673469', '-122.40078314285715', NULL, NULL, '2023-04-16 16:38:09', NULL, 1),
(31, 4, 1, 3, 'townhouse', '182, Sansome Street, Financial District, San Francisco, CAL Fire Northern Region, California, 94104, United States', '37.79188683673469', '-122.40078314285715', NULL, NULL, '2023-04-17 09:30:34', NULL, 1),
(32, 4, 3, 3, 'apartment', 'Sanso, Corinthian Gardens, Ugong Norte, 3rd District, Quezon City, Eastern Manila District, Metro Manila, 1110, Philippines', '14.5922607', '121.0676729', NULL, NULL, '2023-04-17 20:19:58', NULL, 1),
(33, 7, 5, 6, 'townhouse', 'Restaurante Mallor, 6, Calle San Juan, Quinto, Ribera Baja del Ebro, Zaragoza, Aragon, 50770, Spain', '41.4235539', '-0.495926', NULL, NULL, '2023-04-18 16:11:14', NULL, 1),
(35, 6, 12, 5, 'townhouse', '182 Sansom Fork, Banner, Kentucky 41603, United States', '37.551692', '-82.691028', NULL, NULL, '2023-04-18 19:18:39', NULL, 1),
(36, 8, 13, 7, 'single', 'WB Liquors, 6104 N Mesa St, El Paso, Texas 79912, United States', '31.831504', '-106.530894', NULL, NULL, '2023-04-18 19:21:22', NULL, 1),
(38, 4, 3, 3, 'condominium', '482 Mallory Avenue, Staten Island, New York 10305, United States', '40.59026', '-74.075534', NULL, NULL, '2023-04-19 00:26:28', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `property_units`
--

CREATE TABLE `property_units` (
  `id` int(11) NOT NULL,
  `unit` varchar(500) NOT NULL,
  `property_id` int(11) NOT NULL,
  `bedroom` varchar(100) NOT NULL,
  `bathroom` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_units`
--

INSERT INTO `property_units` (`id`, `unit`, `property_id`, `bedroom`, `bathroom`, `created_at`, `updated_at`, `is_active`) VALUES
(17, 'Single', 27, '4', '2.0', '2023-04-16 07:57:54', NULL, 1),
(18, 'test1', 28, '4', '1.5', '2023-04-16 08:00:09', NULL, 1),
(19, 'Single', 29, '2', '1.5', '2023-04-16 11:09:34', NULL, 1),
(20, 'Single', 30, '4', '2.0', '2023-04-16 16:38:10', NULL, 1),
(21, 'Single', 31, '4', '2.0', '2023-04-17 09:30:35', NULL, 1),
(22, 'Single', 32, '4', '1.5', '2023-04-17 20:19:59', NULL, 1),
(23, 'Single', 33, '3', '1.5', '2023-04-18 16:11:14', NULL, 1),
(24, 'Single', 35, '3', '2.0', '2023-04-18 19:18:40', NULL, 1),
(25, 'Single', 36, '3', '4.0', '2023-04-18 19:21:23', NULL, 1),
(26, 'Single', 38, '4', '1.5', '2023-04-19 00:26:28', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `id` int(11) NOT NULL,
  `lease_id` int(11) NOT NULL,
  `first_name` varchar(500) NOT NULL,
  `middle_name` varchar(500) DEFAULT NULL,
  `last_name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone_number` varchar(500) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(300) NOT NULL,
  `last_name` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phone_number` varchar(300) DEFAULT NULL,
  `is_admin` tinyint(4) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `company_id` int(11) NOT NULL,
  `is_customer` tinyint(4) NOT NULL,
  `is_secondary` tinyint(4) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone_number`, `is_admin`, `user_type`, `company_id`, `is_customer`, `is_secondary`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'shoaib', 'mehmood', 'shoaibmehmood065@gmail.com', '$2b$10$V.TwJsS10YYBXJOeNdjq7.F1kbMcoSJvbemAZJiAQxvj0KCYJezZu', '03084026875', 0, 'primary', 3, 1, 0, 1, '2023-04-16 05:25:44', NULL),
(5, 'Shoaib', 'Mehmood', 'shoaibmehmood@gmail.com', '$2b$10$TZ468yfF886XzJyjSm6vc.hyqAuq.lhX2q/IlOO0aK/G4IV3EHwuO', '(123)-124-214', 0, 'primary', 4, 1, 0, 1, '2023-04-16 05:28:54', NULL),
(6, 'Himanshu', 'LLC', 'himanshu.rvce@gmail.com', '$2b$10$A5QNDl2FximM/ONR/Ax7Z.06YyeVz2zZOzeux5BYIJNh/0QHjf4Ai', '(551)-225-073', 1, 'primary', 5, 0, 0, 1, '2023-04-18 13:47:43', NULL),
(7, 'JUNAID AHMAD', 'JAVAID', 'shoaib.bscs.s.2018@gmail.com', '$2b$10$vEIHb.1lwQtr3VkyNTTXeeZlLMShULdqOESYPgiXNHlF.K7IXGM7q', '(324)-235-353', 0, 'primary', 6, 1, 0, 1, '2023-04-18 16:10:13', NULL),
(8, 'Usama ', 'S.', 'usamasaif813@gmail.com', '$2b$10$OYigxZgMHVYnx370qrV33eIkwMmtzA3r2AvN0KLuoeeWZoY3v/WmK', '(923)-214-0819', 1, 'primary', 7, 0, 0, 1, '2023-04-18 19:13:24', NULL),
(9, 'haneef', 'ahmed', 'haneef@gmail.com', 'test1234', '(213)-214-2143', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 03:26:41', NULL),
(10, 'mufeez', 'khalid', 'mufeez@gmail.com', 'test1234', '(214)-332-4324', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 03:30:00', NULL),
(11, 'mufeez', 'khalid', 'mufeez1@gmail.com', 'test1234', '(243)-242-3432', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 03:31:03', NULL),
(12, 'ali', 'ahmed', 'ali@gmail.com', 'test1234', '(213)-421-4214', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 03:34:29', NULL),
(13, 'usama', 'nadeem', 'usama@gmail.com', '$2b$10$/VNdQOsElOsmFlqg6FXr9eJLgcb80GknyZflecmWSjAfa5mMaKRgC', '(213)-214-3243', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 03:37:43', NULL),
(15, 'hamza', 'khalid', 'hamza@gmail.com', '$2b$10$a6jOFVJWJiCLa7BSDAgznOWUns71RYsIWre0O28M1k1adGzudV/xy', '(213)-214-3243', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 04:56:53', NULL),
(16, 'fazeel', 'asghar', 'fazeel@gmail.com', '$2b$10$A0XET1DXun3Sh77XnKjMQum.FvFK.TBxS/uwokSgc1CN9BQYjOwpq', '(232)-143-2432', 0, 'secondary', 3, 0, 1, 1, '2023-04-19 05:02:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `view` tinyint(4) NOT NULL,
  `adding` tinyint(4) NOT NULL,
  `edit` tinyint(4) NOT NULL,
  `edit_with_banking` tinyint(4) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_permission`
--

INSERT INTO `user_permission` (`id`, `user_id`, `view`, `adding`, `edit`, `edit_with_banking`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 4, 1, 1, 0, 0, 1, '2023-04-16 05:25:44', NULL),
(3, 5, 1, 1, 0, 0, 1, '2023-04-16 05:28:54', NULL),
(4, 6, 1, 1, 0, 0, 1, '2023-04-18 13:47:43', NULL),
(5, 7, 1, 1, 0, 0, 1, '2023-04-18 16:10:13', NULL),
(6, 8, 1, 1, 0, 0, 1, '2023-04-18 19:13:24', NULL),
(7, 15, 1, 1, 1, 0, 1, '2023-04-19 04:56:53', NULL),
(8, 16, 1, 1, 1, 0, 1, '2023-04-19 05:02:04', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leases`
--
ALTER TABLE `leases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propertyId` (`property_id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyIDPortfolio` (`company_id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`user_id`),
  ADD KEY `property_type` (`property_type`),
  ADD KEY `portfolioIdProperty` (`portfolio_id`),
  ADD KEY `companyIDProperty` (`company_id`);

--
-- Indexes for table `property_units`
--
ALTER TABLE `property_units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propertyIdUnits` (`property_id`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaseId` (`lease_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `companyID` (`company_id`);

--
-- Indexes for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userIdPermission` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `leases`
--
ALTER TABLE `leases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `property_units`
--
ALTER TABLE `property_units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leases`
--
ALTER TABLE `leases`
  ADD CONSTRAINT `propertyId` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `companyIDPortfolio` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `companyIDProperty` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `portfolioIdProperty` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `property_units`
--
ALTER TABLE `property_units`
  ADD CONSTRAINT `propertyIdUnits` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `residents`
--
ALTER TABLE `residents`
  ADD CONSTRAINT `leaseId` FOREIGN KEY (`lease_id`) REFERENCES `leases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `companyID` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD CONSTRAINT `userIdPermission` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
