import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import ListingsTable from "./listingsTable";

const AdminDashboard = async ({
  searchParams
}: {
  searchParams?: Promise<any>
}) => {
  const searchParamsValue = await searchParams;
  return (
    <div>
      <h1 className="text-3xl font-bold mt-2 text-white">
        Admin Dashboard
      </h1>
      <Button asChild className="inline-flex pl-2 gap-2 mt-4">
        <Link href="/admin-dashboard/new">
          <PlusCircleIcon/> New Listing
        </Link>
      </Button>
      <ListingsTable page={searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1}/>
    </div>
  )
}

export default AdminDashboard;