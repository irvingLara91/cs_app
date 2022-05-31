import React, { useEffect, useState } from "react";
import Tutorial from "./Tutorial";

import screens from "~/constants/screens";

export default function NewOrder({ navigation }) {
	const { navigate } = navigation;
	const [skipTutorial, setSkipTutorial] = useState(false);

	useEffect(() => {
		if (skipTutorial) {
			navigate(screens.NEW_ORDER_STEP_1);
		}
	}, [skipTutorial]);

	if (!skipTutorial) return <Tutorial onSkip={(status) => setSkipTutorial(status)} />;
}
