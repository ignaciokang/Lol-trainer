const { twistedConfig } = require("../config");
const { LolApi } = require("twisted");

const LoLApiTwisted = new LolApi(twistedConfig);

module.exports = { LoLApiTwisted };
