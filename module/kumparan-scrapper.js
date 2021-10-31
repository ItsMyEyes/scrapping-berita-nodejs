const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const host = "https://kumparan.com";

const scrapTopNews = (category) => {
  return new Promise((resolve, reject) => {
    puppeteer
      .launch()
      .then((browser) => browser.newPage())
      .then((page) => {
        return page
          .goto(`${host}/trending${category}`, {
            waitUntil: "load",
            timeout: 0,
          })
          .then(function () {
            return page.content();
          });
      })
      .then((html) => {
        const $ = cheerio.load(html);
        const div = $(
          "div[class='Viewweb__StyledView-p5eu6e-0 fpCYHS'] > div[style='width:100%']"
        );
        const news = [];
        div.each((index, element) => {
          news.push({
            rank: index + 1,
            title: $(element)
              .find("div > div > div > a > span[data-qa-id='title']")
              .text(),
            category: $(element).find("div[color='gray70'] > span").text(),
            thumbnail: $(element)
              .find("div > div > div > a > div > div > noscript")
              .text()
              .match('src="(.*)"')[1],
            link: host + $(element).find("div > div > div > a").attr("href"),
            like: $(element)
              .find("div > div > div > div > button > span")
              .text(),
            comment: $(element)
              .find(
                "div > div > div > div > a[data-qa-id='comment-button-wrapper'] > span"
              )
              .text(),
          });
        });

        resolve(news);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  scrapTopNews,
};
