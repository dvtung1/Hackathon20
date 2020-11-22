const express = require("express");
const router = express.Router();
const PredictionController = require("../controllers/PredictionController");

router.post("/predict", PredictionController.getPrediction);

module.exports = router;
