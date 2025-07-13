import { getListingsById } from "@/app/data/listings";
import { getUserWatchList } from "@/app/data/watching";
import ListingStatusBadge from "@/components/ListingStatusBadge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import RemoveWatchListButton from "./removeWatchListButton";
import { redirect } from "next/navigation";

const WatchListPage = async ({
  searchParams
}: {
  searchParams: Promise<any>
}) => {
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;
  const pageSize = 3;
  const watchList = await getUserWatchList();
  const allWatching = Object.keys(watchList);
  const totalPages = Math.ceil(allWatching.length / pageSize);

  const paginatedWatchList = allWatching.slice(
    (page - 1) * pageSize, 
    page * pageSize
  );

  if (!paginatedWatchList.length && page > 1) {
    redirect(`/account/watch-list?page=${totalPages}`);
  }

  const listings = await getListingsById(paginatedWatchList);
  console.log({paginatedWatchList, listings})

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold py-4 mt-5 text-white">My Watch List</h1>
      {!paginatedWatchList.length && (
        <h2 className="text-center text-zinc-400 text-2xl font-bold py-10">
          You have no vehicles in your watch list.
        </h2>
      )}

      {!!paginatedWatchList.length && (
        <Table className="mt-4 bg-zinc-300">
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedWatchList.map((watching) => {
              const vehicle = listings.find(listing => listing.id === watching);
              const name = [
                vehicle?.year,
                vehicle?.make,
                vehicle?.model,
              ]
              .filter((vehicleName) => !!vehicleName)
              .join(" ");

              return (
                <TableRow key={watching}>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    {!!vehicle && (
                      <ListingStatusBadge status={vehicle?.status} />
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end gap-1">
                      {!!vehicle && (
                        <>
                          <Button asChild variant="outline">
                            <Link href={`/listing/${vehicle.id}`}>
                              <EyeIcon />
                            </Link>
                          </Button>
                          <RemoveWatchListButton listingId={vehicle.id}/>
                        </>
                      )}
                  </TableCell>
                </TableRow>
              )})}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                {Array.from({length: totalPages}).map((_, i) => {
                  return (
                    <Button 
                      disabled={page === i + 1} 
                      key={i} 
                      asChild={page !== i + 1}
                      variant="outline" 
                      className="mx-1"
                    >
                      <Link href={`/account/watch-list?page=${i + 1}`}>
                        {i + 1}
                      </Link>
                    </Button>
                  )
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
    
  )
}

export default WatchListPage;