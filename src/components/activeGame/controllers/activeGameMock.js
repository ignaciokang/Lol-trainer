const gameResp = require("../../../mocks/activeGameConverted");

const activeGameMock = async (req, res, next) => {
  try {
    const { summonerName, region } = req.query;
    console.log("summonerName: ", summonerName);
    console.log("region: ", region);
    res.status(200).json({
      status: true,
      data: gameResp,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = { activeGameMock };
