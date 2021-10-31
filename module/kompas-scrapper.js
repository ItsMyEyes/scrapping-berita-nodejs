const axios = require('axios');
const cheerio = require('cheerio');

const host = `https://indeks.kompas.com`;

const scrapTopNews = (category) => {
    return new Promise((resolve, reject) => {
        axios(host + category)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const div = $("div[class='latest--indeks mt2 clearfix'] > div");
            const news = [];

            div.each((index, element) => {
                news.push({
                    rank: index + 1,
                    title: $(element).find(".article__list__title > h3 > a").text(),
                    subtitle: $(element).find(".article__list__info > div[class='article__subtitle article__subtitle--inline']").text(),
                    image: $(element).find("div[class='article__list__asset clearfix'] > .article__asset > img").attr('src'),
                    link: $(element).find(".article__list__title > h3 > a").attr('href'),
                    date: $(element).find(".article__list__info > div[class='article__date']").text()
                });
            });

            resolve(news);
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    scrapTopNews
}