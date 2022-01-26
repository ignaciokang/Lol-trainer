const axios = require("axios");
const cache = require("memory-cache");
const { getDataDragonVersion } = require("./getDataDragonVersion");
const { isInCache } = require("../cacheService");
const { TIME_IN_MILISECONDS } = require("../../constants");

const getProfileJson = async () => {
  try {
    if (isInCache("profileicon.json")) {
      return cache.get("profileicon.json");
    }

    const DataDragonVersion = await getDataDragonVersion();
    const profileJsonResp = await axios({
      method: "get",
      url: `http://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/data/en_US/profileicon.json`,
      responseType: "json",
    });
    const profileJson = profileJsonResp.data;

    cache.put(
      "profileicon.json",
      { profileJson, DataDragonVersion },
      TIME_IN_MILISECONDS.WEEK
    );
    return { profileJson, DataDragonVersion };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getProfileJson };
