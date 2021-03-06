# Reviews API

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#schema">Schema</a></li>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#goals">Goals</a></li>
    <li><a href="#challenges">Challenges</a></li>
    <li><a href="#optimizations">Optimizations</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#future-improvements">Future Improvements</a></li>
  </ul>
</details>

## About

- Reviews API is the backend infrastructure designed and created from scratch for our client's ecommerce website with the primary goal of improving the website's performance to handle up to 10,000 requests per second and replace the currently outdated system that could not handle large amounts of user traffic to the website.

## Built with

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- Hosted on separated AWS EC2 instances
- k6.io (development evironment stress testing)
- loader.io (production/cloud environment stress testing)
- Integrated with [NewRelic](https://newrelic.com/) to analyze service's average response time, error rate, and throughput.

## Getting Started

1. Clone this repo or fork to your own repo
2. cd into the directory on your local machine
3. Install dependencies

```
npm install
```

4. Start server

```
npm start
```

5. You are connected to a remote MySQL database hosted on AWS EC2 instance and can test out the API endpoints (see <a href="#api-documentation">API documentation</a>)

```
localhost:3000/reviews?product_id=1
```

6. Run tests

```
cd load-tests
```

```
k6 run script.js
```

## Schema

![Schema Image](https://raw.githubusercontent.com/May-Take-A-Second/ReviewsAPI/main/assets/final-sql-schema.png)

## Overview

- Designed and selected two DBMS technologies (**RDBMS** and **NoSQL DBMS**) taking performances and complexity into consideration. Designed a primary database (MySQL) and secondary database (Mongo).
- Performed **Extract, Transform, Load (ETL)** process to transfer a large application dataset into MySQL.
  - **~1 million records of Products**
  - **~5.5 million records of Reviews**
  - **~18 million records of Product's Characteristics Metadata**
  - **~2.5 million records of Reviews Photos**
  - **Designed and created API logic, defined routes expected by the API, integrated server and database.**
- Performed DBMS and Service API stress testing with k6 integrated with New Relic in development environment (local machine).
- Deployed DBMS and API onto separate EC2 instances (t2.micro).
- Performed stress testing with loader.io integrated with New Relic in production environment.
- Scaled the application to handle loads up to 10,000 requests per second (RPS).

## Goals

1. `Response time (latency)`: <2000ms under load.
2. `Throughput`: 1000 RPS on EC2.
3. `Error rate`: <1% under load.

## Challenges

(for more details see [engineering-journal](engineering-journal.md))

### Data ETL

- One of the early challenges that I faced was transforming the given data set to fit into MySQL database schema. Since MySQL does not have built-in `BOOLEAN` type and instead all `TRUE` and `FALSE` value was converted into `0` and stored as `TINYINT`. I had to set `TRUE` and `FALSE` values to `0` and `1` before loading into the database.

### Average Response Time

- I was able to achieve `1000 RPS` on development environment (local machine) with `5-10ms` average response time stress testing with k6. However, when deployed onto AWS EC2 and stress testing with loader.io, I noticed my average response time jumped to `~3500ms` for `1000 RPS`.

- Stress testing (development)
  ![k6 test snapshot](https://raw.githubusercontent.com/May-Take-A-Second/ReviewsAPI/main/assets/k6-ramp-up.png)

- Stress testing (production)
  ![loader.io test snapshot](https://raw.githubusercontent.com/May-Take-A-Second/ReviewsAPI/main/assets/API-load-test-1000-users.png)

## Optimizations

### createPool

- Replaced MySQL createConnection with createPool since it allows for more queries to be executed at the same time whereas createConnection only has a single connection and would affect performance.

### Horizontal Scaling

- To lower my average response time and increase performance, I decided to use `NGINX` as a load balancer with the built-in [Least Connection](https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/#:~:text=With%20the%20Least%20Connections%20method,it%20with%20the%20least_conn%20directive.) method and created 2 more servers on AWS in order to distribute the requests for evenly. With horizontal scaling, I was able to lower my response time from `~3500ms` to `~65ms` for `1000 RPS`.
- Horizontal scaling
  ![horizontal scaling](https://raw.githubusercontent.com/May-Take-A-Second/ReviewsAPI/main/assets/horizontal-scaling.png)
- `~3500ms` -> `~500ms` for `1000 RPS` and `12% error rate` with 2 servers
  ![loader-io-2-servers](https://raw.githubusercontent.com/May-Take-A-Second/ReviewsAPI/main/assets/loader-io-2-servers.png)
- `~500ms` -> `~65ms` for `1000 RPS` and `0% error rate` with 3 servers
  ![loader-io-3-servers](https://raw.githubusercontent.com/May-Take-A-Second/ReviewsAPI/main/assets/loader-io-3-servers.png)
- After 3 servers, I noticed a diminishing returns in response time and concluded `~65ms` is the best I could get from horizontal scaling and that the next step would be `vertical scaling` which costs money.

## API Documentation

### List Reviews

Returns a list of reviews for a particular product. This list does not include any reported reviews.

- GET `/api/reviews`

**Query Parameters:**

- `product_id` Specifies the product for which to retrieve reviews.
- `count` Specifies how many results per page to return. Default 5.
- `sort` Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [
        {
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        }
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": []
    }
  ]
}
```

### Get Review Metadata

- GET `/api/reviews/meta`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
  },
  "recommended": {
    0: 5
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
}
```

### Add a Review

- POST `/api/reviews`

**Body Parameters:**

- `product_id` Required ID of the product to post the review for
- `rating` Integer (1-5) indicating the review rating
- `summary` Summary text of the review
- `body` Continued or full text of the review
- `recommend` Value indicating if the reviewer recommends the product
- `name` Username for question asker
- `email` Email address for question asker
- `photos` Array of text urls that link to images to be shown
- `characteristics` Object of keys representing characteristic_id and values representing the review value for that characteristic.

**Success Status Code:** `201`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
{
  "product_id": 123,
  "rating": 5,
  "summary": "String",
  "body": "String",
  "recommend": true,
  "name": "String",
  "email": "String",
  "photos": [
    {
      "id": 1,
      "url": "urlplaceholder/review_5_photo_number_1.jpg"
    },
    {
      "id": 2,
      "url": "urlplaceholder/review_5_photo_number_2.jpg"
    }
  ]
}
```

### Mark Review as Helpful

- PUT `/api/reviews/:review_id/helpful`

**Path Parameters:**

- `review_id` Required ID of the review to update

**Success Status Code:** `204`

### Report Review

- PUT `/api/reviews/:review_id/report`

**Path Parameters:**

- `review_id` Required ID of the review to update

**Success Status Code:** `204`

## Future Improvements

- Dockerize server for easier deployment.
- Implement Redis caching.
- Explore vertical scaling & other options.
