const activeGameController = require("./activeGameController");
const activeGameValidation = require("./activeGameValidation");

const activeGameRouter = (router) => {
  router.get(
    "/active",
    activeGameValidation.activeGameValidation,
    activeGameController.activeGame
  );

  router.get(
    "/activeMock",
    activeGameValidation.activeGameValidation,
    activeGameController.activeGameMock
  );
};

module.exports = { activeGameRouter };
