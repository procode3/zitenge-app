import FeatureCard from "@/components/FeatureCard";
import Testimonials from "@/components/Testimonials";
import HeroPage from "@/components/HeroPage";


const features: {
	icon: "DraftingCompass" | "Truck" | "Award" | "ChevronsDownUp";
	title: string;
	description: string;
}[] = [
		{
			title: "Customizable Colors",
			description:
				"Design your desired shoe rack from a variety of colors to match your unique style",
			icon: `DraftingCompass`,
		},
		{
			title: "Affordable Shipping",
			description:
				"We offer affordable country wide shipping on all orders within 1-2 weeks",
			icon: `Truck`,
		},
		{
			title: "Quality Craftsmanship",
			description:
				"Our shoe racks are made from the best quality materials to ensure durability",
			icon: `Award`,
		},
		{
			title: "Easy Assembly",
			description:
				"Our shoe racks are easy to set up and collapse for easy storage",
			icon: `ChevronsDownUp`,
		},
	];

const Home = () => {
	return (
		<div className="relative font-quicksand flex flex-col items-center content-center  h-full overflow-hidden">
			<HeroPage />
			<section className="container flex justify-between flex-wrap py-16 gap-8 text-black px-4 md:px-0  h-full">
				<div className="flex flex-col gap-4 w-full text-center md:w-[70%]">
					<h2 className="text-[2rem] font-semibold leading-[2.4rem] sm:leading-[42px] tracking-tight">
						Why choose Zitenge Shoe Racks?
					</h2>
					<p className="text-neutral-600 font-medium">
						We are committed to providing you with the best quality shoe racks
						that are not only functional but also stylish.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-8 justify-evenly w-full ">
					{features.map((feature) => (
						<FeatureCard
							{...feature}
							key={feature.title}
						// Ensures that each FeatureCard takes full width in the grid
						/>
					))}
				</div>

				<Testimonials />
			</section>
		</div>
	);
};

export default Home;
