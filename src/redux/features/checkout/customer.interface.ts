export type TCustomer = {
	name: {
		firstName: string;
		lastName: string;
	};
	contact: string;
	address: {
		country: string;
		city: string;
		zip: string;
		street: string;
		apartment: string;
	};
};
