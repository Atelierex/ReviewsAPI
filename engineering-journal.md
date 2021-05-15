# 5/3/2021

- Learned about SDC, ETL, best practices, Horizontal scaling vs Vertical scaling.
- Database decision: choose between MySQL (HIGHLY RECOMMENDED - easier to start but queries will grows in complexity, used in many fields and by many different other disciplines other than software engineering) vs Mongo (harder to start but queries grow less in complexity, Mongo is easier for horizontal scaling)
- ETL - Extract, Transform, Load: MySQL has docs on LOAD DATA, ETL will be easier than Mongo, consecutive async queries can reduce complexity
- Look in csv-parse, keep cleaning/transforming process scalable
- Consider ELT instead of ETL - having a temporary database and then transform that into a final database
- Look into MySQL: Database **`normalization`** (3NF)
- Check out System Design Primer (read example solutions for Pastebin/Bit.ly, scaling AWS)
- Choose between Postgres vs MySQL

# 5/4/2021

- Decision: whether or not to use Docker for SDC. Docker makes deployment easier but it has performance implication (uses extra space) Docker could hog up 10 if not 100gb of computer storage when it creates images.
- Documented Reviews API endpoints and added SQL schema to github repo.

# 5/5/2021

- Finalized schema & schema.sql for MySQL database
- Load schema into mySQL database
- Added raw (uncleaned) data into mySQL database to have a better visualization and started doing some queries.

# 5/6/2021

- Finished cleaning up dataset and started loading into mySQL database
- Encountered `The total number of locks exceeds the lock table size` problem when importing `characteristic_reviews` dataset with over `19 millions` records but was able to resolve it by increasing the lock table size in mySQL. `SET GLOBAL innodb_buffer_pool_size=2147483648;`
- Some of the data are deleted based on not satisfying the schema model of length

# 5/7/2021

- Continued working on loading data into MySQL database.
- Data validation done. Finalized MySQL schema.
- Created a helper function to convert epoch time into timestamp in the cleaned csv file while doing data ETL process. (thanks Praneeth for the useful code snippet)

```sql
new Date().toISOString().slice(0, 19).replace('T', ' ');
```

- Able to store review_date as timestamp in reviews table in database.
- Started working on creating the API

# 5/8/2021

- Increased VARCHAR length to hold more valid data
- Implemented Model for Reviews GET and POST route.
- Building out server files structure in MVC architecture to achieve separation of concerns.

# 5/9/2021

- Implemented Model for Reviews metadata, helpful, and report endpoint.
- Implemented controllers for GET and POST reviews, GET metadata, PUT helpful, PUT report.
- Implemented routes for server

# 5/10/2021

- Refactored SELECT query for GET reviews in order to get the Photos array in the format the original Reviews API have. The old query returns multiple review with the same id with different photo urls. Was able to resolve this issue by using `GROUP_CONCAT` for the photo_url and photo_id in the SELECT query and then split them in the GET reviews controller.
- Realized that `recommended` and `reported` value are always 0 in the database. Did some research and found out that mySQL does not have a built-in `BOOLEAN` type and it is default to `TINYINT` instead (0, 1). Currently the value for `recommended` and `reported` are stored as `TRUE` or `FALSE` in the CSV file and I needed to `SET recommend = IF(@var1="true",1,0), reported = IF(@var2="true",1,0);` when loading the CSV file into the database.

# 5/11/2021

- Decision: choose between K6 and Artillery for load and stress testing the newly created API. Decided to go with K6 since the documentation is well written and overall easy to integrate into the current working directory.
- Tried different types of tests that K6 provided to stress test API performance under load. The RPS varied each time I ran the test but overall the average RPS currently is around 720 RPS.
- Tried the `constant-arrival-rate` test provided by K6, I was able to get to 972 RPS.

# 5/12/2021

- Deployed both my API and DBMS to separate EC2 instances. The API deployment was smooth but ran into quite the trouble trying to load data into mySQL for the DBMS EC2 instance.
- List of problems that I ran into:
  - Write failed: Broken pipe
  - MySQL/Writing file error (Errcode 28). "No Space Left On Device"
  - Mysql error 1452 - Cannot add or update a child row: a foreign key constraint fails
  - SSH error: Connection closed by host port 22
  - ...
- Since working with limited resources and storage, in order to load data into mySQL on the EC2 instance and not getting connection timeout, I had to split the Reviews csv file into multiple csv files with `split -l 500000 cleanReviews.csv` which would split the original csv file every 500k rows and then add the `.csv` extension for them with `for i in *; do mv "$i" "$i.csv"; done`.
- I also had to continuously monitor the total storage of the EC2 instance and delete the csv file every time I successfully loaded 1 into the database since I only have a total of 7.7gb available space to spare and I was constantly hovering around 700mb available total storage.

# 5/13/2021

- Apparently 7.7gb was not enough to load all the data into mySQL on my DBMS EC2 instance (was able to load all the tables except characteristic_reviews as I somehow ran out of storage space) so I had to increase the volume size to 20gb on AWS console and then extend the OS file system on the EC2 instance by extending the partition and the volume in the terminal.

[Increase the size of EBS volume in your EC2 instance](https://medium.com/@m.yunan.helmy/increase-the-size-of-ebs-volume-in-your-ec2-instance-3859e4be6cb7)

- Finished ETL process on my DBMS EC2 instance.
- Configured security group inbound rules in order to allow communication between my API service and DBMS on EC2. Able to make requests to all of the defined endpoints.
- Stress tested the initial performance of the application on the cloud using [loader.io](http://loader.io). Slowly scaling the RPS from `10, 100, to 1000`. Unsurprisingly, the average response time for 1000 clients `(~3000ms)` was abysmal as compared to the average response time on my local machine `(~5-10ms)`.
- Did some research on load balancing and decided to do more in-depth investigation on `NGINX` load balancer in order to hopefully improve the average response time on production environment.
