const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function cleanReviews() {
  const source = path.join(__dirname, '../../../dataset/reviews.csv');
  const destination = path.join(__dirname, '../../../dataset/cleanReviews.csv');
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);
  outStream.write('id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity // \r and \n will always be considered a single newline
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    // check if row.length has all the fields (length = 12)
    if (row.length !== 12) return;
    // id and product_id should be positive number
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    // rating should be in range 1 and 5
    if (isNaN(row[2]) || row[2] < 1 || row[2] > 5) return;
    // date must be in this format: epoch 13 digits, number
    if (isNaN(row[3]) || row[3].length !== 13) return;
    // summary should not be over 50 characters or less than 2, not a boolean
    if (row[4].length > 50 || row[4].length < 2) return;
    // body should not be over 1000 characters or less than 50, not a boolean
    if (row[5].length > 1000 || row[5].length < 50) return;
    // recommend should be a boolean (true, false, 0, 1)
    if (row[6] !== 'true' && row[6] !== 'false' && row[6] != 1 && row[6] != 0) return;
    // reported should be a boolean (true, false, 0, 1)
    if (row[7] !== 'true' && row[7] !== 'false' && row[7] != 1 && row[7] != 0) return;
    // reviewer_name should not be null or over 30 characters
    if (row[8] === null || row[8].length > 30) return;
    // reviewer_email should not be null or over 60 characters
    if (row[9] === null || row[9].length > 60) return;
    // response should not be over 100 characters
    if (row[10].length > 100) return;
    // helpfulness should not be negative
    if (isNaN(row[11]) || row[11] < 0) return;

    outStream.write(`${line}\n`);
  })
}

cleanReviews();