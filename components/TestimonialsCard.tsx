import React from "react";
// import Image from "next/image";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
	name: string;
	title: string;
	location: string;
	date: string;
	imgSrc: string;
	testimonial: string;
	id: number;
}

export default function TestimonialCard({
	name,
	title,
	location,
	date,
	// imgSrc,
	testimonial,
}: TestimonialCardProps) {
	return (
		<div
			className={cn(
				"hover:bg-gray-50 h-[300px] w-[400px] border p-5 flex flex-col gap-6 rounded-sm shadow-md"
			)}
		>
			<div className="flex justify-between items-center w-full">
				{/* <div className="relative w-[3rem] h-[3rem] border rounded-full overflow-hidden">
					<Image
						src={imgSrc}
						alt={name}
						fill
						style={{ objectFit: "cover" }}
					/>
				</div> */}
				<p className="text-neutral-600 font-medium text-sm">{date}</p>
			</div>
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col gap-1">
					<p className="text-neutral-800 font-semibold text-[1rem]">{name}</p>
					<p className="text-cyan-600 font-medium text-sm">{title}</p>
					<p className="text-neutral-500 text-sm">{location}</p>
				</div>
				<p className="text-neutral-700 text-sm italic mt-3">{testimonial}</p>
			</div>
		</div>
	);
}
