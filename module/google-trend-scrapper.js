const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const host = `https://trends.google.com/trends/trendingsearches/daily`;

const scrapTopTopics = (country) => {
    return new Promise((resolve, reject) => {
        puppeteer
        .launch()
        .then(browser => browser.newPage())
        .then(page => {
            return page.goto(host + country, 
            {
                waitUntil:'load', 
                timeout:0
            }).then(function() {
                return page.content();
            });
        })
        .then(html => {
            const $ = cheerio.load(html);
            const result = [];
            $("div[class='homepage-trending-stories generic-container'] > div").each((index, element) => {
                const date = $(element).find(".content-header-title").text();
                const list = $(element).find("md-list");
                const topics = [];

                list.each((index, element) => {
                    topics.push({
                        rank: index + 1,
                        topic: $(element).find("div[class$='details']").text().replace(/\n/g, '').trim().split('share')[0].trim(),
                        title: $(element).find("div[class='image-link-wrapper'] > div > a").attr('title'),
                        link: $(element).find("div[class='image-link-wrapper'] > div > a").attr('href'),
                        image: $(element).find("div[class='image-link-wrapper'] > div > a > div > img").attr('src'),
                        portal: $(element).find("div[class='image-link-wrapper'] > div > a > div > div").text(),
                        hits: $(element).find("div[ng-if='ctrl.currentFeedItemType === ctrl.FeedItemType.DAILY']").text().trim()
                    });
                });

                result.push({
                    date,
                    topics
                });
            });

            resolve(result);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// scrapTopTopics()
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

module.exports = {
    scrapTopTopics
}