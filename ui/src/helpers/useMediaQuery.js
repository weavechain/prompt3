import { useEffect } from "react";
import { useState } from "react";

export default function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const matchQueryList = window.matchMedia(query);
		setMatches(matchQueryList.matches);

		const handleChange = (e) => {
			setMatches(e.matches);
		};

		matchQueryList.addEventListener("change", handleChange);

		return () => {
			matchQueryList.removeEventListener("change", handleChange);
		};
	}, [query]);
	return matches;
}
