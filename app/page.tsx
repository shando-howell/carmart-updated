import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Image 
        src="/assets/images/Lambo-home.jpg" 
        alt="Lambo Home"
        width={750}
        height={750}
      />
    </div>
  );
}
