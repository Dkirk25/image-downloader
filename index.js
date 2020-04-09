const path = require('path');
const request = require('request');

const parseHTML = require('./src/services/html-image-link-parser');

const ImageDownloader = require('./src/services/image-downloader');

const outputDir = path.join(__dirname, 'images')

const [,, uri, filename] = process.argv

const downloader = new ImageDownloader(outputDir);

const payload = {
  filename: filename,
  uri: uri
}

request(uri, function(error, response, body) {
  const links = parseHTML(body);

  links.forEach((link, i) => {
  downloader.download({uri: link, filename: `${i}` }, function() {
    console.log('done');
  })
  })
})

