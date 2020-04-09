const cheerio = require("cheerio");

function parseHtml(html) {
  const $ = cheerio.load(html);
  const links = [];

  $("img").each(function (i, element) {
    const link = $(element).attr("src");
    links.push(link);
  });

  return links.filter((link) => !!link && link.indexOf("http") !== -1);
}

module.exports = parseHtml;
