const express = require("express");
const app = express();
const PredictionRoute = require("./routes/PredictionRoute");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/prediction", PredictionRoute);
app.use("/api", (req, res) => {
	res.send("Welcome to API page");
});

module.exports = app;
