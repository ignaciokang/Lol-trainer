const axios = require("axios");
const cache = require("memory-cache");
const { getDataDragonVersion } = require("./getDataDragonVersion");
const { isInCache } = require("../cacheService");
const { TIME_IN_MILISECONDS } = require("../../constants");

const getSummonerJson = async () => {
  try {
    if (isInCache("summoner.json")) {
      return cache.get("summoner.json");
    }

    const DataDragonVersion = await getDataDragonVersion();
    const summonerJsonResp = await axios({
      method: "get",
      url: `http://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/data/en_US/summoner.json`,
      responseType: "json",
    });
    const summonerJson = summonerJsonResp.data;

    cache.put(
      "summoner.json",
      { summonerJson, DataDragonVersion },
      TIME_IN_MILISECONDS.WEEK
    );
    return { summonerJson, DataDragonVersion };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getSummonerJson };
