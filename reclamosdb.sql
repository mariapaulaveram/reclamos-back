-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: reclamosdb
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encuesta` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `vecino_id` int NOT NULL,
  `satisfaccion` int DEFAULT NULL,
  `comentario` text,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `chk_satisfaccion` CHECK ((`satisfaccion` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuesta`
--

LOCK TABLES `encuesta` WRITE;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` VALUES (1,7,4,'Buena atención y seguimiento del caso.','2025-09-12 20:18:18'),(2,7,1,'Muy lento el sistema, se colgó varias veces.','2025-09-12 20:18:23'),(3,7,4,'Buena atención y seguimiento del caso.','2025-09-12 20:37:56'),(4,7,1,'Muy lento el sistema, se colgó varias veces.','2025-09-12 20:37:57'),(5,7,2,'Muy lento el sistema, se colgó varias veces.','2025-09-12 20:38:06'),(6,7,5,'Buena atención y seguimiento del caso.','2025-09-12 20:42:15'),(7,7,1,'Muy lento el sistema, se colgó varias veces.','2025-09-12 20:44:04'),(8,7,2,'Me gustaría recibir más información sobre el estado del reclamo','2025-09-12 21:04:01'),(9,7,5,'Buena atención y seguimiento del caso.','2025-09-12 21:59:50'),(10,3,5,'Recibí respuesta en poco tiempo, excelente servicio','2025-09-14 11:59:17'),(11,7,4,'Buena atención y seguimiento del caso.','2025-09-14 12:15:08'),(12,7,4,'Recibí respuesta en poco tiempo, excelente servicio','2025-09-14 12:32:00'),(13,7,2,'Muy lento el sistema, se colgó varias veces.','2025-09-14 12:37:15'),(14,7,3,'Valoro el esfuerzo del municipio, pero sería ideal contar con mayor rapidez en la atención y más canales de comunicación directa con los vecinos','2025-09-14 21:45:17');
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamos`
--

DROP TABLE IF EXISTS `reclamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descripcion` text,
  `direccion` varchar(255) DEFAULT NULL,
  `imagen_url` text,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `vecino_id` int DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `comentarios` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vecino` (`vecino_id`),
  CONSTRAINT `fk_vecino` FOREIGN KEY (`vecino_id`) REFERENCES `vecinos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos`
--

LOCK TABLES `reclamos` WRITE;
/*!40000 ALTER TABLE `reclamos` DISABLE KEYS */;
INSERT INTO `reclamos` VALUES (6,'Lisa ','Simpson','lisa@mail.com','recoleccion','\"Hay acumulación de plásticos, latas y envases en la calle. Pido revisión del área.\"','Lorem Ipsum 321','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757093775/reclamos/k4r3tthizeb8ncapsjxg.jpg','2025-09-05 17:36:15',3,'Cerrado','Sin comentarios'),(7,'Lisa ','Simpson','lisa@mail.com','basural','\"Se observan restos de comida y residuos orgánicos en la vía pública. Solicito intervención.\"','Av Lorem 596','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757094696/reclamos/cipyn1ssil1ba1dfpolv.avif','2025-09-05 17:51:37',3,'Resuelto','Sin comentarios'),(11,'Homero','Simpson','homero@mail.com','basural','Solicito la limpieza urgente de un microbasural  donde se acumulan residuos que afectan la salud y el entorno. Pido también que se tomen medidas para evitar que se siga arrojando basura en ese lugar.','Calle Ipsum 852','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757262834/reclamos/thzqryekt7zdb06pxbpu.jpg','2025-09-07 16:33:56',1,'En proceso','Debido a condiciones climáticas, el trabajo fue reprogramado. Le pedimos disculpas por la demora'),(12,'Maguie','Simpson','maguie@mail.com','ramas','Solicito la recolección de restos de poda acumulados en la vía pública. Están obstruyendo el paso y afectan la limpieza del entorno.','Lorem Ipsum 214','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757267247/reclamos/fw8j58bpe1fafzin80ny.jpg','2025-09-07 17:47:29',4,'En revision','Sin comentarios'),(13,'Marge','Simpson','marge@mail.com','recoleccion','Hay cartones abandonados en la vía pública. Obstruyen el paso y generan suciedad. Solicito que se retiren lo antes posible.','Calle Lorem 854','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757271014/reclamos/jcvrkfwtnqvizgp0oufc.jpg','2025-09-07 18:50:16',2,'En proceso','La cuadrilla municipal realizara la reparación correspondiente. Quedamos atentos a cualquier otra necesidad	'),(18,'Homero','Simpson','homero@mail.com','ramas','Hay ramas grandes obstruyendo la vereda en la esquina de Av. Siempreviva y Calle Falsa.','Av. Siempreviva 742','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757365449/reclamos/rvtqgdk7xqja0hqze8mh.jpg','2025-09-08 21:04:09',1,'Cargado','Sin comentarios'),(19,'Maguie','Simpson','maguie@mail.com','recoleccion','Los contenedores en la cuadra están desbordados desde hace tres días. No se ha realizado la recolección habitual.','Calle Falsa 123','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757366621/reclamos/xlmwzeljeavlpmwlwca2.jpg','2025-09-08 21:23:41',4,'En proceso','Sin comentarios'),(20,'Ned','Flanders','ned@mail.com','basural','Basural que está generando olores, plagas y mucha preocupación entre los vecinos. Urge una limpieza para recuperar el espacio y evitar riesgos para la salud.','Calle Falsa 321','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757414412/reclamos/gmlkhxvpouiw3ycki19m.jpg','2025-09-09 10:40:14',6,'En proceso','La cuadrilla municipal realizara la reparación correspondiente. Quedamos atentos a cualquier otra necesidad'),(21,'Lisa','Simpson','lisa@mail.com','basural','Basural que está generando olores, plagas y mucha preocupación entre los vecinos.','Calle Falsa 965','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757593050/reclamos/myfpfvxn0zotagsqyudr.jpg','2025-09-11 12:17:31',3,'Nuevo','Sin comentarios'),(26,'Maria Paula','Vera','maria@mail.com','basural','basura acumulada','calle Falsa 987','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757694448/reclamos/joysnypnxhqsjovgihrb.jpg','2025-09-12 16:27:28',7,'Nuevo','Sin comentarios'),(29,'Maria Paula','Vera','maria@mail.com','ramas','Ramas que impiden el transito ','Calle Falsa 852','https://res.cloudinary.com/dvjpxwksq/image/upload/v1757700822/reclamos/xmc5tsmntnrfazbucunl.jpg','2025-09-12 18:13:42',7,'Nuevo','Sin comentarios');
/*!40000 ALTER TABLE `reclamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (8,'admin','c93ccd78b2076528346216b3b2f701e6'),(9,'Felix','7b7a53e239400a13bd6be6c91c4f6c4e');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vecinos`
--

DROP TABLE IF EXISTS `vecinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vecinos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vecinos`
--

LOCK TABLES `vecinos` WRITE;
/*!40000 ALTER TABLE `vecinos` DISABLE KEYS */;
INSERT INTO `vecinos` VALUES (1,'Homero','Simpson','homero@mail.com','1234'),(2,'Marge','Simpson','marge@mail.com','1234'),(3,'Lisa','Simpson','lisa@mail.com','1234'),(4,'Maguie','Simpson','maguie@mail.com','1234'),(5,'Montgomery','Burns','burns@mail.com','1234'),(6,'Ned','Flanders','ned@mail.com','1234'),(7,'Maria Paula','Vera','maria@mail.com','1234');
/*!40000 ALTER TABLE `vecinos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-15  7:18:22
