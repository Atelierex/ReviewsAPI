USE sdc;
-- Products 997483
LOAD DATA LOCAL INFILE '../../dataset/product.csv' 
INTO TABLE Products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Reviews 5746049
-- LOAD DATA LOCAL INFILE '../../dataset/reviews.csv' 
-- INTO TABLE Reviews 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- -- Characteristics 3331029
-- LOAD DATA LOCAL INFILE '../../dataset/characteristics.csv' 
-- INTO TABLE Characteristics 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- -- Characteristic_Reviews
-- LOAD DATA LOCAL INFILE '../../dataset/characteristic_reviews.csv' 
-- INTO TABLE Characteristic_Reviews 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- -- Photos
-- LOAD DATA LOCAL INFILE '../../dataset/reviews_photos.csv' 
-- INTO TABLE Photos 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;