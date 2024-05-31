CREATE DATABASE `practicayks`;
-- practicayks.candidatos definition

CREATE TABLE `candidatos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Profesion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `LinkedIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Correo` (`Correo`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- practicayks.habilidades definition

CREATE TABLE `habilidades` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- practicayks.candidatosinfo definition

CREATE TABLE `candidatosinfo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `idEmpleado` int DEFAULT NULL,
  `idHabilidad1` int DEFAULT NULL,
  `idHabilidad2` int DEFAULT NULL,
  `idHabilidad3` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `idEmpleado` (`idEmpleado`),
  KEY `idHabilidad1` (`idHabilidad1`),
  KEY `idHabilidad2` (`idHabilidad2`),
  KEY `idHabilidad3` (`idHabilidad3`),
  CONSTRAINT `candidatosinfo_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `candidatos` (`ID`),
  CONSTRAINT `candidatosinfo_ibfk_2` FOREIGN KEY (`idHabilidad1`) REFERENCES `habilidades` (`ID`),
  CONSTRAINT `candidatosinfo_ibfk_3` FOREIGN KEY (`idHabilidad2`) REFERENCES `habilidades` (`ID`),
  CONSTRAINT `candidatosinfo_ibfk_4` FOREIGN KEY (`idHabilidad3`) REFERENCES `habilidades` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;