const axios = require("axios");
const cheerio = require("cheerio");

const host = `https://www.liputan6.com/news/indeks/terpopuler/hari-ini`;

const scrapTopNews = (category) => {
  return new Promise((resolve, reject) => {
    axios(host)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const article = $(
          "div[class='articles--list articles--list_rows'] > article"
        );
        const topNews = [];

        article.each((index, element) => {
          topNews.push({
            rank: index + 1,
            title: $(element)
              .find("h4[class='articles--rows--item__title'] > a")
              .attr("title"),
            category: $(element)
              .find("header[class='articles--rows--item__header'] > a")
              .text(),
            image: $(element)
              .find("picture[class='articles--rows--item__figure-image'] > img")
              .attr("src"),
            link: $(element)
              .find("h4[class='articles--rows--item__title'] > a")
              .attr("href"),
            date: $(element)
              .find("span[class='articles--rows--item__datetime']")
              .text(),
          });
        });

        resolve(topNews);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  scrapTopNews,
};
