import { uniqueId } from "lodash";
import SubmitionStatus from "../helpers/models/SubmitionStatus";

const submissions_accepted = {
	active: 1,
	pending: 0,
	submitted: 1,
	totalEarnings: 1,

	earningsData: [
		{
			id: uniqueId("1"),
			title:
				"When user asks for anything about a place or places, give them the name, address, phone number, and opening hours.",
			submission_date: "2023-07-22 10:00",
			model: "paris_guide",
			status: SubmitionStatus.accepted,
			earnings: 0,
		},
	],
};

export default submissions_accepted;
