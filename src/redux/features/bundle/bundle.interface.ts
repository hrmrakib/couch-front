export type TBundle = {
	_id: string;
	admin: string;
	name: string;
	description: string;
	images: string[];
	products: string[];
	price?: number;
	rentPrice?: number;
	isBuyable: boolean;
	isRentable: boolean;
	notes: string[];
	rating: number;
	stock: number;
	createdAt: string;
	updatedAt: string;
};
