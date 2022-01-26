process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
require("dotenv").config();
const { serverPort, serverHost } = require("./config");
const { app } = require("./app");

app.listen(serverPort, serverHost, () => {
  try {
    console.log(`Server up: http://${serverHost}:${serverPort}`);
  } catch (error) {
    console.log("error: ", error);
  }
});
