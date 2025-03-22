import Image from "next/image";

const features = [
  {
    id: 1,
    icon: "/home/furnitures/browse.svg",
    title: "Students Browse & Select",
    description: "Choose your favorite furniture effortlessly.",
  },
  {
    id: 2,
    icon: "/home/furnitures/cart.svg",
    title: "We Deliver & Set Up",
    description: "Quick delivery with hassle-free installation.",
  },
  {
    id: 3,
    icon: "/home/furnitures/award.svg",
    title: "Seamless Service",
    description: "Relax and make your space feel like home.",
  },
  {
    id: 4,
    icon: "/home/furnitures/bed.svg",
    title: "A Space You'll Love",
    description: "We leave, leaving your space stylish and cozy.",
  },
];

export default function FeaturesSection() {
  return (
    <section className='py-12 md:py-20 bg-[#FDF7EE]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature) => (
            <div
              key={feature.id}
              className='bg-white rounded-lg p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='w-16 h-16 mb-6 relative'>
                <Image
                  src={feature.icon || "/placeholder.svg"}
                  alt={feature.title}
                  width={64}
                  height={64}
                  className='object-contain'
                />
              </div>

              <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>

              <p className='text-gray-600 text-sm'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
