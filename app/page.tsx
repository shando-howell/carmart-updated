"use server";

import Image from "next/image";
import { Card } from "@/components/ui/card";

export default async function Home() {
  
  return (
    <div className="flex justify-center mt-14">
            <Card className="p-4">
              <Image 
                src="/assets/images/Lambo-home.jpg" 
                alt="Lambo Home"
                width={700}
                height={700}
              />
            </Card>
    </div>
  );
}
