-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Reviews'
-- List of reviews
-- ---

DROP TABLE IF EXISTS `Reviews`;
		
CREATE TABLE `Reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `rating` TINYINT NOT NULL DEFAULT NULL,
  `summary` MEDIUMTEXT(50) NULL DEFAULT NULL,
  `recommend` BOOLEAN NOT NULL,
  `response` MEDIUMTEXT NULL DEFAULT NULL,
  `body` MEDIUMTEXT NULL DEFAULT NULL,
  `date` DATETIME NOT NULL DEFAULT 'NULL',
  `reviewer_name` VARCHAR(20) NULL DEFAULT NULL,
  `reviewer_email` VARCHAR NULL DEFAULT NULL,
  `helpfulness` TINYINT NULL DEFAULT NULL,
  `product_id` INTEGER NOT NULL DEFAULT NULL,
  `reported` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
)

-- ---
-- Table 'Product'
-- 
-- ---

DROP TABLE IF EXISTS `Product`;
		
CREATE TABLE `Product` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'characteristics_review'
-- Characteristics about the product being reviewed. Part of the Reviews metadata
-- ---

DROP TABLE IF EXISTS `characteristics_review`;
		
CREATE TABLE `characteristics_review` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `review_id` INTEGER NULL DEFAULT NULL,
  `characteristic_id` INTEGER NOT NULL DEFAULT NULL,
  `value` VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
)

-- ---
-- Table 'characteristics_product'
-- 
-- ---

DROP TABLE IF EXISTS `characteristics_product`;
		
CREATE TABLE `characteristics_product` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NOT NULL DEFAULT NULL,
  `characteristic_id` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'characteristics'
-- 
-- ---

DROP TABLE IF EXISTS `characteristics`;
		
CREATE TABLE `characteristics` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `characteristic` VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
-- Photos array of a review
-- ---

DROP TABLE IF EXISTS `Photos`;
		
CREATE TABLE `Photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR NULL DEFAULT NULL,
  `review_id` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id) REFERENCES `Product` (`id`);
ALTER TABLE `characteristics_review` ADD FOREIGN KEY (review_id) REFERENCES `Reviews` (`id`);
ALTER TABLE `characteristics_review` ADD FOREIGN KEY (characteristic_id) REFERENCES `characteristics` (`id`);
ALTER TABLE `characteristics_product` ADD FOREIGN KEY (product_id) REFERENCES `Product` (`id`);
ALTER TABLE `characteristics_product` ADD FOREIGN KEY (characteristic_id) REFERENCES `characteristics` (`id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (review_id) REFERENCES `Reviews` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics_review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics_product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Reviews` (`id`,`rating`,`summary`,`recommend`,`response`,`body`,`date`,`reviewer_name`,`reviewer_email`,`helpfulness`,`product_id`,`reported`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `Product` (`id`) VALUES
-- ('');
-- INSERT INTO `characteristics_review` (`id`,`review_id`,`characteristic_id`,`value`) VALUES
-- ('','','','');
-- INSERT INTO `characteristics_product` (`id`,`product_id`,`characteristic_id`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`characteristic`) VALUES
-- ('','');
-- INSERT INTO `Photos` (`id`,`url`,`review_id`) VALUES
-- ('','','');