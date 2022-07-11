const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json())
app.use("/auth/", require("./routes/auth.routes"));
app.use("/words/", require("./routes/card.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    mongoose.connect(config.get('dbURL'), { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => console.log('running'));
  } catch (error) {
      console.log(error.message);
  }
}

start();