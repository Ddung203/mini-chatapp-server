-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 21, 2024 lúc 09:38 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `atbm_2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `conversation`
--

CREATE TABLE `conversation` (
  `id` int(11) NOT NULL,
  `participant1Username` varchar(255) NOT NULL,
  `participant2Username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `conversation`
--

INSERT INTO `conversation` (`id`, `participant1Username`, `participant2Username`) VALUES
(65, 'an', 'cuoicuoi'),
(66, 'qwe', 'cuoicuoi'),
(67, 'an', 'qwe'),
(68, 'cuoicuoi', 'cuoicuoi123'),
(69, 'cuoicuoi123', 'an');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `key`
--

CREATE TABLE `key` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `publicKey` text DEFAULT NULL,
  `privateKeyHash` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `key`
--

INSERT INTO `key` (`id`, `username`, `publicKey`, `privateKeyHash`) VALUES
(20, 'cuoicuoi', '{\"n\":63567347,\"e\":9137}', '$2a$10$KlC2rZejXzMLnIA.SZorVuhJVp0ozcymC0wW2zmtJNLSEbnr1lqlq'),
(21, 'Dũng', '{\"n\":7796681,\"e\":7573}', '$2a$10$C.tvmzjf/PAYjky8h/IlnOpg/4.DJrhQO0NKItx7GRx8MIp0luixG'),
(22, 'an', '{\"n\":9192791,\"e\":6637}', '$2a$10$GrL1hkzZzll2dntxdmgcoeKZR8fM.2TvYZTw216mEmJUhmWl8nAqG'),
(23, 'qwe', '{\"n\":5764051,\"e\":6421}', '$2a$10$Mdpj5hL/gzW0Y6Qmkzp6ee1AGiP0kFRags9XqBu5mB6JyoTQ.hNSm'),
(24, 'cuoicuoi123', '{\"n\":34904531,\"e\":8233}', '$2a$10$.ugh0m1GlzZywftVrrsomeaWngU3Z4bFn8yLZcKmEMpXvvDEhQLAq');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `conversationId` int(11) NOT NULL,
  `content` text NOT NULL,
  `sentAt` timestamp NULL DEFAULT current_timestamp(),
  `senderUsername` varchar(255) NOT NULL,
  `receiverUsername` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `message`
--

INSERT INTO `message` (`id`, `conversationId`, `content`, `sentAt`, `senderUsername`, `receiverUsername`) VALUES
(480, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 18:30:55', 'cuoicuoi', 'an'),
(481, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 18:31:30', 'an', 'cuoicuoi'),
(482, 66, '41412400-55457361-24601984-58571329-32244337-60670888-58571329-44990316-25082253-13259354', '2024-06-21 18:35:39', 'qwe', 'cuoicuoi'),
(483, 66, '593617-2024937-840262-840262-2141065', '2024-06-21 18:36:00', 'cuoicuoi', 'qwe'),
(484, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 18:44:17', 'cuoicuoi', 'an'),
(485, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 18:44:21', 'an', 'cuoicuoi'),
(486, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 18:47:20', 'cuoicuoi', 'an'),
(487, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:01:22', 'an', 'cuoicuoi'),
(488, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 19:01:38', 'cuoicuoi', 'an'),
(489, 65, '2932943-3231262-2932943-3231262-2932943-3231262', '2024-06-21 19:01:46', 'cuoicuoi', 'an'),
(490, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:04:03', 'an', 'cuoicuoi'),
(491, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 19:04:06', 'cuoicuoi', 'an'),
(492, 65, '2932943-3231262-3979730-3979730', '2024-06-21 19:04:12', 'cuoicuoi', 'an'),
(493, 68, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:08:21', 'cuoicuoi123', 'cuoicuoi'),
(494, 69, '7066982-1456151-7066982-1456151', '2024-06-21 19:08:24', 'cuoicuoi123', 'an'),
(495, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:15:28', 'an', 'cuoicuoi'),
(496, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:16:35', 'an', 'cuoicuoi'),
(497, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:16:58', 'an', 'cuoicuoi'),
(498, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:17:04', 'an', 'cuoicuoi'),
(499, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:17:11', 'an', 'cuoicuoi'),
(500, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 19:17:17', 'cuoicuoi', 'an'),
(501, 65, '3382132-7066982-1456151-6239372', '2024-06-21 19:17:20', 'cuoicuoi', 'an'),
(502, 65, '7596836-5422683-3627656-8856238-8429412-3382132-1456151-8856238-1456151-8429412-5422683-3627656-8856238-1456151-8429412-3382132-8856238-1456151-7596836-3382132-5422683-8856238-7596836-3382132-8856238-1456151-7596836-5422683-8856238-3627656-3382132-8429412-8856238-6870669-3382132-5422683-8856238-3382132-5658787-2138816-3066489-2046238-5422683-8429412-8856238-7596836-8856238-1456151-7596836-8371951-8856238-3382132-1456151-9134152-7596836', '2024-06-21 19:17:32', 'cuoicuoi', 'an'),
(503, 65, '5762214-1393214-671573-671573-2046238', '2024-06-21 19:18:16', 'cuoicuoi', 'an'),
(504, 65, '2515991-41412400', '2024-06-21 19:18:34', 'an', 'cuoicuoi'),
(505, 65, '10690019-13259354-32244337-32244337-20543227', '2024-06-21 19:29:50', 'an', 'cuoicuoi'),
(506, 65, '41929576', '2024-06-21 19:32:01', 'an', 'cuoicuoi'),
(507, 65, '41929576', '2024-06-21 19:32:20', 'an', 'cuoicuoi');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `isOnline` tinyint(4) DEFAULT 0,
  `socketId` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `isOnline`, `socketId`) VALUES
(63, 'cuoicuoi', '$2b$10$tmRFnlbkQiv07ROtPbyybeMOTF4DNEVn2YrFwA/bSDXAiBQ9MHkhi', 1, 'OLwIOP5xSOdmlUlCAAAJ'),
(64, 'Dũng', '$2b$10$sET0F3GvartShS2GLojI/uDQegQwuYmnzdZg0ctTu8WXuM9/xVq3G', 0, 'Dũng-disconnected-1QxIcLQzGYXK3KkmAAAD'),
(65, 'an', '$2b$10$PhiUf6SiI6656TLDvjCJWOsnmJrncFj/ZJfY459zNUG7XbwxidatW', 1, 'xDLfqI4_RmqKh8tpAAAH'),
(66, 'qwe', '$2b$10$3Y2KzZxYAR8IqZzoFQcsGOCNJ9zdbG3i.NMTya1X7VeJyPV9OSdqC', 0, 'efVyF7X7zL33MBGlAAAL'),
(67, 'cuoicuoi123', '$2b$10$RAzI67FT9x3/MNRt8618leaGhsAa3u3BETE4S1FZvGQF24Y13J8qu', 0, 'z0IAFuSF3S7YRvA-AAAp');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `key`
--
ALTER TABLE `key`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_570f238853747210cde65b134f` (`username`);

--
-- Chỉ mục cho bảng `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT cho bảng `key`
--
ALTER TABLE `key`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=508;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
