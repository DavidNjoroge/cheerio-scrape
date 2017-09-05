let axios = require('axios');
let cheerio = require('cheerio');
let jsonfile = require('jsonfile')
let file = 'scraped.json'

let base_url = 'http://www.checkatrade.com/Search/?location=E14&cat=12';

axios.get(base_url).then((response) => {
    let $ = cheerio.load(response.data);
    let soup = [];
    $('h2', '.results').each((i, elm) => {
      soup.push({
        title: $(elm).children().text(),
        link: ('http://www.checkatrade.com' +
          $(elm).children().attr('href'))
        // team: $(elm).children().eq(1).first().text()
      });
    });
    return (soup);
  })
  .then((soup) => {
    console.log(soup);
    let json = soup
    jsonfile.writeFile(file, json, function() {
      console.log('error!!!');
    })

  });
