import { uniqueId } from "lodash";
import SubmitionStatus from "../helpers/models/SubmitionStatus";

const prompts = [
	{
		id: uniqueId("2"),
		title:
			"When user asks for anything about a place or places, give them the name, address, phone number, and opening hours.",
		submission_date: "2023-07-22 10:00",
		submitted_by: "36UaD8YjacqVUxbbCoAssrkruugmmAWjC7sQLvKEJcNC",
		status: SubmitionStatus.inactive,
		cost: 5,
	},
	{
		id: uniqueId("1"),
		title:
			"When user asks for anything about a place or places, give them the name, address, phone number, and opening hours.",
		submission_date: "2023-07-22 10:00",
		submitted_by: "36UaD8YjacqVUxbbCoAssrkruugmmAWjC7sQLvKEJcNC",
		status: SubmitionStatus.accepted,
		cost: 20,
	},
];

export default prompts;
