import { getListingById } from "@/app/data/listings";
import { Calendar1Icon, TimerIcon } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ListingStatusBadge from "@/components/ListingStatusBadge";
import numeral from "numeral";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import BackButton from "./BackButton";

const ListingPage = async ({params}: {
  params: Promise<any>
}) => {
  const paramsValue = await params;
  const listing = await getListingById(paramsValue.listingId);

  return (
    <div className="text-white">
      <div className="grid grid-cols-[1fr_500px]">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[80vh] min-h-80">
                  <Image 
                    src="/assets/images/classified-placeholder.jpeg" 
                    alt="Vehicle listing image" 
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div className="listing-description max-w-screen-md max-auto py-10 px-4">
            <BackButton />
            <ReactMarkdown>
              {listing.description}
            </ReactMarkdown>
          </div>
        </div>
        <div className="bg-yellow-400 h-screen p-10 sticky top-0 grid place-items-center">
          <div className="flex flex-col gap-10 w-full">
            <ListingStatusBadge status={listing.status} className="mr-auto text-base"/>
            <h1 className="text-4xl font-semibold">
              {listing.make} {listing.model}
            </h1>
            <h2 className="text-3xl font-light">
              ${numeral(listing.price).format("0,0")}
            </h2>
            <div className="flex gap-10">
              <div className="flex gap-2">
                <TimerIcon/> {listing.condition}
              </div>
              <div className="flex gap-2">
                <Calendar1Icon/> {listing.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPage;