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

const VehiclesPage = async () => {
  const { data } = await getListings();

  const userWatchList = await getUserWatchList();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  let verifiedToken: DecodedIdToken | null;

  if (token) {
    verifiedToken = await auth.verifyIdToken(token);
  }

  return (
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
                <Link href={`/listing/${listing.id}`}>
                  <Button className="mt-2.5">See Details</Button>
                </Link>
              </CardFooter>
            </div>
          </Card>
      ))}
    </div>
  )
}

export default VehiclesPage