import React from "react";
import HeroModel from "./HeroModel";

export default function HeroPage() {
	return (
		<div className="relative w-full h-screen overflow-hidden bg-white">
			{/* Text: Zitenge (Behind) */}

			{/* 3D Model */}
			<div className="absolute z-10 inset-0">
				<HeroModel />
			</div>

			{/* Text: Handicrafts (Front) */}
			<h1 className="absolute z-20 flex gap-5 text-4xl md:text-6xl font-semibold text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
				<span className="">Zitenge</span>
				<span className="">Handicrafts</span>
			</h1>
		</div>
	);
}

{
	/* <div className="container flex flex-col">
					<h1 className=" z-50 items-end uppercase text-[4rem] font-semibold">
						Zitenge
					</h1>
					<span className="text-cyan-700 mt-20 md:mt-0 text-sm font-semibold ">
						Trusted by over 2000+ customers
					</span>
					<h1 className="text-[2.5rem] font-semibold leading-[2.4rem] sm:leading-[3rem] tracking-tight">
						Improve the way you organize your shoes with our Handcrafted Shoe
						Racks
					</h1>
				</div> */
}

{
	/* <div className="hidden md:flex content-center h-1/2 md:h-3/4 filter relative">
	<Image
		src="/images/rack-hero.png"
		height={200}
		width={200}
		className="rounded-xl"
		alt="Shoe Rack"
	/>
</div>; */
}

{
	/* <HeroModel/> */
}

{
	/* <div className="flex flex-col justify-evenly  gap-8 h-full items-center md:items-baseline w-full md:w-1/2 ">
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
                        </div> */
}
