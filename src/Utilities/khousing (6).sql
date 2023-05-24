-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2023 at 05:38 PM
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
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `amount` varchar(500) NOT NULL,
  `due_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `memo` varchar(1000) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(-1, 'nil', '2023-05-24 09:57:15', NULL),
(12, 'Shoaib\'s company', '2023-05-18 06:15:27', NULL),
(13, 'Shoaib\'s company', '2023-05-24 01:35:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leases`
--

CREATE TABLE `leases` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `lease_term` varchar(300) NOT NULL,
  `lease_start_date` timestamp NULL DEFAULT NULL,
  `lease_end_date` timestamp NULL DEFAULT NULL,
  `lease_length` varchar(200) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leases`
--

INSERT INTO `leases` (`id`, `property_id`, `lease_term`, `lease_start_date`, `lease_end_date`, `lease_length`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 49, 'monthly', '2023-05-17 14:00:00', '2023-06-16 19:00:00', NULL, 1, '2023-05-18 06:16:26', NULL),
(6, 50, 'monthly', '2023-05-17 14:00:00', '2023-06-16 19:00:00', NULL, 1, '2023-05-18 07:26:40', NULL),
(7, 51, 'monthly', '2023-05-17 14:00:00', '2023-06-16 19:00:00', NULL, 1, '2023-05-18 08:27:52', NULL),
(8, 52, 'monthly', '2023-05-18 14:00:00', '2023-06-17 19:00:00', NULL, 1, '2023-05-19 05:56:53', NULL),
(9, 53, 'monthly', '2023-05-18 14:00:00', '2023-06-17 19:00:00', NULL, 1, '2023-05-19 06:38:48', NULL),
(10, 54, 'monthly', '2023-05-31 14:00:00', '2023-06-30 19:00:00', NULL, 1, '2023-05-21 23:52:12', NULL),
(11, 55, 'monthly', '2023-05-31 14:00:00', '2023-06-30 19:00:00', NULL, 1, '2023-05-24 04:53:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `lease_id` int(11) NOT NULL,
  `monthly_rent_amount` varchar(500) NOT NULL,
  `amount_received` varchar(500) DEFAULT NULL,
  `current_balance` varchar(500) DEFAULT NULL,
  `monthly_due_day` varchar(100) NOT NULL,
  `recurring_rent_start` int(11) NOT NULL,
  `prorated_rent_amount` varchar(500) DEFAULT NULL,
  `prorated_rent_amount_submitted` int(11) NOT NULL,
  `prorated_rent_due` varchar(500) DEFAULT NULL,
  `late_fee_amount` varchar(500) DEFAULT NULL,
  `late_fee_date` varchar(500) DEFAULT NULL,
  `security_deposit_amount` varchar(500) DEFAULT NULL,
  `security_deposit_amount_submitted` int(11) NOT NULL,
  `security_deposit_due` varchar(500) DEFAULT NULL,
  `checking_account` varchar(500) NOT NULL,
  `routing_number` int(11) NOT NULL,
  `first_name` varchar(500) NOT NULL,
  `last_name` varchar(500) NOT NULL,
  `security_deposit_account_number` varchar(500) DEFAULT NULL,
  `security_deposit_account` tinyint(4) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `lease_id`, `monthly_rent_amount`, `amount_received`, `current_balance`, `monthly_due_day`, `recurring_rent_start`, `prorated_rent_amount`, `prorated_rent_amount_submitted`, `prorated_rent_due`, `late_fee_amount`, `late_fee_date`, `security_deposit_amount`, `security_deposit_amount_submitted`, `security_deposit_due`, `checking_account`, `routing_number`, `first_name`, `last_name`, `security_deposit_account_number`, `security_deposit_account`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 5, '2000', '200', '1800', '1', 2023, '200', 0, '2023-05-30T19:00:00.000Z', '1000', '3', '1000', 0, '2023-05-24T19:00:00.000Z', '4242 4242 4242 4242', 0, '', '', '', 1, 1, '2023-05-18 13:57:12', NULL),
(3, 6, '2000', '0', '2000', '1', 2023, '', 0, '', '10', '5', '100', 0, '2023-05-24T19:00:00.000Z', '4242 4242 4242 4242', 0, '', '', '', 1, 1, '2023-05-18 12:32:22', NULL),
(4, 8, '2000', '0', NULL, '5', 2023, '', 0, '', '100', '1', '500', 0, '2023-05-25T19:00:00.000Z', '4242 4242 4242 4242', 0, '', '', '0', 1, 1, '2023-05-19 06:03:14', NULL),
(5, 9, '1500', '0', '1700', '1', 2023, '', 0, '', '100', '3', '100', 0, '2023-05-25T19:00:00.000Z', '4242 4242 4242 4242', 0, '', '', '', 1, 1, '2023-05-19 06:44:12', NULL),
(6, 10, '2000', '0', '2200', '4', 2023, '', 0, '', '100', '5', '100', 0, '2023-05-30T19:00:00.000Z', '4242 4242 4242 4242', 1234, 'shoaib', 'mehmood', '4242 4242 4242 4242', 1, 1, '2023-05-22 09:07:30', NULL),
(7, 11, '2000', '0', '2250', '1', 2023, '', 0, '', '100', '5', '150', 0, '2023-05-30T19:00:00.000Z', '4242 4242 4242 4242', 123456, 'Shoaib', 'Mehmood', '4242 4242 4242 4242', 1, 1, '2023-05-24 06:10:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `card_name` varchar(500) NOT NULL,
  `card_number` varchar(500) NOT NULL,
  `routing_number` int(11) DEFAULT NULL,
  `expiry_date` varchar(500) DEFAULT NULL,
  `cvc` int(11) DEFAULT NULL,
  `billing_address` varchar(500) DEFAULT NULL,
  `apartment` varchar(500) DEFAULT NULL,
  `city` varchar(500) DEFAULT NULL,
  `state` varchar(500) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
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
(22, 'Portfolio 1', 12, 1, '2023-05-18 06:15:27', NULL),
(23, 'Portfolio 1', 13, 1, '2023-05-24 01:35:59', NULL);

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
(49, 21, 22, 12, 'apartment', '120 Sansome Street, San Francisco, California 94111, United States', '37.791493', '-122.400835', NULL, NULL, '2023-05-18 06:16:00', NULL, 1),
(50, 21, 22, 12, 'condominium', 'Mallory Street, Acushnet, Massachusetts 02743, United States', '41.73262', '-70.91017', NULL, NULL, '2023-05-18 07:25:54', NULL, 1),
(51, 21, 22, 12, 'apartment', '182 Sansome Street, San Francisco, California 94111, United States', '37.792116', '-122.400959', NULL, NULL, '2023-05-18 08:27:21', NULL, 1),
(52, 21, 22, 12, 'single', 'New Broadway, Westfield, Massachusetts 01085, United States', '42.18356', '-72.70007', NULL, NULL, '2023-05-19 05:55:31', NULL, 1),
(53, 21, 22, 12, 'apartment', '200 Liberty Street, 200 Liberty St, New York, New York 10281, United States', '40.713445640625004', '-74.01451180078125', NULL, NULL, '2023-05-19 06:38:07', NULL, 1),
(54, 21, 22, 12, 'condominium', 'Albany, New York 12203, United States', '42.683717', '-73.840702', NULL, NULL, '2023-05-21 23:50:37', NULL, 1),
(55, 21, 22, 12, 'apartment', 'Mallorca, 2228 E Carson St, Pittsburgh, Pennsylvania 15203, United States', '40.428295', '-79.973357', NULL, NULL, '2023-05-24 04:53:06', NULL, 1);

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
(37, 'Single', 49, '3', '1.0', '2023-05-18 06:16:00', NULL, 1),
(38, 'Single', 50, '1', '1.0', '2023-05-18 07:25:54', NULL, 1),
(39, 'Single', 51, '3', '1.5', '2023-05-18 08:27:21', NULL, 1),
(40, 'Single', 52, '3', '1.0', '2023-05-19 05:55:31', NULL, 1),
(41, 'Single', 53, '2', '1.0', '2023-05-19 06:38:07', NULL, 1),
(42, 'Single', 54, '1', '1.0', '2023-05-21 23:50:37', NULL, 1),
(43, 'Single', 55, '2', '1.0', '2023-05-24 04:53:06', NULL, 1);

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
  `number` varchar(500) DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`id`, `lease_id`, `first_name`, `middle_name`, `last_name`, `email`, `number`, `is_active`, `created_at`, `updated_at`) VALUES
(5, 5, 'ali', '', 'mehmood', 'ali@gmail.com', '03084026875', 1, '2023-05-18 06:16:27', NULL),
(6, 6, 'shoaib', '', 'mehmood', 'ali@gmail.com', '03084026875', 1, '2023-05-18 07:26:40', NULL),
(7, 6, 'ahmed', '', 'butt', 'ahmed@gmail.com', '03084026875', 1, '2023-05-18 07:26:40', NULL),
(8, 7, 'shoaib', '', 'mehmood', 'ali@gmail.com', '03084026875', 1, '2023-05-18 08:27:52', NULL),
(9, 8, 'Josh', '', 'Hazelwood', 'joshhazelwood@gmail.com', '12000000000', 1, '2023-05-19 05:56:53', NULL),
(10, 8, 'Steve', '', 'smith', 'stevesmith12@gmail.com', '12345678', 1, '2023-05-19 05:56:53', NULL),
(11, 9, 'Chad', '', 'John', 'chad@gmail.com', '12334444', 1, '2023-05-19 06:38:48', NULL),
(12, 10, 'Shoaib', '', 'Ali', 'shoaib@gmail.com', '1233444', 1, '2023-05-21 23:52:12', NULL),
(13, 11, 'Shoaib', '', 'Tariq', 'shoaib.bscs.s.2018@gmail.com', '03084026875', 1, '2023-05-24 04:53:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `payees` varchar(1000) DEFAULT NULL,
  `amount` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `payment_id`, `payees`, `amount`, `created_at`, `updated_at`) VALUES
(1, 2, '5', '200', '2023-05-18 08:57:12', NULL);

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
(21, 'Shoaib', 'Mehmood', 'shoaibmehmood065@gmail.com', '$2b$10$T91J/SGyt95g7ZHVJec0Yer6W9WmSbDJpFftJro7MxU0PGf9IH6sS', '(214)-324-2343', 1, 'primary', 12, 0, 0, 1, '2023-05-18 06:15:27', NULL),
(24, 'Shoaib', 'Tariq', 'shoaib.bscs.s.2018@gmail.com', '$2b$10$oZd56U5yFNwpG3xuohSPreztQ7uzibNgj7qAeWdJLTALNAH.MQ4Fu', '(324)-324-5325', 0, 'resident', -1, 1, 0, 1, '2023-05-24 05:09:36', NULL);

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
(13, 21, 1, 1, 0, 0, 1, '2023-05-18 06:15:27', NULL),
(15, 24, 1, 1, 0, 0, 1, '2023-05-24 05:09:36', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentIdBill` (`payment_id`);

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
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaseIdPayment` (`lease_id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userIdPaymentMethod` (`user_id`);

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
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentIdTransaction` (`payment_id`);

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
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `leases`
--
ALTER TABLE `leases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `property_units`
--
ALTER TABLE `property_units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `paymentIdBill` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `leases`
--
ALTER TABLE `leases`
  ADD CONSTRAINT `propertyId` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `leaseIdPayment` FOREIGN KEY (`lease_id`) REFERENCES `leases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD CONSTRAINT `userIdPaymentMethod` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `paymentIdTransaction` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
