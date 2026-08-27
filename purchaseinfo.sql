-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2025-08-28 10:29:02
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `purchaseinfo`
--

-- --------------------------------------------------------

--
-- 表的结构 `tb_activity`
--

CREATE TABLE `tb_activity` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL COMMENT '活动名称',
  `image` varchar(255) NOT NULL COMMENT '图片路径',
  `desc` varchar(200) DEFAULT NULL COMMENT '简短描述',
  `detail` text DEFAULT NULL COMMENT '详细介绍',
  `type` varchar(20) NOT NULL COMMENT '类型：sing（歌舞演绎）、parent（亲子童趣）、leisure（休闲娱乐）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `tb_activity`
--

INSERT INTO `tb_activity` (`id`, `title`, `image`, `desc`, `detail`, `type`) VALUES
(1, '海上音乐会', '/pages/images/activity11.png', '夜间甲板live演出', '邀请知名乐队，流行、爵士风格...', 'sing'),
(2, '儿童乐园派对', '/pages/images/activity22.png', '亲子互动游戏', '适合3-12岁儿童，有魔术、手工活动...', 'parent'),
(3, '海上瑜伽课', '/pages/images/activity33.png', '晨间甲板瑜伽', '专业教练指导，放松身心...', 'leisure');

-- --------------------------------------------------------

--
-- 表的结构 `tb_food`
--

CREATE TABLE `tb_food` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL COMMENT '餐厅名称',
  `image_url` varchar(255) NOT NULL COMMENT '图片路径',
  `desc` varchar(200) DEFAULT NULL COMMENT '简短描述',
  `detail` text DEFAULT NULL COMMENT '详细介绍',
  `type` varchar(20) NOT NULL COMMENT '类型：main（主餐厅）、special（特色餐厅）、leisure（休闲餐厅）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `tb_food`
--

INSERT INTO `tb_food` (`id`, `title`, `image_url`, `desc`, `detail`, `type`) VALUES
(1, '海上自助餐厅', '/pages/images/foodmain.png', '24小时供应中西餐', '提供全球美食，海鲜、甜点不限量...', 'main'),
(2, '星空特色餐厅', '/pages/images/foodspecial.png', '浪漫夜景+法式料理', '需提前预约，主打米其林级别的法式菜品...', 'special'),
(3, '甲板咖啡吧', '/pages/images/foodleisure.png', '休闲饮品+轻食', '可边喝咖啡边看海景，提供三明治、蛋糕...', 'leisure');

--
-- 转储表的索引
--

--
-- 表的索引 `tb_activity`
--
ALTER TABLE `tb_activity`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tb_food`
--
ALTER TABLE `tb_food`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `tb_activity`
--
ALTER TABLE `tb_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `tb_food`
--
ALTER TABLE `tb_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
