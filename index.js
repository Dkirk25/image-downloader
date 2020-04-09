const qs = require("querystring");
const path = require("path");
const request = require("request");

const parseHTML = require("./src/services/html-image-link-parser");
const ImageDownloader = require("./src/services/image-downloader");

const outputDir = path.join(__dirname, "images");
const argv = require("yargs").argv;
const downloader = new ImageDownloader(outputDir);

const BING = "https://www.bing.com/images/search";
const GOOGLE = "https://www.google.com/search";

function main(args) {
  const { platform, query, limit = 10 } = args;

  if (platform === "g") {
    platform == GOOGLE;
  } else {
    platform == BING;
  }

  const uri = `${BING}?${qs.stringify({ q: query })}`;

  console.log("Requesting", uri);
  request(uri, function (error, response, body) {
    try {
      const links = parseHTML(body);
      console.log("Links Found", links);

      if (links.length > 0) {
        links.slice(0, limit).forEach((link, i) => {
          downloader.download({ uri: link, filename: `${i}` }, function () {
            console.log("done");
          });
        });
      } else {
        console.log(`No valid image links found for ${query}`);
      }
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  });
}

main(argv);
