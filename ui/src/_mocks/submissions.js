import { uniqueId } from "lodash";
import SubmitionStatus from "../helpers/models/SubmitionStatus";

const submissions = {
	active: 0,
	pending: 1,
	submitted: 1,
	totalEarnings: 0,

	earningsData: [
		{
			id: uniqueId("1"),
			title:
				"When user asks for anything about a place or places, give them the name, address, phone number, and opening hours.",
			submission_date: "2023-07-22 10:00",
			model: "paris_guide",
			status: SubmitionStatus.pending,
			earnings: 0,
		},
	],
};

export default submissions;
