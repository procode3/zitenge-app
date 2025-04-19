"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import HeroModel from "./HeroModel";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Anton } from "next/font/google";

// Dynamically import Configurator with no built-in loading fallback
const LazyConfigurator = dynamic(() => import("./Configurator"), {
  loading: () => null,
  ssr: false,
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export default function HeroPage() {
  const [customizing, setCustomizing] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const transition = { type: "spring", duration: 0.8 };

  useEffect(() => {
    if (customizing) {
      const timer = setTimeout(() => setConfigLoaded(true), 600); // optional extra buffer
      return () => clearTimeout(timer);
    } else {
      setConfigLoaded(false);
    }
  }, [customizing]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex">
      {/* HeroModel in background */}
      <div className="absolute inset-0 -z-10">
        <HeroModel offset={0} customizing={customizing} />
      </div>

      {/* Left Zitenge Text Block */}
      <div className="w-full md:w-1/2 h-full flex items-center px-6 md:px-20 lg:px-40">
        <AnimatePresence>
          {!customizing && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={transition}
              className="z-30 max-w-xl flex flex-col gap-5"
            >
              <h1
                className={`${anton.className} uppercase text-[3.5rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-bold tracking-tight text-italic`}
              >
                Zitenge
              </h1>
              <span className="text-cyan-700 text-sm font-semibold">
                Trusted by over 2000+ customers
              </span>
              <h2 className="mt-2 text-[1.2rem] md:text-[2rem] font-semibold md:leading-[2.4rem] tracking-tight">
                Improve the way you organize your shoes with our Handcrafted Shoe Racks
              </h2>
              <Button onClick={() => setCustomizing(true)} className="max-w-[10rem]">Customize</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Configurator Panel */}
      <AnimatePresence>
        {customizing && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={transition}
            className="md:absolute md:right-0 top-0 h-full  w-full md:w-1/2 z-30 flex items-center justify-center"
          >
            <div className="w-full md:w-1/2 min-h-[60vh]  flex flex-col gap-5">
              <Button onClick={() => setCustomizing(false)} className="max-w-[10rem]">Back</Button>
              {configLoaded ? (
                <Suspense fallback={null}>
                  <LazyConfigurator />
                </Suspense>
              ) : (
                <div className="space-y-4 h-80">
                  <Skeleton className="h-[60vh] w-full" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
