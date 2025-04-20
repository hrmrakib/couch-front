export type TCheckout = {
	type: "products" | "bundles";
	products?: {
		_id: string;
		quantity: number;
		rentalLength?: number;
		price: number;
		images: string[];
		name: string;
	}[];
	bundle?: {
		_id: string;
		quantity: number;
		rentalLength?: number;
		price: number;
		images: string[];
		name: string;
	};
};

export type TOrderDetails = {
	product: string;
	quantity: number;
	rentalLength: number;
}[];
