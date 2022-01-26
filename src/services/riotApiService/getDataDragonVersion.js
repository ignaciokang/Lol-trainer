const axios = require("axios");
const cache = require("memory-cache");
const { isInCache } = require("../cacheService");
const { TIME_IN_MILISECONDS } = require("../../constants");

const getDataDragonVersion = async () => {
  try {
    if (isInCache("versions.json")) {
      return cache.get("versions.json");
    }

    const respVersion = await axios({
      method: "get",
      url: "https://ddragon.leagueoflegends.com/api/versions.json",
      responseType: "json",
    });

    cache.put("versions.json", respVersion.data[0], TIME_IN_MILISECONDS.WEEK);
    return respVersion.data[0];
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getDataDragonVersion };
