import { uniqueId } from "lodash";
import SubmitionStatus from "../helpers/models/SubmitionStatus";

const submissions = {
	active: 0,
	inactive: 3,
	totalEarnings: 0,

	earningsData: [
		{
			id: uniqueId("1"),
			title: "Test prompt",
			submission_date: "2023-07-22 10:00",
			model: "paris_guide",
			status: SubmitionStatus.pending,
			earnings: 0,
		},
	],
};

export default submissions;
