USE sdc;
-- Products 997483 -> 997483
LOAD DATA LOCAL INFILE '../../dataset/cleanProducts.csv' 
INTO TABLE Products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Reviews 5746049 -> 5390118
LOAD DATA LOCAL INFILE '../../dataset/cleanReviews.csv' 
INTO TABLE Reviews 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id,product_id,rating,review_date,summary,body,@var1,@var2,reviewer_name,reviewer_email,response,helpfulness)
SET recommend = IF(@var1="true",1,0), reported = IF(@var2="true",1,0);

-- -- Characteristics 3339443 -> 3331029
LOAD DATA LOCAL INFILE '../../dataset/characteristics.csv' 
INTO TABLE Characteristics 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- -- Characteristic_Reviews 19327576 -> 17995853
LOAD DATA LOCAL INFILE '../../dataset/characteristic_reviews.csv' 
INTO TABLE Characteristic_Reviews
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- -- Photos 2701624 -> 2521651
LOAD DATA LOCAL INFILE '../../dataset/cleanPhotos.csv' 
INTO TABLE Photos 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;