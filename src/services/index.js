const { LoLApiTwisted } = require("./twisted");
const {
  getDataDragonVersion,
  getSummonerJson,
  getProfileJson,
  getChampionJson,
  getQueuesJson,
} = require("./riotApiService");
const { isInCache } = require("./cacheService");

module.exports = {
  LoLApiTwisted,
  getDataDragonVersion,
  getSummonerJson,
  getProfileJson,
  isInCache,
  getChampionJson,
  getQueuesJson,
};
