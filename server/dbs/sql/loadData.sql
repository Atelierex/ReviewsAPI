USE sdc;
-- Products 997483 -> 997483
LOAD DATA LOCAL INFILE '../../dataset/cleanProducts.csv' 
INTO TABLE Products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Reviews 5746049 -> 3035048
LOAD DATA LOCAL INFILE '../../dataset/cleanReviews.csv' 
INTO TABLE Reviews 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- -- Characteristics 3331029
LOAD DATA LOCAL INFILE '../../dataset/characteristics.csv' 
INTO TABLE Characteristics 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- -- Characteristic_Reviews 10135129
LOAD DATA LOCAL INFILE '../../dataset/characteristic_reviews.csv' 
INTO TABLE Characteristic_Reviews
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- -- Photos 1420183
LOAD DATA LOCAL INFILE '../../dataset/cleanPhotos.csv' 
INTO TABLE Photos 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;