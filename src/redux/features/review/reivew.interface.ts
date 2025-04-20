export type TReview = {
	_id: string;
	user: {
		name: string;
		avatar: string;
		_id: string;
	};
	rating: number;
	content: string;
	updatedAt: Date;
};
