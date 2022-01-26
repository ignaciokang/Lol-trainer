const axios = require("axios");
const cache = require("memory-cache");
const { getDataDragonVersion } = require("./getDataDragonVersion");
const { isInCache } = require("../cacheService");
const { TIME_IN_MILISECONDS } = require("../../constants");

const getChampionJson = async () => {
  try {
    if (isInCache("champion.json")) {
      return cache.get("champion.json");
    }

    const DataDragonVersion = await getDataDragonVersion();
    const championJsonResp = await axios({
      method: "get",
      url: `http://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/data/en_US/champion.json`,
      responseType: "json",
    });
    const championJson = championJsonResp.data;

    cache.put(
      "champion.json",
      { championJson, DataDragonVersion },
      TIME_IN_MILISECONDS.WEEK
    );
    return { championJson, DataDragonVersion };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getChampionJson };
