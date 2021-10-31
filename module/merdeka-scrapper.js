const axios = require("axios");
const cheerio = require("cheerio");

const host = `https://www.merdeka.com/`;

const scrapTopNews = (category) => {
  return new Promise((resolve, reject) => {
    axios(host + "trending-article")
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const article = $("div[class='inner-content '] > div > ul > li");
        const topNews = [];

        article.each((index, element) => {
          topNews.push({
            rank: index + 1,
            title: $(element).find("div[class='mdk-trending-meta'] > a").text(),
            category: $(element)
              .find("div[class='mdk-trending-category clearfix'] > a")
              .text()
              .trim(),
            image: $(element)
              .find("a[class='mdk-trending-thumb'] > img")
              .attr("src"),
            link: host + $(element).find("a[class='mdk-trending-thumb']").attr("href"),
            date: $(element)
              .find("div[class='mdk-trending-category clearfix'] > span")
              .text()
              .trim(),
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
  scrapTopNews
};
