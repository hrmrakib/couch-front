'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useBundleListQuery } from '@/redux/features/bundle/bundleApi';
import { TBundle } from '@/redux/features/bundle/bundle.interface';
import { img } from '@/lib/img';

export default function FurnitureBundles() {
	const { data } = useBundleListQuery({});

	return (
		<section className="py-8 md:py-16">
			<div className="container mx-auto px-4">
				<div className="flex justify-center mb-8">
					<h2 className="text-2xl md:text-3xl lg:text-[32px] font-medium text-center text-[#000000] max-w-md">
						Bundles Offers
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
					{!data?.data?.length && (
						<h3 className="text-xl text-gray-700">No bundles found.</h3>
					)}

					{data?.data?.map((bundle: TBundle) => (
						<Link
							key={bundle._id}
							href={`/bundles/${bundle._id}`}
							className={`relative overflow-hidden rounded-lg group`}
						>
							<div className={`relative w-full h-52 md:h-64 lg:h-80`}>
								<Image
									src={img(bundle.images[0])}
									alt={bundle.name}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 50vw"
									priority
								/>
								<div className="absolute inset-0 bg-black transition-opacity duration-500 group-hover:opacity-50 opacity-30"></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<h3 className="text-white text-3xl md:text-4xl font-bold">
										{bundle.name}
									</h3>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
