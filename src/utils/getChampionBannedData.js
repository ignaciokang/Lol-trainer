const cache = require("memory-cache");
const { getChampionJson } = require("../services");
const { isInCache } = require("../services");
const { TIME_IN_MILISECONDS } = require("../constants");

const getChampionBannedData = async (championId) => {
  try {
    if (isInCache(`bannedChampionId-${championId}`)) {
      return cache.get(`bannedChampionId-${championId}`);
    }

    const { championJson } = await getChampionJson();
    for (let champion in championJson.data) {
      if (championJson.data[champion].key == championId) {
        cache.put(
          `bannedChampionId-${championId}`,
          {
            name: championJson.data[champion].name,
            img: `http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/${championJson.data[champion].id}.png`,
          },
          TIME_IN_MILISECONDS.WEEK
        );
        return {
          name: championJson.data[champion].name,
          img: `http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/${championJson.data[champion].id}.png`,
        };
      }
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getChampionBannedData };
