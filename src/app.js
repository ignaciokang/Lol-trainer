/**
 * Los datos de mi usuario:
 * {
    "id": "6qrzWIJ6Jxb-2VMrpDc-b0dY6Qg1jLMIJdi3jTyIPCTy",
    "accountId": "swbrZeysyoMAVHRzE3oWEXeesIvbZSAIxlVMXHwJZ8I",
    "puuid": "9id-M5X7_Z1q6p3wgjC0rvOcu7CxuVTpN4EfamIeGHylVClCS7SWY6Y2a83JAQB0OaoNlq9S9zNWGQ",
    "name": "MechRagna",
    "profileIconId": 4057,
    "revisionDate": 1642291091000,
    "summonerLevel": 232
 * }
 */
const express = require("express");
const helmet = require("helmet");
const { router } = require("./components/router/router");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(helmet());

app.use("/api/v0.1", router);
app.use(errorMiddleware);

module.exports = { app };

// TEST
// const activeGame = require("./mocks/activeGame");
// const { gameResponse } = require("./utils/gameResponse");

// (async () => {
//    console.time("match")
//    const resp = await gameResponse(activeGame);
//    console.log("data: ", JSON.stringify(resp));
//    console.timeEnd("match")
// })();
