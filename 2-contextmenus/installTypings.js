var https = require('https');
var fs = require('fs');

function download(filename, url) {
  var file = fs.createWriteStream(filename);
  var request = https.get(url, function(response) {
    response.pipe(file);
  });
}

console.log('Downloading sqlops proposed typings');
download('src/typings/sqlops.proposed.d.ts', 'https://raw.githubusercontent.com/Microsoft/azuredatastudio/master/src/sql/sqlops.proposed.d.ts');