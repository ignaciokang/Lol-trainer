const cache = require("memory-cache");
const { getProfileJson } = require("../services");
const { isInCache } = require("../services");
const { TIME_IN_MILISECONDS } = require("../constants");

const getProfileData = async (profileId) => {
  try {
    if (isInCache(`profileId-${profileId}`)) {
      return cache.get(`profileId-${profileId}`);
    }

    const { profileJson, DataDragonVersion } = await getProfileJson();
    for (let profileNum in profileJson.data) {
      if (profileJson.data[profileNum].id == profileId) {
        cache.put(
          `profileId-${profileId}`,
          `https://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/img/profileicon/${profileJson.data[profileId].id}.png`,
          TIME_IN_MILISECONDS.WEEK
        );
        return `https://ddragon.leagueoflegends.com/cdn/${DataDragonVersion}/img/profileicon/${profileJson.data[profileId].id}.png`;
      }
    }
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { getProfileData };
