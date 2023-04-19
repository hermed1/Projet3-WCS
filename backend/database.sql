-- -- Active: 1678793133666@@127.0.0.1@3306@salesforce
-- CREATE TABLE item (
--   id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   title varchar(255) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema salesforce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema salesforce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `salesforce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `salesforce` ;

-- -----------------------------------------------------
-- Table `salesforce`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`company` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `nSiret` VARCHAR(45) NOT NULL,
  `creationDate` DATE NOT NULL,
  `companyLogo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`category` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `companyCategoryId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `company_category_id_idx` (`companyCategoryId` ASC) VISIBLE,
  CONSTRAINT `companyCategoryId`
    FOREIGN KEY (`companyCategoryId`)
    REFERENCES `salesforce`.`company` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`pictureStorage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`pictureStorage` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`pictureStorage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `picture` VARCHAR(255) NOT NULL,
  `companyId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `company_picture_id_idx` (`companyId` ASC) VISIBLE,
  CONSTRAINT `companyPictureId`
    FOREIGN KEY (`companyId`)
    REFERENCES `salesforce`.`company` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`idea`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`idea` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`idea` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(120) NOT NULL,
  `text` VARCHAR(4000) NOT NULL,
  `createDate` DATE NOT NULL,
  `companyId` INT NOT NULL,
  `pictureId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `picture_id_idx` (`pictureId` ASC) VISIBLE,
  INDEX `company_idea_id_idx` (`companyId` ASC, `pictureId` ASC) VISIBLE,
  CONSTRAINT `pictureid`
    FOREIGN KEY (`pictureId`)
    REFERENCES `salesforce`.`pictureStorage` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`commentary`
... (163 lignes restantes)
