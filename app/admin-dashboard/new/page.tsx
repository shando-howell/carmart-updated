import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NewListingForm from "./NewListingForm"
import Link from "next/link"

const NewListing = () => {
  return (
    <div>
        <Link href="/admin-dashboard" className="text-white border-2 border-white p-2">
            Back
        </Link>

        <Card className="mt-5">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    New Listing
                </CardTitle>
            </CardHeader>
            <CardContent>
                <NewListingForm />
            </CardContent>
        </Card>
    </div>
  )
}

export default NewListing