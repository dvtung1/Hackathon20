const automl = require("@google-cloud/automl").v1beta1;
const axios = require("axios");

const client = new automl.PredictionServiceClient({
	apiEndpoint: "automl.googleapis.com",
});

const projectId = "single-odyssey-296004";
const computeRegion = "us-central1";
const modelId = "TBL4639000086284599296";
const modelFullId = client.modelPath(projectId, computeRegion, modelId);
const params = {
	feature_importance: true,
};

exports.getPrediction = async (req, res) => {
	const benefits = req.body.benefits == null ? { stringValue: "" } : { stringValue: String(req.body.benefits) };
	const description = req.body.description == null ? { stringValue: "" } : { stringValue: String(req.body.description) };
	const location = req.body.location == null ? { stringValue: "" } : { stringValue: String(req.body.location) };
	const requirements = req.body.requirements == null ? { stringValue: "" } : { stringValue: String(req.body.requirements) };
	const salary_range = req.body.salary_range == null ? { stringValue: "" } : { stringValue: String(req.body.salary_range) };
	const title = req.body.title == null ? { stringValue: "" } : { stringValue: String(req.body.title) };

	const payload = {
		row: {
			columnSpecIds: [
				"4254132533656027136",
				"6559975542869721088",
				"7712897047476568064",
				"507137643683774464",
				"8865818552083415040",
				"1948289524442333184",
			],
			values: [benefits, description, title, requirements, salary_range, location],
		},
	};

	let response;
	try {
		response = await client.predict({
			name: modelFullId,
			payload: payload,
			params: params,
		});
	} catch (err) {
		return res.status(500).json({
			message: err,
		});
	}

	const fake_confident_score = parseFloat(response[0].payload[0].tables.score).toFixed(3);
	const label = fake_confident_score >= 0.5 ? "fake" : "real";
	const confident_score = fake_confident_score < 0.5 ? Math.round((1 - fake_confident_score) * 100) : Math.round(fake_confident_score * 100);
	const jsonPayload = {
		confident_score,
		label,
		feature_importance: {},
	};

	const dict = {};
	for (let columnInfo of response[0].payload[1].tables.tablesModelColumnInfo) {
		dict[columnInfo["columnDisplayName"]] = columnInfo["featureImportance"];
	}

	// normalize the value in dict
	let arr = Object.values(dict);
	let min = Math.min(...arr);
	let max = Math.max(...arr);
	for (let key in dict) {
		if (max == min) {
			dict[key] = 1;
		} else {
			dict[key] = ((dict[key] - min) / (max - min)).toFixed(4);
		}
	}
	jsonPayload["feature_importance"] = dict;
	return res.status(200).json(jsonPayload);
};
