import React from "react";
import TestimonialCard from "./TestimonialsCard";
import { Marquee } from "./magicui/marquee";


const ClientTestimonials = [
	{
		name: "Emily Carter",
		title: "Interior Designer",
		location: "San Diego, USA",
		date: "12 March 2025",
		imgSrc: "/images/clients/emily.jpg",
		testimonial:
			"Absolutely love the shoe rack! It's stylish, sturdy, and fits perfectly in my entryway.",
		id: 1,
	},
	{
		name: "Brian Kim",
		title: "Tech Consultant",
		location: "Toronto, Canada",
		date: "28 February 2025",
		imgSrc: "/images/clients/brian.jpg",
		testimonial:
			"This shoe rack solved all my storage issues. Plus, it looks amazing!",
		id: 2,
	},
	{
		name: "Aisha Mohammed",
		title: "Lifestyle Blogger",
		location: "Dubai, UAE",
		date: "5 January 2025",
		imgSrc: "/images/clients/aisha.jpg",
		testimonial:
			"Perfect for organizing my growing shoe collection. Highly recommended!",
		id: 3,
	},
	{
		name: "Carlos Rivera",
		title: "Photographer",
		location: "Barcelona, Spain",
		date: "22 December 2024",
		imgSrc: "/images/clients/carlos.jpg",
		testimonial:
			"Beautifully crafted and super practical. It’s now a centerpiece in my hallway.",
		id: 4,
	},
	{
		name: "Grace Liu",
		title: "Marketing Executive",
		location: "Singapore",
		date: "9 November 2024",
		imgSrc: "/images/clients/grace.jpg",
		testimonial:
			"I get compliments on it all the time. It’s sleek, minimal, and very well made.",
		id: 5,
	},
	{
		name: "David Njoroge",
		title: "Entrepreneur",
		location: "Nairobi, Kenya",
		date: "30 October 2024",
		imgSrc: "/images/clients/david.jpg",
		testimonial:
			"This rack blends with any decor and holds way more shoes than I expected.",
		id: 6,
	},
];

export default function Testimonials() {
	return (
		<div className="lg:container bg-white p-10 md:py-20 w-full h-full flex flex-col gap-5 md:gap-10 items-center justify-center">
			<div className="flex flex-col gap-2 items-center justify-center">
				<h2
					className={`  text-[2rem] font-semibold leading-[2.4rem] sm:leading-[42px] tracking-tight`}
				>
					Testimonials
				</h2>
				<p className="text-neutral-600 font-medium text-center">
					What our clients say about our shoe racks.
				</p>
			</div>
			<div className="relative w-full h-full">
				<div className="pointer-events-none z-10 absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
				<div className="pointer-events-none z-10 absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
				<Marquee
					pauseOnHover
					className="[--duration:30s]"
				>
					{ClientTestimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="w-full md:w-1/4 p-2"
						>
							<TestimonialCard {...testimonial} />
						</div>
					))}
				</Marquee>
			</div>
		</div>
	);
}
