-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2025-08-28 10:24:49
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
-- 数据库： `cruise`
--

-- --------------------------------------------------------

--
-- 表的结构 `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL COMMENT '自增ID',
  `booking_number` varchar(50) NOT NULL COMMENT '预订编号',
  `cruise_id` int(11) NOT NULL COMMENT '邮轮关联ID',
  `passenger_name` varchar(50) NOT NULL COMMENT '乘客姓名',
  `booking_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '预订时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `checkin_orders`
--

CREATE TABLE `checkin_orders` (
  `id` int(10) UNSIGNED NOT NULL COMMENT '自增ID',
  `order_number` varchar(50) NOT NULL COMMENT '订单号',
  `cruise_name` varchar(100) NOT NULL COMMENT '邮轮名称',
  `sailing_date` date NOT NULL COMMENT '出航日期',
  `passenger_lastname` varchar(50) NOT NULL COMMENT '乘客姓氏拼音',
  `passenger_birthdate` date NOT NULL COMMENT '出生日期',
  `create_time` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `checkin_orders`
--

INSERT INTO `checkin_orders` (`id`, `order_number`, `cruise_name`, `sailing_date`, `passenger_lastname`, `passenger_birthdate`, `create_time`) VALUES
(1, 'TEST001', 'MSC荣耀号', '2025-08-18', 'ZHANG', '2000-08-18', '2025-07-18 02:40:59'),
(2, 'TEST002', 'MSC荣耀号', '2025-07-22', 'ZHA', '2007-07-18', '2025-07-18 06:17:44'),
(3, 'TEST003', '海洋光谱号', '2025-07-21', 'SUN', '2003-03-18', '2025-07-18 06:20:39');

-- --------------------------------------------------------

--
-- 表的结构 `cruises`
--

CREATE TABLE `cruises` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `ship_name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_popular` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `cruises`
--

INSERT INTO `cruises` (`id`, `title`, `category`, `price`, `duration`, `ship_name`, `capacity`, `description`, `image_url`, `is_popular`) VALUES
(1, '加勒比海七日游', 'caribbean', 12999.00, '7天6晚', '海洋绿洲号', 2880, '探索加勒比海的绝美岛屿，包括牙买加、巴哈马和开曼群岛，享受阳光沙滩和丰富的海洋活动。', 'images/caribbean.jpg', 1),
(2, '地中海渡假', 'mediterranean', 15999.00, '10天9晚', '地中海邮轮号', 2500, '游览意大利、希腊和西班牙等国家的沿海城市，体验欧洲文化与美食，欣赏阳光洒满海面的浪漫景色。', 'images/mediterranean.jpg', 1),
(3, '阿拉斯加冰川视觉传奇', 'alaska', 18999.00, '12天10晚', '北极探索者号', 1800, '近距离观赏壮观的冰川、野生动物和极光奇景，体验冰川徒步和自然保护区独特的生态系统。', 'images/alaska.jpg', 1),
(4, '北欧极光奇景', 'northern', 21999.00, '14天12晚', '极光女神号', 1900, '穿越挪威、瑞典和芬兰，追逐神秘的北极光，体验异国滑雪、极光列车和圣诞老人村之旅。', 'images/northern_europe.jpg', 1),
(5, '南太平洋天堂', 'southpacific', 23999.00, '16天14晚', '珊瑚公主号', 2200, '探索澳大利亚、大溪地和新西兰等岛国，沉浸在碧海蓝天、白色沙滩和独特的文化氛围中。', 'images/south_pacific.jpg', 1);

-- --------------------------------------------------------

--
-- 表的结构 `cruise_activities`
--

CREATE TABLE `cruise_activities` (
  `id` int(11) NOT NULL COMMENT '自增ID',
  `cruise_id` int(11) NOT NULL COMMENT '邮轮关联ID',
  `activity_name` varchar(255) NOT NULL COMMENT '活动名称',
  `activity_description` text DEFAULT NULL COMMENT '活动描述',
  `activity_image` varchar(255) DEFAULT NULL COMMENT '活动图片路径'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `cruise_activities`
--

INSERT INTO `cruise_activities` (`id`, `cruise_id`, `activity_name`, `activity_description`, `activity_image`) VALUES
(1, 1, '水上乐园狂欢日', '甲板上水上乐园全开放，含亲子滑梯、造浪池和主题派对', '/pages/images/activity/water1.png'),
(2, 1, '星空剧院演出', '每晚20:00上演百老汇风格歌舞剧，需提前在前台预约座位', '/pages/images/activity/theater1.png'),
(3, 1, 'SPA海洋护理', '面朝南大海的SPA中心，提供海盐按摩、海藻面膜等特色项目，享8折优惠', '/pages/images/activity/spa1.png'),
(4, 1, '环球美食节', '各餐厅推出意大利、东南亚、中式菜系自助，主厨现场烹饪', '/pages/images/activity/food1.png'),
(5, 2, '星空观测夜游', '12层观测台配备天文望远镜，专业导游讲解星座知识，21:00-23:00', '/pages/images/activity/star1.png'),
(6, 2, '海底观光舱体验', '船底透明观光舱，实时观察海洋生物，每日9:00-17:00开放', '/pages/images/activity/sea1.png'),
(7, 2, '亲子手工工坊', '儿童俱乐部提供陶艺、绘画课程，家长可陪同参与，14:00-16:00', '/pages/images/activity/kid1.png'),
(8, 2, '免税店限时折扣', '奢侈品免税店全场8折，消费满5000元赠邮轮模型', '/pages/images/activity/shop1.png'),
(9, 3, '海洋生物课堂', '海洋学家讲解鲸鱼、珊瑚知识，附赠观察手册，10:00-11:30', '/pages/images/activity/whale1.png'),
(10, 3, '海上皮划艇挑战', '专业教练指导，在平静海域体验皮划艇，需提前报名，08:00-10:00', '/pages/images/activity/kayak1.png'),
(11, 3, '深海潜水体验', '持证教练带领潜水，探索海底珊瑚礁，限18岁以上，13:00-15:00', '/pages/images/activity/dive1.png'),
(12, 3, '甲板烧烤派对', '傍晚海鲜烧烤盛宴，搭配乐队演出，18:30-21:00', '/pages/images/activity/bbq1.png'),
(13, 4, '日出瑜伽课程', '顶层甲板晨间瑜伽，面朝大海放松身心，06:30-07:30', '/pages/images/activity/yoga1.png'),
(14, 4, '海上高尔夫练习', '迷你高尔夫球场开放，专业教练指导，10:00-16:00', '/pages/images/activity/golf1.png'),
(15, 4, '电影之夜', '甲板露天影院播放经典影片，提供免费爆米花，20:00-22:00', '/pages/images/activity/movie1.png'),
(16, 4, '精品拍卖会', '艺术品和纪念品拍卖，所得部分捐赠海洋保护组织，15:00-17:00', '/pages/images/activity/auction1.png');

-- --------------------------------------------------------

--
-- 表的结构 `destination_attractions`
--

CREATE TABLE `destination_attractions` (
  `id` int(11) NOT NULL COMMENT '自增ID',
  `destination_name` varchar(255) NOT NULL COMMENT '目的地名称',
  `attraction_name` varchar(255) NOT NULL COMMENT '景点名称',
  `attraction_description` text DEFAULT NULL COMMENT '景点描述',
  `guide` text DEFAULT NULL COMMENT '导游信息',
  `attraction_image` varchar(255) DEFAULT NULL COMMENT '景点图片路径'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `destination_attractions`
--

INSERT INTO `destination_attractions` (`id`, `destination_name`, `attraction_name`, `attraction_description`, `guide`, `attraction_image`) VALUES
(1, '福冈', '太宰府天满宫', '日本最著名的神社之一，供奉学问之神菅原道真，每年有大量学生前来祈福考试顺利。神社内梅树成林，春季赏梅...', '交通：从福冈市地铁天神站乘筑肥线约30分钟。门票：免费。特色：御守（学业成就符）、梅枝饼。', '/pages/images/destinations/fukuoka1.png'),
(2, '福冈', '福冈塔', '福冈市的地标建筑，高234米，是日本最高的海滨塔。塔顶展望台可360度俯瞰福冈市区和博多湾。', '开放时间：9:00-22:00。门票：800日元。夜景尤其美丽，建议傍晚前往。', '/pages/images/destinations/fukuoka2.png'),
(3, '福冈', '栉田神社', '博多最古老的神社，每年7月举办的“博多祇园山笠”祭典是日本三大祭典之一，可体验传统日式祭典文化。', '交通：地铁长浜站步行5分钟。门票：免费。4月樱花季节特别推荐', '/pages/images/destinations/fukuoka3.png'),
(4, '大阪', '大阪城公园', '位于大阪市中心，以大阪城天守阁为核心，是日本三大名城之一。公园内四季分明，春季樱花、秋季红叶景色绝美...', '交通：地铁谷町四丁目站步行10分钟。天守阁门票：600日元。建议搭配护城河游船体验。', '/pages/images/destinations/osaka1.png'),
(5, '大阪', '道顿堀', '大阪最热闹的美食街，标志性的“蟹道乐”大螃蟹招牌是必打卡景点。街道两旁遍布章鱼烧、大阪烧、拉面等美食...', '交通：地铁难波站步行5分钟。推荐美食：千房串炸、金龙拉面、大阪烧。', '/pages/images/destinations/osaka2.png'),
(6, '大阪', '环球影城', '日本唯一的环球影城主题乐园，拥有哈利波特魔法世界、侏罗纪公园、蜘蛛侠等热门项目，适合全家游玩。', '门票：约7000-10000日元（需提前官网购买）。建议早入园，优先体验热门项目的快速通行证。登山需提前预约（官网申请）。推荐路线：城板岳路线（难度适中，约4小时）。需穿防滑鞋，带足饮用水。', '/pages/images/destinations/osaka3.png'),
(7, '济州岛', '汉拿山', '韩国最高峰（1950米），火山喷发形成的独特地形，山顶有巨大火山口湖白鹿潭。徒步路线丰富，四季景色各异...', '交通：从城山港乘船约15分钟。推荐玩法：租电动车环岛（约2小时）。特色美食：黑猪肉、鲍鱼粥。', '/pages/images/destinations/jeju1.png'),
(8, '济州岛', '牛岛', '位于济州岛东侧的火山岛，因形似卧牛得名。岛上自然风光优美，有珊瑚沙海水浴场、灯塔等景点。', '门票：2000韩元。最佳观赏时间：日落时分。周边有海鲜市场，可品尝新鲜海产。', '/pages/images/destinations/jeju2.png'),
(9, '济州岛', '柱状节理带', '由火山喷发形成的六角形石柱群，是济州岛代表性自然景观。海浪拍打石柱，景色壮观。', '门票：免费。交通：从济州市区乘公交或打车前往', '/pages/images/destinations/jeju3.png'),
(10, '长崎', '豪斯登堡', '以荷兰风情为主题的主题乐园，园内有运河、风车、荷兰式建筑，还有精彩的花车巡游和夜间灯光秀。', '门票：约4000日元。推荐玩法：乘游船游览运河、参观荷兰王宫博物馆。冬季有圣诞特别活动。', '/pages/images/destinations/nagasaki1.png'),
(11, '长崎', '眼镜桥', '日本最古老的石拱桥，由中国明代僧人设计建造，桥身倒映在水面形成“眼镜”形状，因此得名。', '交通：从长崎站乘巴士约20分钟。门票：免费。周边有唐人街，可品尝中华街美食。', '/pages/images/destinations/nagasaki2.png'),
(12, '长崎', '和平公园', '为纪念1945年原子弹爆炸而建的公园，园内矗立着和平祈念像，还有原子弹爆炸资料馆。', '门票：免费。原子弹资料馆门票：200日元。每年8月9日有和平纪念仪式。', '/pages/images/destinations/nagasaki3.png');

-- --------------------------------------------------------

--
-- 表的结构 `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT '标题',
  `subtitle` varchar(100) NOT NULL COMMENT '副标题',
  `icon_url` varchar(255) DEFAULT NULL COMMENT '图标URL',
  `page_path` varchar(100) NOT NULL COMMENT '跳转页面路径',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态 1-启用 0-禁用',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `features`
--

INSERT INTO `features` (`id`, `title`, `subtitle`, `icon_url`, `page_path`, `status`, `sort`) VALUES
(1, 'super 美味', '餐饮服务', '/pages/images/tabbar/food.png', '/pages/food/food', 1, 1),
(2, 'super 安全', '保险服务', '/pages/images/tabbar/insurance.png', '/pages/insurance/insurance', 1, 2),
(3, 'super 安心', '客服中心', '/pages/images/tabbar/service.png', '/pages/saleservice/saleservice', 1, 3),
(4, 'super 有趣', '优惠活动', '/pages/images/tabbar/activity.png', '/pages/activity/activity', 1, 4);

-- --------------------------------------------------------

--
-- 表的结构 `hot_activities`
--

CREATE TABLE `hot_activities` (
  `id` int(11) NOT NULL COMMENT '自增ID',
  `title` varchar(255) NOT NULL COMMENT '活动标题',
  `description` text DEFAULT NULL COMMENT '宣传内容',
  `tag` varchar(100) DEFAULT NULL COMMENT '活动标签',
  `price_info` varchar(50) DEFAULT NULL COMMENT '价格信息',
  `image_url` varchar(255) DEFAULT NULL COMMENT '活动图片路径'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `hot_activities`
--

INSERT INTO `hot_activities` (`id`, `title`, `description`, `tag`, `price_info`, `image_url`) VALUES
(1, '带爸妈出海，畅享亲子主题火热招募', '专为中老年游客设计的东南亚深度游，全程含中文导游、无障碍设施，每日安排轻量观光，体验当地文化与美食，...', '9天8晚 深度游东南亚', '船票3折', '/pages/images/activity1.png'),
(2, '夏日亲子主题火热招募', '暑期亲子专属活动，包含儿童俱乐部托管、亲子手工工坊、海洋科普课堂，夜间还有星空电影。全程提供儿童餐，...', '低至¥999/人', '船票88折', '/pages/images/activity2.png');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cruise_category` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `cruise_category`, `image_url`, `created_at`) VALUES
(1, '环球邮轮新增加勒比海航线', '新增每周三班航线，途经牙买加、巴哈马等岛屿，预订享8折优惠，船上将提供特色加勒比美食和水上娱乐项目。', 'caribbean', 'images/news1.jpg', '2025-07-11 09:00:00'),
(2, '海洋绿洲号完成升级，新增北极景观露台', '海洋绿洲号完成年度升级！全新北极探索观景台360°俯瞰大海，更增设日落观景吧台，海上剧院、亲子乐园...', 'alaska', 'images/news2.jpg', '2025-07-11 10:00:00'),
(3, '夏季专属！地中海邮轮推出“落日航线”', '夏日限定福利来袭！地中海邮轮新增“落日航线”，每天17:00启航，途经圣托里尼、西西里岛，在甲板...', 'mediterranean', 'images/news3.jpg', '2025-07-11 10:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `route_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `passenger_count` int(11) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` decimal(10,2) NOT NULL COMMENT '订单总金额',
  `paid_time` datetime DEFAULT NULL COMMENT '支付时间（未支付则为NULL）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`id`, `route_id`, `user_id`, `passenger_count`, `contact_name`, `contact_phone`, `status`, `created_at`, `price`, `paid_time`) VALUES
(1, 1, 12, 1, '蛋壳', '19999999988', 1, '2025-08-10 04:06:42', 6999.00, NULL),
(2, 2, 12, 1, '大福', '19899999899', 1, '2025-08-10 06:58:35', 5899.00, NULL),
(3, 5, 12, 1, '球球', '18766695383', 1, '2025-08-10 07:34:52', 3700.00, NULL),
(4, 1, 12, 1, '点点', '13517539473', 1, '2025-08-10 07:44:04', 6999.00, NULL),
(5, 6, 12, 1, '花花', '16685985848', 0, '2025-08-10 08:02:01', 3304.15, NULL),
(6, 7, 12, 1, '大华', '17779998898', 2, '2025-08-10 08:04:10', 1904.50, NULL),
(7, 5, 12, 1, '柯南', '19899999999', 1, '2025-08-11 03:05:48', 3700.00, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '航线标题',
  `port` varchar(50) NOT NULL COMMENT '出发港口',
  `imageUrl` varchar(255) NOT NULL COMMENT '图片路径',
  `subtitle` varchar(255) NOT NULL COMMENT '副标题/行程描述',
  `date` date NOT NULL COMMENT '出发日期',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `tags` varchar(255) NOT NULL COMMENT '标签，逗号分隔'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `routes`
--

INSERT INTO `routes` (`id`, `title`, `port`, `imageUrl`, `subtitle`, `date`, `price`, `tags`) VALUES
(1, '澜光溢彩号-上海-福冈-长崎-上海', '上海', '/pages/images/cruise1.png', '5天4晚・豪华套房', '2025-08-15', 6999.00, '亲子游,美食之旅,海上娱乐'),
(2, '瀚海星洲号-天津-济州-釜山-天津', '天津', '/pages/images/cruise2.png', '6天5晚・海景阳台房', '2025-09-02', 5899.00, '文化体验,免税购物,家庭出游'),
(3, '鲸歌远航号-深圳-岘港-芽庄-深圳', '深圳', '/pages/images/cruise3.png', '7天6晚・内舱房', '2025-08-20', 4599.00, '阳光沙滩,越南美食,经济实惠'),
(4, '蓝天碧海号-厦门-冲绳-厦门', '厦门', '/pages/images/cruise4.png', '4天3晚・豪华套房', '2025-09-10', 7299.00, '海岛度假,购物天堂,亲子互动'),
(5, '瀚海星洲号-天津-济州-佐世保(三浦码头)-天津', '天津', '/pages/images/cruise5.png', '6天5晚・标准客房', '2025-08-02', 3700.00, '暑期,第三人儿童免票,限时优惠'),
(6, '澜光溢彩号-上海-济州(西归浦)-福冈-上海', '上海', '/pages/images/cruise6.png', '5天4晚・海景房', '2025-08-09', 3304.15, '暑期,第三/四人船票七折,限时优惠'),
(7, '澜光溢彩号-上海-济州(西归浦)-福冈-上海', '上海', '/pages/images/cruise7.png', '5天4晚・内舱房', '2025-09-28', 1904.50, '赏秋季,第三/四人船票0元,限时优惠');

-- --------------------------------------------------------

--
-- 表的结构 `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `idNumber` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `password`, `idNumber`, `phone`, `email`, `created_at`) VALUES
(1, '北瓜', '698d51a19d8a121ce581499d7b701668', '1646375778695943', '12362646373', 'ngr', '2025-08-08 11:40:19'),
(2, '小孙', 'e10adc3949ba59abbe56e057f20f883e', '645324367658566', '1125434232', 'fdf', '2025-08-08 11:48:49'),
(3, '小李', '96e79218965eb72c92a549dd5a330112', '3243252421112414', '19898365334', 'hdd', '2025-08-08 11:49:54'),
(4, '小王', '$2y$10$dkIagI9aAT8YcoDjgKiX.eOFv', '1285533245324123', '133265475', 'gf', '2025-08-08 11:55:01'),
(5, '小七', '$2y$10$hA9Ir2n7hEh2VakGIpUPE.U1v', '18674323543646345', '143244523', 'gd', '2025-08-08 11:55:28'),
(6, '小琴', '$2y$10$H3WyQJ89pKoVH3uTMuwLb.bMz', '195932497097324', '16849822', 'fcsad', '2025-08-08 12:07:58'),
(7, '小齐', '$2y$10$6kSxKiMzSRx3N6LxBYUj3OuGc', '18566453246757645', '6455745', 'dfg', '2025-08-08 12:23:07'),
(8, '小王八', '$2y$10$4xYAKLBJxka0ptJiWsi6p.NyN', '343543646546454', '343543435', 'gfd', '2025-08-08 12:27:01'),
(9, '小九', '$2y$10$nwaJp9y1E.EOlKyghHWsJOxRx', '19544754453543453', '1654635', 'bf', '2025-08-08 12:42:01'),
(10, '小二', '$2y$10$iuIi93omvkJEkC/AhrOwjeE/3', '12132534753464453', '1534424', 'hrt', '2025-08-08 13:06:22'),
(11, 'testuser', '$2y$10$fVU9qRgyy9khRYSlLd6rUOHnA', '17878347832563984709', '189324732', 'ef', '2025-08-08 13:11:17'),
(12, '鸡蛋', '111111', '17878326589905', '17477921844', 'df', '2025-08-08 13:15:31');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT '自增ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  `user_role` varchar(20) NOT NULL COMMENT '用户角色（如游客、管理员）'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `user_role`) VALUES
(1, '大福', '$2y$10$dSkQDqPtBGvDaZ7IxaR7KeJqb7.MEFhKcB4XxBABWbi', ''),
(2, '靓仔', '$2y$10$MgckCAKk0nURLvrkBwq2neWoDmP0Uhbo6Qmfd2k93b6', '');

--
-- 转储表的索引
--

--
-- 表的索引 `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `checkin_orders`
--
ALTER TABLE `checkin_orders`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `cruises`
--
ALTER TABLE `cruises`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `cruise_activities`
--
ALTER TABLE `cruise_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cruise_id` (`cruise_id`);

--
-- 表的索引 `destination_attractions`
--
ALTER TABLE `destination_attractions`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `hot_activities`
--
ALTER TABLE `hot_activities`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID';

--
-- 使用表AUTO_INCREMENT `checkin_orders`
--
ALTER TABLE `checkin_orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID', AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `cruises`
--
ALTER TABLE `cruises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `cruise_activities`
--
ALTER TABLE `cruise_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID', AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `destination_attractions`
--
ALTER TABLE `destination_attractions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID', AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `hot_activities`
--
ALTER TABLE `hot_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID', AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
