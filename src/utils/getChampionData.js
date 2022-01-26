const cache = require("memory-cache");
const { getChampionJson } = require("../services");
const { isInCache } = require("../services");
const { TIME_IN_MILISECONDS } = require("../constants");

const getChampionData = async (championId) => {
  try {
    if (isInCache(`championId-${championId}`)) {
      return cache.get(`championId-${championId}`);
    }

    const { championJson } = await getChampionJson();
    for (let champion in championJson.data) {
      if (championJson.data[champion].key == championId) {
        cache.put(
          `championId-${championId}`,
          {
            name: championJson.data[champion].name,
            img: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championJson.data[champion].id}_0.jpg`,
          },
          TIME_IN_MILISECONDS.WEEK
        );
        return {
          name: championJson.data[champion].name,
          img: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championJson.data[champion].id}_0.jpg`,
        };
      }
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getChampionData };
