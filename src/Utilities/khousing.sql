-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2023 at 09:27 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_type` varchar(100) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `reviews` int(11) DEFAULT NULL,
  `sq_feet` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `user_id`, `property_type`, `address`, `reviews`, `sq_feet`, `created_at`, `updated_at`, `is_active`) VALUES
(3, 2, '0', '182 Sansome Road, Mooresville, North Carolina 28115, United States', NULL, NULL, '2023-04-13 13:07:14', NULL, 1),
(4, 2, '0', '182 Santa Maria Court, Burleigh Waters Queensland 4220, Australia', NULL, NULL, '2023-04-13 13:08:37', NULL, 1),
(5, 2, 'single', 'Rue Sans Souci - Sans Soucistraat 182, 1050 Ixelles, Brussels-Capital, Belgium', NULL, NULL, '2023-04-13 13:10:13', NULL, 1),
(13, 2, 'condominium', '182 Santa Barbara Road, Hope Island Queensland 4212, Australia', NULL, NULL, '2023-04-13 14:09:18', NULL, 1),
(14, 2, 'townhouse', '182 San Antonio Court, Robina Queensland 4230, Australia', NULL, NULL, '2023-04-13 14:13:11', NULL, 1),
(15, 2, 'apartment', '182 Santa Maria Court, Burleigh Waters Queensland 4220, Australia', NULL, NULL, '2023-04-13 14:16:30', NULL, 1),
(17, 2, 'single', '182 Santa Maria Court, Burleigh Waters Queensland 4220, Australia', NULL, NULL, '2023-04-13 14:21:57', NULL, 1),
(18, 2, 'condominium', '182 Rue Sansregret, Saint-Calixte, Quebec J0K 1Z0, Canada', NULL, NULL, '2023-04-13 14:25:30', NULL, 1),
(19, 2, 'single', '192 Beaudesert Beenleigh Road, Wolffdene Queensland 4207, Australia', NULL, NULL, '2023-04-13 14:26:42', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `property_types`
--

CREATE TABLE `property_types` (
  `id` int(11) NOT NULL,
  `label` varchar(100) NOT NULL,
  `is_active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Single', 3, '0', '0', '2023-04-13 13:07:14', NULL, 1),
(2, 'Single', 4, '3', '2', '2023-04-13 13:08:37', NULL, 1),
(3, 'Single', 5, '4', '1.5', '2023-04-13 13:10:13', NULL, 1),
(6, '200', 13, '2', '1.0', '2023-04-13 14:09:18', NULL, 1),
(7, '300', 13, '4', '2.0', '2023-04-13 14:09:18', NULL, 1),
(8, 'name', 14, '4', '1.0', '2023-04-13 14:13:11', NULL, 1),
(9, 'test', 14, '3', '1.5', '2023-04-13 14:13:11', NULL, 1),
(10, 'name', 15, '2', '1.0', '2023-04-13 14:16:30', NULL, 1),
(11, 'test', 15, '3', '1.0', '2023-04-13 14:16:30', NULL, 1),
(12, 'test', 17, '2', '1.0', '2023-04-13 14:21:57', NULL, 1),
(13, 'test 2', 17, '4', '1.5', '2023-04-13 14:21:57', NULL, 1),
(14, 'name', 18, '4', '2.0', '2023-04-13 14:25:30', NULL, 1),
(15, 'Single', 19, '2', '1.5', '2023-04-13 14:26:42', NULL, 1);

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
  `is_customer` tinyint(4) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone_number`, `is_admin`, `is_customer`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'shoaib', 'mehmood', 'shoaibmehmood065@gmail.com', '$2b$10$0dHUa4A0wUs7apuCjRSO7.DXKTRgqDOjuksHZjDkNAk9FroyP9gRa', '03084026875', 1, 0, 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leases`
--
ALTER TABLE `leases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `propertyId` (`property_id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`user_id`),
  ADD KEY `property_type` (`property_type`);

--
-- Indexes for table `property_types`
--
ALTER TABLE `property_types`
  ADD PRIMARY KEY (`id`);

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
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leases`
--
ALTER TABLE `leases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `property_types`
--
ALTER TABLE `property_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property_units`
--
ALTER TABLE `property_units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leases`
--
ALTER TABLE `leases`
  ADD CONSTRAINT `propertyId` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `property`
--
ALTER TABLE `property`
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
