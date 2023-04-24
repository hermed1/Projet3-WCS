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

-- CREATE TABLE IF NOT EXISTS `salesforce`.`company` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `companyName` VARCHAR(150) NOT NULL,
--   `nSiret` VARCHAR(45) NOT NULL,
--   `creationDate` DATE NOT NULL,
--   `companyLogo` VARCHAR(255) NOT NULL,
--   `contactPerson` VARCHAR(45) NOT NULL,
--   `email` VARCHAR(45) NOT NULL,
--   `phone` VARCHAR(45) NULL DEFAULT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB
-- AUTO_INCREMENT = 2
-- DEFAULT CHARACTER SET = utf8mb4
-- COLLATE = utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS `salesforce`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `companyName` VARCHAR(150) NOT NULL,
  `nSiret` VARCHAR(45) NOT NULL,
  `creationDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `contactPerson` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `companyLogo` VARCHAR(255) DEFAULT NULL,
  
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
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`commentary` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`commentary` (
  `id` INT NOT NULL,
  `text` VARCHAR(2000) NOT NULL,
  `createDate` DATE NOT NULL,
  `ideaCommentaryId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idea_commentary_id_idx` (`ideaCommentaryId` ASC) VISIBLE,
  CONSTRAINT `ideaCommentaryId`
    FOREIGN KEY (`ideaCommentaryId`)
    REFERENCES `salesforce`.`idea` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`role` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`subCategory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`subCategory` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`subCategory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `categoryId` INT NOT NULL,
  `pictureId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `subcategory_category_id_idx` (`categoryId` ASC) VISIBLE,
  INDEX `subcategory_picture_id_idx` (`pictureId` ASC) VISIBLE,
  CONSTRAINT `subcategoryCategoryId`
    FOREIGN KEY (`categoryId`)
    REFERENCES `salesforce`.`category` (`id`),
  CONSTRAINT `subcategoryPictureId`
    FOREIGN KEY (`pictureId`)
    REFERENCES `salesforce`.`pictureStorage` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`subCommentary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`subCommentary` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`subCommentary` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(2000) NULL DEFAULT NULL,
  `createDate` DATE NULL DEFAULT NULL,
  `subCommentaryCommentaryId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `commentarySubCommentaryId_idx` (`subCommentaryCommentaryId` ASC) VISIBLE,
  CONSTRAINT `commentarySubCommentaryId`
    FOREIGN KEY (`subCommentaryCommentaryId`)
    REFERENCES `salesforce`.`commentary` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`team` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `companyId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `team_company_id_idx` (`companyId` ASC) VISIBLE,
  CONSTRAINT `teamCompanyId`
    FOREIGN KEY (`companyId`)
    REFERENCES `salesforce`.`company` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`user` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `dateOfBirth` DATE NULL DEFAULT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `liked` TINYINT NULL DEFAULT NULL,
  `profilePicture` VARCHAR(255) NULL DEFAULT NULL,
  `creationDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `roleId` INT NOT NULL DEFAULT '1',
  `teamId` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `role_id_idx` (`roleId` ASC) VISIBLE,
  INDEX `user_team_id_idx` (`teamId` ASC) VISIBLE,
  CONSTRAINT `teamUserId`
    FOREIGN KEY (`teamId`)
    REFERENCES `salesforce`.`team` (`id`),
  CONSTRAINT `userRoleId`
    FOREIGN KEY (`roleId`)
    REFERENCES `salesforce`.`role` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`userCommentary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`userCommentary` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`userCommentary` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `like` TINYINT NULL DEFAULT NULL,
  `postCreator` VARCHAR(100) NOT NULL,
  `commmentaryId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_commentary_user_id_idx` (`userId` ASC) VISIBLE,
  INDEX `user_commentary_commentary_id_idx` (`commmentaryId` ASC) VISIBLE,
  CONSTRAINT `userCommentaryCommentaryId`
    FOREIGN KEY (`commmentaryId`)
    REFERENCES `salesforce`.`commentary` (`id`),
  CONSTRAINT `userCommentaryUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `salesforce`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `salesforce`.`userIdea`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `salesforce`.`userIdea` ;

CREATE TABLE IF NOT EXISTS `salesforce`.`userIdea` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `like` TINYINT NOT NULL,
  `postCreator` VARCHAR(100) NOT NULL,
  `ideaId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idea_user_id_idx` (`ideaId` ASC) VISIBLE,
  INDEX `user_idea_id_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `ideaUserId`
    FOREIGN KEY (`ideaId`)
    REFERENCES `salesforce`.`idea` (`id`),
  CONSTRAINT `userIdeaId`
    FOREIGN KEY (`userId`)
    REFERENCES `salesforce`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
