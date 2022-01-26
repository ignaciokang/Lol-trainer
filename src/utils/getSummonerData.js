const cache = require("memory-cache");
const { getSummonerJson } = require("../services");
const { isInCache } = require("../services");
const { TIME_IN_MILISECONDS } = require("../constants");

const getSummonerData = async (summonerId) => {
  try {
    if (isInCache(`summonerId-${summonerId}`)) {
      return cache.get(`summonerId-${summonerId}`);
    }

    const { summonerJson, DataDragonVersion } = await getSummonerJson();
    for (let summoner in summonerJson.data) {
      if (summonerJson.data[summoner].key == summonerId) {
        cache.put(
          `summonerId-${summonerId}`,
          {
            name: summonerJson.data[summoner].name,
            img: `http://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/img/spell/${summonerJson.data[summoner].id}.png`,
          },
          TIME_IN_MILISECONDS.WEEK
        );
        return {
          name: summonerJson.data[summoner].name,
          img: `http://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/img/spell/${summonerJson.data[summoner].id}.png`,
        };
      }
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getSummonerData };
