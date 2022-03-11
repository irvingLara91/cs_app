import React, {
	useState,
	createContext,
	useContext,
} from "react";

export const NewOrderContext = createContext();

export function NewOrderProvider(props) {
	const { children } = props;
	const [step, setStep] = useState(1);
	const [orderData, setOrderData] = useState({
		card: "https://random.imagecdn.app/150/70",
		gravestone: {
			image: "https://random.imagecdn.app/150/90"
		}
	});
	const totalSteps = 4;

	const defaultContext = {
		setOrderData,
		setStep,
		step,
		totalSteps,
		orderData,
	};

	return (
		<NewOrderContext.Provider value={defaultContext}>
			{children}
		</NewOrderContext.Provider>
	);
}

export function useNewOrderContext() {
	return useContext(NewOrderContext);
}
