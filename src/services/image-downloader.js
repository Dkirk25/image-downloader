const fs = require("fs");
const request = require("request");
const path = require("path");

class ImageDownloader {
  outputDir;
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.download.bind(this);

    console.log("Output Dir:", this.outputDir);
  }

  download(opts, callback) {
    if (!this.outputDir) {
      throw new Error("No Output Directory");
    } else {
      if (!fs.existsSync(this.outputDir)) {
        console.log("Created output directory", this.outputDir);
        fs.mkdirSync(this.outputDir);
      }
    }

    const { filename, uri } = opts;

    request.head(uri, (err, res, body) => {
      const type = res.headers["content-type"];

      const ext =
        type === "image/jpg" || type === "image/jpeg" ? ".jpg" : ".png";

      const file = filename + ext;
      const stream = fs.createWriteStream(path.join(this.outputDir, file));
      request(uri)
        .pipe(stream)
        .on("close", () => {
          if (callback) {
            callback(undefined, file);
          }
        });
    });
  }
}

module.exports = ImageDownloader;
