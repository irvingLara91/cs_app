export const ORDERS_FAKE_DATA =  [
	{
		orderId: 1458976,
		date: "12-03-2022",
		status: "Order Shipped"
	},
	{
		orderId: 1458977,
		date: "12-03-2022",
		status: "In process"
	},
	{
		orderId: 1458979,
		date: "12-03-2022",
		status: "Delivered",
	},
];

export const FAKE_ORDER_DETAIL = {
	date: "12-03-2022",
	media: "~/assets/gravestone-media.png",
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
	address: "724 echo ave, Romeoville, IL, 60446",
	additionalInstructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
	status: {code: 1, msg: "Order received"}
};

export const FAKE_USER_DETAILS = {
	fullName: "Oscar Fuentes",
	phone: "5554095303",
	email: "me@cornernstone.com",
	city: "chi",
	zipCode: "60446",
	password: "enctrypted password",
	address: "724 Echo ave,"
};

const isNumber = (value) => {
  if (typeof value != "string") return false;
  return !isNaN(value) && !isNaN(parseFloat(value)); 
};

const getNumbersFromLocaleTime = (localeTime) => {
  const splitted = localeTime.split("");
  return splitted.reduce((acc, currentValue) => {
    if (isNumber(currentValue)) acc.push(currentValue);
    return acc;
  }, []).join("");
};


export const generateOrderId = () => {
  const localeTime = new Date().toLocaleTimeString("en-US");
  const orderId = getNumbersFromLocaleTime(localeTime) + Math.floor((1 + Math.random()) * 0x10);
  return orderId;
};