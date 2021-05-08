const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function cleanReviews() {
  const source = path.join(__dirname, '../../../dataset/reviews.csv');
  const destination = path.join(__dirname, '../../../dataset/cleanReviews.csv');
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);
  outStream.write('id,product_id,rating,review_date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness\n');

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
    // parse review date to correct timestamp format
    row[3] = parseDate(row[3]);
    if (row[3] === null || row[3].length === 0) return; 
    // summary should not be over 500 characters
    if (row[4].length > 500) return;
    // body should not be over 1000 characters
    if (row[5].length > 1000) return;
    // recommend should be a boolean (true, false)
    if (row[6].toLowerCase() !== 'true' && row[6].toLowerCase() !== 'false') return;
    // reported should be a boolean (true, false)
    if (row[7].toLowerCase() !== 'true' && row[7].toLowerCase() !== 'false') return;
    // reviewer_name should not be null or over 60 characters
    if (row[8] === null || row[8].length > 60) return;
    // reviewer_email should not be null or over 60 characters
    if (row[9] === null || row[9].length > 60) return;
    // response should not be over 100 characters
    if (row[10].length > 100) return;
    // helpfulness should not be negative
    if (isNaN(row[11]) || row[11] < 0) return;

    outStream.write(`${row.join()}\n`);
  })
}

function parseDate(date) {
  const dateAsInteger = parseInt(date);
  formattedDate = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
  return formattedDate.toString() === 'Invalid Date' ? null : formattedDate.toISOString().slice(0, 19).replace('T', ' ');;
  // const review_date = new Date(Number(date)).toISOString().slice(0, 19).replace('T', ' ');
  // return review_date;
}

cleanReviews();