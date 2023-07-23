import { uniqueId } from "lodash";
import SubmitionStatus from "../helpers/models/SubmitionStatus";
import { now } from "../helpers/Utils";

const submissions = {
	active: 0,
	pending: 1,
	submitted: 1,
	totalEarnings: 0,

	earningsData: [
		{
			id: uniqueId("1"),
			title: "As a Paris City Guide, your role involves recommending the best places for tourists to visit in order to find fantastic food. This requires extensive knowledge all restaurants in Paris, and their hours of operation.",
			submission_date: now(),
			model: "Paris Guide",
			status: SubmitionStatus.pending,
			earnings: 0,
		},
	],
};

export default submissions;
