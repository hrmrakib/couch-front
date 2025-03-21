import React from "react";
import Link from "next/link";

// Category data
const categories = [
  {
    id: 1,
    name: "Sofa",
    slug: "sofa",
    count: 45,
  },
  {
    id: 2,
    name: "Table",
    slug: "table",
    count: 32,
  },
  {
    id: 3,
    name: "Dining Chair",
    slug: "dining-chair",
    count: 28,
  },
  {
    id: 4,
    name: "Bed",
    slug: "bed",
    count: 18,
  },
  {
    id: 5,
    name: "Cabinet",
    slug: "cabinet",
    count: 24,
  },
];

export default function CategoriesPage() {
  return (
    <div className='min-h-screen bg-[#FDF7EE] py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-8'>
          <Link
            href='/'
            className='text-gray-600 hover:text-gray-900 transition-colors'
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className='text-3xl md:text-4xl font-bold mb-8'>All Categories</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
            >
              <h2 className='text-xl font-semibold mb-2'>{category.name}</h2>
              <p className='text-gray-600'>{category.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
