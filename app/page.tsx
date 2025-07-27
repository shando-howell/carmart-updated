"use server";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  
  return (
    <main className="min-h-screen -mt-18 relative p-24 flex items-center justify-center">
      <Image 
        src="/assets/images/Lambo-home.jpg" 
        alt="Lambo Home"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 size-full bg-black/25 backdrop-blur-xs"/>
      <div className="flex flex-col gap-10 text-zinc-300 relative z-10">
        <h1 className="font-semibold text-5xl max-w-screen-md text-center">
          Find your dream car.
        </h1>
        <Button asChild className="mx-auto p-8 text-lg text-black uppercase tracking-widest gap-5">
          <Link href="/vehicles">
            Explore Today
          </Link>
        </Button>
      </div>
    </main>
  );
}
