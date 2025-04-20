"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { Usable, use, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useBundleRetrieveQuery } from "@/redux/features/bundle/bundleApi";
import { TBundle } from "@/redux/features/bundle/bundle.interface";
import { img } from "@/lib/img";
import {
	useDeleteReviewMutation,
	useGetReviewsQuery,
	useReviewMutation,
} from "@/redux/features/review/reviewApi";
import { toast } from "sonner";
import moment from "moment";
import { TReview } from "@/redux/features/review/reivew.interface";

const initialProduct = [
	{
		id: 13,
		name: "ComfiTable",
		image: "/home/features/1.png",
		monthlyPrice: 20,
		buyPrice: 150,
		rating: 4,
		category: ["best-selling", "trending-now"],
	},
	{
		id: 2,
		name: "ComfiTable",
		image: "/home/features/2.png",
		monthlyPrice: 20,
		buyPrice: 150,
		rating: 4,
		category: ["best-selling", "most-rented"],
	},
	{
		id: 3,
		name: "ComfiTable",
		image: "/home/features/3.png",
		monthlyPrice: 20,
		buyPrice: 150,
		rating: 4,
		category: ["most-rented", "trending-now"],
	},
	{
		id: 4,
		name: "ComfiTable",
		image: "/home/features/4.png",
		monthlyPrice: 20,
		buyPrice: 150,
		rating: 4,
		category: ["best-selling", "trending-now"],
	},
];

export default function ProductDetailsPage({
	params,
}: {
	params: Usable<Record<string, string>>;
}) {
	const { bundleId } = use(params) as Record<string, string>;

	const { data } = useBundleRetrieveQuery({
		bundleId,
	});

	const { data: reviewData } = useGetReviewsQuery({
		id: bundleId,
		type: "bundles",
		limit: 5,
	});

	const [deleteReview] = useDeleteReviewMutation();

	const reviews = reviewData?.data || [];

	const user = JSON.parse(localStorage.getItem("user") || "{}");

	const [review] = useReviewMutation();

	const bundle = data?.data as TBundle;

	const [selectedOption, setSelectedOption] = useState<"rent" | "buy">("buy");
	const [quantity, setQuantity] = useState(1);
	const [rentalLength, setRentalLength] = useState(0);

	const [userRating, setUserRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [reviewText, setReviewText] = useState("");
	const [favorites, setFavorites] = useState<number[]>([]);

	const toggleFavorite = (productId: number) => {
		setFavorites((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId]
		);
	};

	const handleRatingClick = (rating: number) => {
		setUserRating(rating);
	};

	const handleRatingHover = (rating: number) => {
		setHoveredRating(rating);
	};

	const handleRatingLeave = () => {
		setHoveredRating(0);
	};

	const handleReview = async (e: React.FormEvent) => {
		e.preventDefault();

		if (userRating === 0) {
			alert("Please select a rating");
			return;
		}

		if (reviewText.trim() === "") {
			alert("Please enter a review");
			return;
		}

		try {
			await review({
				id: bundleId,
				type: "bundles",
				review: {
					rating: userRating,
					content: reviewText.trim(),
				},
			});

			toast.success("Review submitted successfully!");
		} catch {
			toast.error("Failed to submit review");
		}
	};

	const handleBuyNow = () => {
		alert(
			`Proceeding to checkout: ${quantity} Comfi Sofa(s) - ${
				selectedOption === "rent" ? `Rent for ${rentalLength}` : "Buy"
			}`
		);
	};

	const handleReviewDelete = async (id: string) => {
		try {
			await deleteReview({
				id,
			});
			toast.success("Review deleted successfully!");
		} catch {
			toast.error("Failed to delete review");
		}
	};

	return (
		<div className="min-h-screen">
			<div className="bg-[#FFFFFF] pt-5">
				<h1 className="text-2xl md:text-[32px] text-[#333333] font-medium text-center mb-8">
					Bundles Offer Details
				</h1>
			</div>
			<div className="bg-[#FFF8ED]">
				<div className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
						{/* Product Images */}
						<div>
							<div className="bg-[#F5F5F5] rounded-md mb-4 relative aspect-square">
								<img
									src={img(bundle?.images[0])}
									alt={bundle?.name}
									className="p-4"
								/>
							</div>
							<div className="flex space-x-2 overflow-x-auto pb-2">
								{bundle?.products?.map((product: any) => (
									<Link
										href={`/shop/${product._id}`}
										key={product._id}
										className="bg-[#F5F5F5] border-2 rounded-md overflow-hidden flex-shrink-0 w-[132px] h-[132px] relative"
									>
										<img
											alt={product.name}
											src={img(product.images[0])}
											className="w-[132] h-[132] object-cover"
										/>
									</Link>
								))}
							</div>
						</div>

						{/* Product Info */}
						<div>
							<div className="flex justify-between items-start mb-2">
								<h2 className="text-2xl md:text-[32px] text-[#101010] font-medium">
									{bundle?.name}
								</h2>
								<div className="flex items-center">
									<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
									<span className="ml-1 text-lg text-[#000000]">
										{bundle?.rating?.toFixed(1)}
									</span>
								</div>
							</div>

							<p className="text-[#333333] text-lg mb-6">
								{bundle?.description}
							</p>

							{/* Pricing Options */}
							<div className="mb-6">
								<div className="flex space-x-4 mb-4">
									{bundle?.isRentable && (
										<label className="flex items-center">
											<input
												type="radio"
												name="pricing"
												checked={selectedOption === "rent"}
												onChange={() => setSelectedOption("rent")}
												className="hidden"
											/>
											<span
												className={cn(
													"w-5 h-5 rounded-full border flex items-center justify-center mr-2",
													selectedOption === "rent"
														? "border-yellow-500 bg-white"
														: "border-gray-300 bg-white"
												)}
											>
												{selectedOption === "rent" && (
													<span className="w-3 h-3 rounded-full bg-yellow-500"></span>
												)}
											</span>
											<span className="rounded-md py-2 px-4 flex items-center">
												Rent ${bundle?.rentPrice}
												<span className="text-[#333333]">/mo</span>
											</span>
										</label>
									)}

									<label className="flex items-center">
										<input
											type="radio"
											name="pricing"
											checked={selectedOption === "buy"}
											onChange={() => setSelectedOption("buy")}
											className="hidden"
										/>
										<span
											className={cn(
												"w-5 h-5 rounded-full border flex items-center justify-center mr-2",
												selectedOption === "buy"
													? "border-yellow-500 bg-white"
													: "border-gray-300 bg-white"
											)}
										>
											{selectedOption === "buy" && (
												<span className="w-3 h-3 rounded-full bg-yellow-500"></span>
											)}
										</span>
										<span className="text-black">${bundle?.price} To buy</span>
									</label>
								</div>

								<div className="bg-[#FFFFFF] p-4 rounded-md mb-6">
									{selectedOption === "rent" && (
										<div className="flex items-center mb-4">
											<span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
											<span>Rent for ${bundle?.rentPrice}/mo</span>
										</div>
									)}

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="quantity"
												className="block text-sm text-gray-600 mb-1"
											>
												Quantity
											</label>
											<input
												type="number"
												max={bundle?.stock}
												min={1}
												defaultValue={quantity}
												onBlur={(e) => {
													e.target.value = Math.max(
														Math.min(Number(e.target.value), bundle?.stock),
														1
													).toString();

													setQuantity(+e.target.value);
												}}
												className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
											/>
										</div>
										{selectedOption === "rent" && (
											<div>
												<label
													htmlFor="rental-length"
													className="block text-sm text-gray-600 mb-1"
												>
													Rental Length
												</label>
												<select
													id="rental-length"
													defaultValue={rentalLength}
													onChange={(e) => setRentalLength(+e.target.value)}
													className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
												>
													<option value="0" disabled>
														Select Rental Length
													</option>
													<option value="1">1 month</option>
													<option value="2">2 month</option>
													<option value="3">3 month</option>
													<option value="4">4 month</option>
													<option value="6">6 month</option>
													<option value="12">12 month</option>
												</select>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex space-x-4">
								<button
									onClick={handleBuyNow}
									className="flex-1 border border-gray-300 hover:bg-gray-50 cursor-pointer text-black font-medium py-3 px-6 rounded-md transition-colors"
								>
									Buy Now
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Product Tabs */}
				<Tabs defaultValue="description" className="w-full">
					<TabsList className="bg-[#FFFFFF] w-full justify-start border-b rounded-none h-auto pt-10 pb-8 mb-6">
						<div className="container mx-auto text-center px-4">
							<TabsTrigger
								value="description"
								className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-yellow-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2 text-base font-medium"
							>
								DESCRIPTION
							</TabsTrigger>
							<TabsTrigger
								value="additional"
								className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-yellow-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2 text-base font-medium"
							>
								ADDITIONAL
							</TabsTrigger>
							<TabsTrigger
								value="reviews"
								className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-yellow-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2 text-base font-medium"
							>
								REVIEWS
							</TabsTrigger>
						</div>
					</TabsList>
					<div className="container mx-auto px-4 py-8">
						<TabsContent value="description" className="mt-0 bg-[#FFF8ED]">
							<p className="text-gray-700 leading-relaxed">
								{bundle?.description}
							</p>
						</TabsContent>

						<TabsContent value="additional" className="mt-0">
							<div className="space-y-4">
								{bundle?.notes.map((note, idx) => (
									<p key={idx}>{note}</p>
								))}
							</div>
						</TabsContent>

						<TabsContent value="reviews" className="mt-0">
							<div className="container mx-auto px-4 py-8">
								<div className="flex flex-col md:flex-row gap-8">
									{/* Reviews List */}
									<div className="w-full md:w-1/2">
										<h2 className="text-2xl font-medium mb-6">
											{reviewData?.meta?.pagination?.total} Review for{" "}
											{bundle?.name}
										</h2>

										<div className="space-y-6">
											{reviews.map((review: TReview) => (
												<div
													key={review._id}
													className="bg-white p-6 rounded-md"
												>
													<div className="flex items-start">
														<div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
															<Image
																src={img(review?.user?.avatar)}
																alt={review?.user?.name}
																fill
																className="object-cover"
															/>
														</div>
														<div className="flex-1">
															<div className="flex justify-between items-center mb-2">
																<h3 className="font-medium text-lg">
																	{review?.user?.name}
																</h3>
																<div className="flex items-center">
																	<span className="text-yellow-500 mr-1">
																		★
																	</span>
																	<span>{review?.rating}</span>
																	{review?.user?._id === user?._id && (
																		<button
																			onClick={() =>
																				handleReviewDelete(review?._id)
																			}
																			className="ml-2 text-red-500"
																		>
																			<Trash2 className="text-sm" />
																		</button>
																	)}
																</div>
															</div>
															<p className="text-gray-700 mb-3">
																{review?.content}
															</p>
															<p className="text-gray-400 text-sm">
																{moment(review?.updatedAt).fromNow()}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* Review Form */}
									<div className="w-full md:w-1/2">
										<h2 className="text-2xl font-medium mb-4">Add a review</h2>
										<p className="text-gray-600 mb-6">
											Your email address will not be published. Required fields
											are marked
										</p>

										<form onSubmit={handleReview}>
											<div className="mb-6">
												<label className="block text-gray-700 mb-2">
													Your rating
												</label>
												<div className="flex" onMouseLeave={handleRatingLeave}>
													{[1, 2, 3, 4, 5].map((rating) => (
														<button
															key={rating}
															type="button"
															onClick={() => handleRatingClick(rating)}
															onMouseEnter={() => handleRatingHover(rating)}
															className="text-2xl mr-1 focus:outline-none"
															aria-label={`Rate ${rating} stars`}
														>
															{rating <= (hoveredRating || userRating) ? (
																<span className="text-yellow-500">★</span>
															) : (
																<span className="text-gray-300">★</span>
															)}
														</button>
													))}
												</div>
											</div>

											<div className="mb-6">
												<label
													htmlFor="review"
													className="block text-gray-700 mb-2"
												>
													Your review
												</label>
												<textarea
													id="review"
													value={reviewText}
													onChange={(e) => setReviewText(e.target.value)}
													className="w-full h-40 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
													placeholder="Message"
												></textarea>
											</div>

											<button
												type="submit"
												className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium cursor-pointer py-3 px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
											>
												Submit
											</button>
										</form>
									</div>
								</div>
							</div>
						</TabsContent>
					</div>
				</Tabs>
			</div>

			{/* Related Products */}

			<div className="container mx-auto px-4 pt-8 pb-16">
				<h2 className="text-2xl md:text-[40px] font-semibold text-[#000000] mb-4">
					Related Products
				</h2>
				<p className="text-[#545454] text-lg mb-12">
					Affordable, Stylish, and Ready for You – Choose to Buy or Rent.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{initialProduct.map((product) => (
						<div key={product.id} className="group">
							<div className="relative h-[332px] bg-[#F5F5F5] flex items-center justify-center rounded-lg overflow-hidden">
								<button
									onClick={() => toggleFavorite(product.id)}
									className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
									aria-label={
										favorites.includes(product.id)
											? "Remove from favorites"
											: "Add to favorites"
									}
								>
									<Heart
										className={`w-5 h-5 ${
											favorites.includes(product.id)
												? "fill-red-500 text-red-500"
												: "text-gray-600"
										}`}
									/>
								</button>
								{/* <div className='relative h-full w-full'> */}
								<Link
									href={`/shop/${product.id}`}
									className="relative h-full w-full"
								>
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										fill
										className="object-contain"
									/>
								</Link>
								{/* </div> */}
							</div>
							<div className="pt-3">
								<Link key={product.id} href={`/shop/${product.id}`}>
									<h3 className="text-xl md:text-[32px] text-[#000000] font-medium mb-1">
										{product.name}
									</h3>

									<div className="flex justify-between mb-2">
										<span className="text-[#000000] text-lg font-medium">
											${product.monthlyPrice}/mo
										</span>
										<span className="text-[#333333] text-lg">
											${product.buyPrice} to buy
										</span>
									</div>

									<div className="flex">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												className={`w-5 h-5 ${
													i < product.rating
														? "text-yellow-400"
														: "text-gray-300"
												}`}
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										))}
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
