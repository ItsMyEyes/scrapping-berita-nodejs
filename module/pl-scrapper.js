const axios = require("axios");
const cheerio = require("cheerio");

const host = `https://www.premierleague.com`;

const scrapGoalRecord = (category) => {
  const url = `${host}/stats/top/players/${category}?se=-1&cl=-1&iso=-1&po=-1`;
  return new Promise((resolve, reject) => {
    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const statsTable = $(".statsTableContainer > tr");
        const topPremierLeagueScorers = [];

        statsTable.each(function () {
          topPremierLeagueScorers.push({
            rank: $(this).find(".rank > strong").text(),
            name: $(this).find(".playerName > strong").text(),
            detail: host + $(this).find(".playerName").attr("href"),
            nationality: $(this).find(".playerCountry").text(),
            goals: $(this).find(".mainStat").text(),
          });
        });

        resolve(topPremierLeagueScorers);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  scrapGoalRecord,
};
