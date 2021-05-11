const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function cleanPhotos() {
  const source = path.join(__dirname, '../../../dataset/reviews_photos.csv');
  const destination = path.join(__dirname, '../../../dataset/cleanPhotos.csv');
  const inStream = fs.createReadStream(source);
  const outStream = fs.createWriteStream(destination);
  outStream.write('id,review_id,url\n');

  const rl = readline.createInterface({
    input: inStream,
    output: outStream,
    crlfDelay: Infinity // \r and \n will always be considered a single newline
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    // check if row.length has all the fields (length = 3)
    if (row.length !== 3) return;
    // id and review_id must be positive number
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    // check valid url
    if (!isValidUrl(row[2])) return;

    outStream.write(`${line}\n`);
  })
}

// references: https://www.tutorialspoint.com/How-to-validate-URL-address-in-JavaScript
function isValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  let url = str;
  if (str[0] === '"' && str[str.length - 1] === '"') {
    url = str.substring(1, str.length - 1);
  }
  return !!pattern.test(url);
}

cleanPhotos();