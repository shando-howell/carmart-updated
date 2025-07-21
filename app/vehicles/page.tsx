import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getListings } from "../data/listings";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ToggleWatchingButton from "./ToggleWatchingButton";
import { getUserWatchList } from "../data/watching";
import { cookies } from "next/headers";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import Link from "next/link";
import FiltersForm from "./FiltersForm";
import { Suspense } from "react";
import { Calendar1 } from "lucide-react";
import numeral from "numeral";

const VehiclesPage = async ({
  searchParams
}: {
  searchParams: Promise<any>
}) => {
  const searchParamsValue = await searchParams;

  const parsedPage = parseInt(searchParamsValue?.page);
  const parsedMinPrice = parseInt(searchParamsValue?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValue?.maxPrice);
  const parsedYear = parseInt(searchParamsValue?.year);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const year = isNaN(parsedYear) ? null : parsedYear;

  const {data, totalPages} = await getListings({
    pagination: {
      page,
      pageSize: 3,
    },
    filters: {
      maxPrice,
      minPrice,
      year,
      status: ["for-sale"]
    }
  });

  const userWatchList = await getUserWatchList();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  let verifiedToken: DecodedIdToken | null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <FiltersForm />
          </Suspense>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {data.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative">
                <div className="flex flex-col gap-2 p-2.5">
                  {(!verifiedToken || !verifiedToken.admin) && (
                    <ToggleWatchingButton 
                      isWatching={userWatchList[listing.id]} 
                      listingId={listing.id} 
                    />
                  )}
                </div>
                  <CardHeader>
                    <CardTitle className="mb-1">{listing.make} {listing.model}</CardTitle>
                  </CardHeader>
                <CardContent>
                  <Image 
                    className="object-cover"
                    src="/assets/images/classified-placeholder.jpeg" 
                    alt={listing.make} 
                    width={400} 
                    height={400}
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex">
                    <div className="flex gap-4">
                      <div className="flex">
                        <Link href={`/listing/${listing.id}`}>
                          <Button className="mt-2.5">See Details</Button>
                        </Link>
                      </div>
                      <div className="flex">
                        <p className="text-1xl mt-3">
                          ${numeral(listing.price).format("0,0")}
                        </p>
                      </div>
                      <div className="flex gap-1.5 text-xs mt-3">
                        <Calendar1 /> {listing.year}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </div>
            </Card>
        ))}
      </div>
    </div>
  )
}

export default VehiclesPage