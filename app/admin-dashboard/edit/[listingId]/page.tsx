import { getListingById } from "@/app/data/listings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import EditListingForm from "./EditListingForm";
import DeleteListingButton from "./DeleteListingButton";

export default async function EditListing({ params }: {
    params: Promise<any>
}) {
    const paramsValue = await params;
    const listing = await getListingById(paramsValue.listingId);

    return (
        <>
            <Link href="/admin-dashboard" className="text-white border-2 border-white p-2">
                Back
            </Link>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex justify-between">
                        Edit Listing
                        <DeleteListingButton listingId={listing.id}/>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditListingForm 
                        id={listing.id}
                        make={listing.make} 
                        model={listing.model} 
                        year={listing.year} 
                        vehicleType={listing.vehicleType} 
                        price={listing.price} 
                        description={listing.description}
                        condition={listing.condition}
                        status={listing.status}
                    />
                </CardContent>
            </Card>
        </>
    )
}