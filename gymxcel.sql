-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2026-01-12 12:37:09
-- サーバのバージョン： 10.4.32-MariaDB
-- PHP のバージョン: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `gxcel`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `default_foods`
--

CREATE TABLE `default_foods` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `category` enum('protein','carbs','fat') NOT NULL,
  `standard_amount` int(11) DEFAULT 100,
  `calo` float NOT NULL,
  `protein` float NOT NULL,
  `carb` float NOT NULL,
  `fat` float NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `default_foods`
--

INSERT INTO `default_foods` (`id`, `name`, `category`, `standard_amount`, `calo`, `protein`, `carb`, `fat`, `is_active`, `created_at`) VALUES
(2, 'Ức gà (không da)', 'protein', 100, 165, 31, 0, 3.6, 1, '2026-01-12 11:34:56'),
(3, 'Thịt bò nạc', 'protein', 100, 250, 26, 0, 15, 1, '2026-01-12 11:34:56'),
(4, 'Thịt heo nạc', 'protein', 100, 220, 22, 0, 14, 1, '2026-01-12 11:34:56'),
(5, 'Cá hồi', 'protein', 100, 206, 25, 0, 13, 1, '2026-01-12 11:34:56'),
(6, 'Tôm', 'protein', 100, 99, 24, 0, 0.3, 1, '2026-01-12 11:34:56'),
(7, 'Trứng gà (1 quả)', 'protein', 55, 70, 6, 1, 5, 1, '2026-01-12 11:34:56'),
(8, 'Lòng trắng trứng (1 quả)', 'protein', 33, 17, 3.6, 0.2, 0, 1, '2026-01-12 11:34:56'),
(9, 'Lòng đỏ trứng (1 quả)', 'protein', 17, 55, 2.7, 0.6, 4.5, 1, '2026-01-12 11:34:56'),
(10, 'Sữa tươi không đường', 'protein', 100, 42, 3.4, 5, 1.5, 1, '2026-01-12 11:34:56'),
(11, 'Sữa chua không đường', 'protein', 100, 60, 5, 4.5, 3, 1, '2026-01-12 11:34:56'),
(12, 'Phô mai cheddar', 'protein', 100, 400, 25, 2, 33, 1, '2026-01-12 11:34:56'),
(13, 'Đậu hũ (tofu)', 'protein', 100, 76, 8, 2, 4, 1, '2026-01-12 11:34:56'),
(14, 'Cơm trắng', 'carbs', 100, 130, 2.7, 28, 0.3, 1, '2026-01-12 11:35:13'),
(15, 'Cơm gạo lứt', 'carbs', 100, 110, 2.6, 23, 0.9, 1, '2026-01-12 11:35:13'),
(16, 'Bánh mì đen (1 lát)', 'carbs', 33, 70, 3, 13, 1, 1, '2026-01-12 11:35:13'),
(17, 'Yến mạch', 'carbs', 100, 389, 11, 66, 7, 1, '2026-01-12 11:35:13'),
(18, 'Khoai lang', 'carbs', 100, 86, 2, 20, 0.1, 1, '2026-01-12 11:35:13'),
(19, 'Khoai tây', 'carbs', 100, 77, 2, 17, 0.1, 1, '2026-01-12 11:35:13'),
(20, 'Bún / Phở / Miến khô', 'carbs', 100, 350, 8, 80, 1, 1, '2026-01-12 11:35:13'),
(21, 'Dầu oliu (15ml)', 'fat', 15, 120, 0, 0, 14, 1, '2026-01-12 11:35:45'),
(22, 'Dầu dừa (15ml)', 'fat', 15, 120, 0, 0, 14, 1, '2026-01-12 11:35:45'),
(23, 'Bơ (Avocado)', 'fat', 100, 160, 2, 9, 15, 1, '2026-01-12 11:35:45'),
(24, 'Đậu phộng', 'fat', 100, 567, 26, 16, 49, 1, '2026-01-12 11:35:45'),
(25, 'Hạnh nhân', 'fat', 100, 579, 21, 22, 50, 1, '2026-01-12 11:35:45'),
(26, 'Hạt điều', 'fat', 100, 553, 18, 30, 44, 1, '2026-01-12 11:35:45'),
(27, 'Cà chua', 'carbs', 100, 18, 0.9, 3.9, 0.2, 1, '2026-01-12 11:35:56'),
(28, 'Cà rốt', 'carbs', 100, 41, 0.9, 9.6, 0.2, 1, '2026-01-12 11:35:56'),
(29, 'Rau cải', 'carbs', 100, 20, 2, 4, 0.2, 1, '2026-01-12 11:35:56'),
(30, 'Táo', 'carbs', 100, 52, 0.3, 14, 0.2, 1, '2026-01-12 11:35:56'),
(31, 'Chuối', 'carbs', 100, 89, 1, 23, 0.3, 1, '2026-01-12 11:35:56'),
(32, 'Dưa hấu', 'carbs', 100, 30, 0.6, 8, 0.2, 1, '2026-01-12 11:35:56');

-- --------------------------------------------------------

--
-- テーブルの構造 `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `category` enum('protein','carbs','fat') NOT NULL,
  `standard_amount` int(11) NOT NULL DEFAULT 100,
  `calo` float NOT NULL,
  `protein` float NOT NULL,
  `carb` float NOT NULL,
  `fat` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `meals`
--

CREATE TABLE `meals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `meal_type` enum('breakfast','lunch','dinner') NOT NULL,
  `amount` int(11) NOT NULL,
  `meal_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','pt','admin') DEFAULT 'user',
  `status` enum('active','inactive','banned') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `avatar` varchar(255) DEFAULT 'default_avatar.png',
  `gender` enum('M','F','O') DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `height` float DEFAULT NULL COMMENT 'cm',
  `weight` float DEFAULT NULL COMMENT 'kg',
  `waist` float DEFAULT NULL COMMENT 'cm',
  `hip` float DEFAULT NULL COMMENT 'cm',
  `neck` float DEFAULT NULL COMMENT 'cm',
  `activity_level` enum('sedentary','light','moderate','active','very_active') DEFAULT 'sedentary',
  `goal` enum('muscle-gain','fat-loss','weight-gain','weight-loss') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `default_foods`
--
ALTER TABLE `default_foods`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_food_user` (`user_id`);

--
-- テーブルのインデックス `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `meal_date` (`meal_date`),
  ADD KEY `food_id` (`food_id`);

--
-- テーブルのインデックス `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`);

--
-- テーブルのインデックス `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `default_foods`
--
ALTER TABLE `default_foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- テーブルの AUTO_INCREMENT `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- テーブルの AUTO_INCREMENT `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- テーブルの AUTO_INCREMENT `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `fk_food_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `meals`
--
ALTER TABLE `meals`
  ADD CONSTRAINT `meals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meals_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `fk_user_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
