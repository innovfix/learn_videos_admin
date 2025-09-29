const path = require("path");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const app = require("./server");
const PORT = 5010;

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
