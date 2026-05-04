-- ==============================================
-- Complaint Management System - MySQL Database
-- ==============================================
-- Run this script in MySQL to create the database
-- ==============================================

CREATE DATABASE IF NOT EXISTS querysolve;
USE querysolve;

-- --------------------------------------------------------
-- Table: employee
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `employee` (
  `username` VARCHAR(20) NOT NULL,
  `password` INT(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: engineer
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `engineer` (
  `email` VARCHAR(30) NOT NULL,
  `password` INT(11) DEFAULT NULL,
  `Type` VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: hod
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hod` (
  `username` VARCHAR(12) NOT NULL,
  `password` INT(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table: complain
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `complain` (
  `complainId` INT(11) NOT NULL,
  `complainType` CHAR(15) DEFAULT NULL,
  `complainDetails` VARCHAR(80) DEFAULT NULL,
  `status` VARCHAR(20) DEFAULT NULL,
  `raisedBy` VARCHAR(30) DEFAULT NULL,
  `solveby` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`complainId`),
  KEY `raisedBy` (`raisedBy`),
  KEY `solvedBy` (`solveby`),
  CONSTRAINT `complain_ibfk_1` FOREIGN KEY (`raisedBy`) REFERENCES `employee` (`username`),
  CONSTRAINT `complain_ibfk_2` FOREIGN KEY (`solveby`) REFERENCES `engineer` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Sample Data
-- --------------------------------------------------------

INSERT IGNORE INTO `employee` (`username`, `password`) VALUES
('emp2@gmail.com', 123123),
('employee1', 111111),
('employee2', 222222),
('employee3', 333333);

INSERT IGNORE INTO `engineer` (`email`, `password`, `Type`) VALUES
('engineer1@example.com', 444444, 'Electrical'),
('engineer2@example.com', 555555, 'Mechanical'),
('engineer3@example.com', 666666, 'Civil'),
('test@gmail.com', 123456, 'HARDWARE');

INSERT IGNORE INTO `hod` (`username`, `password`) VALUES
('hod_user1', 123456),
('hod_user2', 654321);

INSERT IGNORE INTO `complain` (`complainId`, `complainType`, `complainDetails`, `status`, `raisedBy`, `solveby`) VALUES
(1, 'Electrical', 'Power outage in Building A', 'Fixed', 'employee1', 'engineer1@example.com'),
(2, 'Mechanical', 'Air conditioner not working', 'Pending', 'employee2', NULL),
(3, 'Civil', 'Water leakage in office', 'Resolved', 'employee3', 'engineer3@example.com');
