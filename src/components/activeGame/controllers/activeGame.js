const { LoLApiTwisted } = require("../../../services");
const { gameResponse } = require("../../../utils/gameResponse");

const activeGame = async (req, res, next) => {
  try {
    const { summonerName, region } = req.query;
    const summonerData = await LoLApiTwisted.Summoner.getByName(
      summonerName,
      region
    );
    const activeGame = await LoLApiTwisted.Spectator.activeGame(
      summonerData.response.id,
      region
    );
    const gameResp = await gameResponse(activeGame.response);
    res.status(200).json({
      status: true,
      data: gameResp,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = { activeGame };
