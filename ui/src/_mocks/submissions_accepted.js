import { uniqueId } from "lodash";
import SubmitionStatus from "../helpers/models/SubmitionStatus";
import { now } from "../helpers/Utils";

const submissions_accepted = {
	active: 1,
	pending: 0,
	submitted: 1,
	totalEarnings: 5,

	earningsData: [
		{
			id: uniqueId("1"),
			title: "As a Paris City Guide, your role involves recommending the best places for tourists to visit in order to find fantastic food. This requires extensive knowledge all restaurants in Paris, and their hours of operation.",
			submission_date: now(),
			model: "Paris Guide",
			status: SubmitionStatus.accepted,
			earnings: 0,
		},
	],
};

export default submissions_accepted;
