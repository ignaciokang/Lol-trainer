const express = require("express");
const router = express.Router();

const { activeGameRouter } = require("../activeGame/activeGameRouter");

activeGameRouter(router);

module.exports = { router };