-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: exchangerdb
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `categoryname` (`categoryname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (5,'Book'),(1,'Craft Item'),(4,'Electronic'),(3,'Furniture'),(2,'Sports item');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expectedproduct`
--

DROP TABLE IF EXISTS `expectedproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expectedproduct` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `categoryid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `user_category` (`userid`,`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expectedproduct`
--

LOCK TABLES `expectedproduct` WRITE;
/*!40000 ALTER TABLE `expectedproduct` DISABLE KEYS */;
INSERT INTO `expectedproduct` VALUES (1,1,2),(2,2,4),(9,4,1),(4,5,2),(5,7,5),(6,8,2);
/*!40000 ALTER TABLE `expectedproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` text NOT NULL,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `categoryid` int NOT NULL,
  `productTitle` text NOT NULL,
  `productDescription` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,1,'Paint brush set','Fresh condition. Not used yet'),(2,1,3,'Table','Used for 2 years. Little dents and no problems.'),(3,2,2,'Reebok Cricket Bat','Single small dent and no other problems'),(4,2,3,'Ergonomic Char','No issues used with care'),(5,4,2,'Deer Football','Did not used much almost intact'),(6,4,5,'Harry Potter','Harry Potter and the Philosopher\'s Stone'),(7,5,4,'Corsair Vengeance 8GB Ram','No issues'),(8,5,5,'The Lord of the Rings','\'The Lord of the Rings\' by J. R. R. Tolkien.'),(9,7,4,'Samsung 980 Pro 250GB SSD','Still 87% lifetime remaining. No issues. '),(10,7,1,'Mont Marte Acrylic Color Paint Set','10 pieces still intact remaining 8 were used half'),(11,8,1,'Marie’s Masking Fluid Gum','Never used still intact.'),(12,8,5,'The Alchemist ','The Alchemist by Paulo Coelho fantasy book');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `reviewerid` int NOT NULL,
  `content` text NOT NULL,
  `positive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,4,'Had a great experience with this seller! Fast communication, item exactly as described, and quick delivery. Highly recommended and would definitely buy from again. Thank you!',1),(2,7,4,'Excellent seller! Super friendly and responsive, and the item arrived in perfect condition. Smooth transaction from start to finish—would gladly do business with them again!',1),(3,8,4,'Disappointing experience. Slow communication, item was not as described, and delivery took much longer than expected. Would not recommend.',0),(4,4,1,'Wonderful transaction! Seller was prompt, item was exactly as pictured, and everything went smoothly. Very happy with the purchase and would definitely recommend!',1),(5,5,2,'Unfortunately, not a good experience. Item wasn’t as described, and the seller was unresponsive to messages. Definitely wouldn’t recommend.',1),(6,2,5,'Amazing seller! Quick responses, fair pricing, and the item was in perfect condition. Smooth and easy transaction—would happily buy again!',1),(7,4,7,'Not a great experience. The item arrived in poor condition, and communication was difficult. Wouldn’t recommend based on this transaction.',0),(8,4,8,'Fantastic seller! The item was exactly as described, arrived quickly, and the seller was friendly and responsive throughout. Highly recommend!',1),(9,2,1,'Amazing experience! The exchange went smoothly, and both items were exactly as described. Great communication and super fast shipping. Highly recommend this platform for hassle-free trades!',1),(10,5,1,'Disappointing experience. The exchange was confusing, and the item I received was not as described. Communication with the other party was slow, and shipping took longer than expected. Would not recommend using this platform for exchanges',0),(11,7,1,'Very frustrating experience. The item I received was damaged and not what was promised. Communication was poor, and it took way too long to resolve the issue. I wouldn\'t recommend this platform for exchanges.',0),(12,8,1,'Great experience! The exchange was quick and seamless, and the item I received was exactly as described. The process was easy, and the communication was excellent. Definitely recommend for hassle-free trades!',1),(13,1,2,'Great experience! The exchange was quick and seamless, and the item I received was exactly as described. The process was easy, and the communication was excellent. Definitely recommend for hassle-free trades!',1),(14,4,2,'Fantastic exchange experience! The item was exactly as described, and everything went smoothly from start to finish. The process was simple, and the communication was excellent. Highly recommend!',1),(15,5,2,'Very disappointing experience. The item I received was not as described, and there was a lack of communication throughout the process. Shipping took longer than expected, and I would not trust this platform for future exchanges.',0),(16,7,2,'Excellent exchange experience! The item was in perfect condition and exactly as described. Communication was fast and friendly, and everything went smoothly. I’ll definitely be using this platform again!',1),(17,8,2,'Very poor experience. The item I received was damaged and not as described. Communication was slow, and resolving the issue took much longer than expected. I wouldn\'t recommend this platform for exchanges.',0),(18,2,5,'Extremely frustrating experience. The item I received was completely different from what was promised, and the seller was unresponsive. Shipping was delayed, and it took far too long to resolve the issue. Definitely not using this platform again.',1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Person1','123456','Uttara, Dhaka-1230, Bangladesh','person1@gmail.com','01944306494'),(2,'Person2','123456','Natun Bazaar, Dhaka','person2@gmail.com','01621887792'),(4,'Person3','123456','Dhaka Cantonment, Dhaka','person3@gmail.com','01559217726'),(5,'Person4','123456','Dhaka Cantonment, Dhaka','person4@gmail.com','01310684528'),(7,'Person5','123456','Mohakhali amtoli, Dhaka','person5@gmail.com','01985844229'),(8,'Person6','123456','Manikdi Bazar Road, Dhaka','person6@gmail.com','01787731146');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-15 18:48:03
