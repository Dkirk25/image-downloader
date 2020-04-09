const cheerio = require('cheerio')

function parseHtml(html) {
  console.log('HTML', html);
  const $ = cheerio.load(html);
  const links = []
  $('img').each(function(i, element) {
    const link = $(element).attr('src');
    links.push(link);
  })

  console.log('Links', links);
  return links.filter(link => link.indexOf('http') !== -1);
}

module.exports = parseHtml;