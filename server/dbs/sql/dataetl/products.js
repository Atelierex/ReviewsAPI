const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function productsETL() {
  const source = path.join(__dirname, '../../../dataset/product.csv');
  const destination = path.join(__dirname, '../../../dataset/cleanProduct.csv');
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity // \r and \n will always be considered a single newline
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    // check if product id is a positive number
    if (isNaN(row[0] || row[0] < 1)) return;
    outStream.write(`${row[0]}\n`);
  })
}

productsETL();