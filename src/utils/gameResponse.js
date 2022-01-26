const { matchParticipant } = require("./matchParticipant");
const { getQueueData } = require("./getQueueData");
const { getChampionBannedData } = require("./getChampionBannedData");
const { PLATFORM_NAMES, TEAM_NAMES } = require("../constants");

const gameResponse = async ({
  gameMode,
  gameType,
  gameQueueConfigId,
  participants,
  platformId,
  bannedChampions,
}) => {
  try {
    const participantsJson = await Promise.all(
      participants.map((player) => {
        return matchParticipant(player);
      })
    );

    const bannedData = await Promise.all(
      bannedChampions.map((banned) => {
        return getChampionBannedData(banned.championId);
      })
    );

    const bannedChampionsJson = bannedData.map((bannedChamp) => {
      return {
        champion: bannedChamp,
        team: TEAM_NAMES[bannedChamp.teamId],
        pickTurn: bannedChamp.pickTurn,
      };
    });

    const gameQueue = await getQueueData(gameQueueConfigId);

    return {
      gameMode,
      gameType,
      gameQueue,
      participants: participantsJson,
      platformId: PLATFORM_NAMES[platformId],
      bannedChampions: bannedChampionsJson,
    };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { gameResponse };
