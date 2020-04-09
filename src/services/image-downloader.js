const fs = require('fs');
const request = require('request');
const path = require('path');

class ImageDownloader {
  outputDir;
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.download.bind(this);
  }

  download(opts, callback) {
    if (!this.outputDir) {
      throw new Error('No Output Directory')
    } else {
      console.log('Output Dir:', this.outputDir)
      if (!fs.existsSync(this.outputDir)) {
        console.log("Created output directory", this.outputDir);
        fs.mkdirSync(this.outputDir);
      }
    }

    const {filename, uri} = opts;
    
    
    request.head(uri, (err, res, body) => {
      console.log('Res Headers', res.headers);
      const type = res.headers['content-type'];

      const ext = type === 'image/jpg' || type === 'image/jpeg' ? '.jpg' : '.png';

      const stream = fs.createWriteStream(path.join(this.outputDir, filename + ext));
      request(uri).pipe(stream).on('close', callback);
    });
  }; 
}

module.exports = ImageDownloader;