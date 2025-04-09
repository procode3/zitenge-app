import FeatureCard from '@/components/FeatureCard';
import Link from 'next/link'
import Image from 'next/image'
import Testimonials from '@/components/Testimonials';


export const runtime = 'edge';

const features: { icon: "DraftingCompass" | "Truck" | "Award" | "ChevronsDownUp"; title: string; description: string; }[] = [
	{
		title: 'Customizable Colors',
		description:
			'Design your desired shoe rack from a variety of colors to match your unique style',
		icon: `DraftingCompass`,
	},
	{
		title: 'Affordable Shipping',
		description:
			'We offer affordable country wide shipping on all orders within 1-2 weeks',
		icon: `Truck`,
	},
	{
		title: 'Quality Craftsmanship',
		description:
			'Our shoe racks are made from the best quality materials to ensure durability',
		icon: `Award`,
	},
	{
		title: 'Easy Assembly',
		description:
			'Our shoe racks are easy to set up and collapse for easy storage',
		icon: `ChevronsDownUp`,
	},
];

const Home = () => {
	return (
		<div className="font-quicksand flex flex-col items-center content-center h-full w-full ">
			<section className="flex h-full px-4 md:px-0 md:w-[70%] text-center md:text-left md:py-16  text-black gap-4 justify-evenly md:justify-between flex-wrap-reverse md:flex-nowrap ">
				<div className="flex flex-col justify-evenly  gap-8 h-full items-center md:items-baseline w-full md:w-1/2 ">
					<span className="text-cyan-700 mt-20 md:mt-0 text-sm font-semibold ">
						Trusted by over 2000+ customers
					</span>
					<h1 className="text-[2.5rem] font-semibold leading-[2.4rem] sm:leading-[3rem] tracking-tight">
						Improve the way you organize your shoes with our Handcrafted Shoe
						Racks
					</h1>
					<p className="text-neutral-600 font-medium">
						Elevate your space with style and flexibility! Our sleek,
						collapsible shoe racks are as versatile, with customizable colors to
						match your unique vibe.
					</p>

					<Link
						href={`/experience`}
						className={`flex group text-nowrap text-center items-center bg-cyan-700 text-white px-8 w-fit  py-2 rounded hover:text-white`}
					>
						Shop Now
					</Link>
				</div>
				<div className="hidden md:flex content-center h-1/2 md:h-3/4 filter relative">
					<Image
						src="/images/rack-hero.png"
						height={200}
						width={200}
						className="rounded-xl"
						alt="Shoe Rack"
					/>
				</div>
			</section>
			<section className="flex justify-between flex-wrap  py-16 gap-8 text-black px-4 md:px-0 md:w-[70%] h-full">
				<div className="flex flex-col gap-4 w-[100%] text-center">
					<h2 className="text-[2rem] font-semibold leading-[2.4rem] sm:leading-[42px] tracking-tight">
						Why choose Zitenge Shoe Racks?
					</h2>
					<p className="text-neutral-600 font-medium">
						We are committed to providing you with the best quality shoe racks
						that are not only functional but also stylish.
					</p>
				</div>

				<div className="flex gap-8  w-full">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-7 justify-evenly ">
						{features.map((feature) => (
							<FeatureCard
								{...feature}
								key={feature.title}
							/>
						))}
					</div>
				</div>
				<Testimonials />
			</section>
		</div>
	);
};

export default Home;
