const axios = require("axios");
const cache = require("memory-cache");
const { isInCache } = require("../cacheService");
const { TIME_IN_MILISECONDS } = require("../../constants");

const getQueuesJson = async () => {
  try {
    if (isInCache("queues.json")) {
      return cache.get("queues.json");
    }
    const queuesJsonResp = await axios({
      method: "get",
      url: `https://static.developer.riotgames.com/docs/lol/queues.json`,
      responseType: "json",
    });
    const queuesJson = queuesJsonResp.data;

    cache.put(
      "queues.json",
      { queuesJson },
      TIME_IN_MILISECONDS.MAX_SIGNED_INT
    );
    return { queuesJson };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getQueuesJson };
