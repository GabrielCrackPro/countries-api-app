const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const public = express.static("public");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(public);

app.listen(port, () => {
  console.log(`🚀 Listening on port ${port}...`);
});
