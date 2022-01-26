const { TEAM_NAMES } = require("../constants/teams");
const { getSummonerData } = require("./getSummonerData");
const { getProfileData } = require("./getProfileData");
const { getChampionData } = require("./getChampionData");
/**
 participant object example
 {
   teamId: 100,
   spell1Id: 4,
   spell2Id: 14,
   championId: 157,
   profileIconId: 5083,
   summonerName: "THESHADØW",
   bot: false,
 };
 */
const matchParticipant = async ({
  teamId,
  spell1Id,
  spell2Id,
  championId,
  profileIconId,
  summonerName,
  bot,
}) => {
  try {
    const [spell1, spell2, profileImg, champion] = await Promise.all([
      getSummonerData(spell1Id),
      getSummonerData(spell2Id),
      getProfileData(profileIconId),
      getChampionData(championId),
    ]);

    return {
      team: TEAM_NAMES[teamId],
      spell1: spell1,
      spell2: spell2,
      champion: champion,
      profileIcon: profileImg,
      summonerName: summonerName,
      isBot: bot,
    };
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = { matchParticipant };
