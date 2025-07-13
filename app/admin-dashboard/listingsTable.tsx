import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getListings } from "../data/listings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon, PencilIcon } from "lucide-react";
import numeral from 'numeral';
import ListingStatusBadge from "@/components/ListingStatusBadge";

export default async function ListingsTable({
    page = 1
}: {
    page?: number
}) {
    const { data, totalPages } = await getListings({
        pagination: {
            page
        }
    });

    return (
        <div className="bg-zinc-300 mt-5">
            {!data && (
                <h1 className="text-zinc-200 text-center py-20 font-bold text-3xl">
                    You have no listings
                </h1>
            )}
            {!!data && (
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Make
                            </TableHead>
                            <TableHead>
                                Model
                            </TableHead>
                            <TableHead>
                                Listing Price
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(listing => {
                            return (
                                <TableRow key={listing.id}>
                                    <TableCell>{listing.make}</TableCell>
                                    <TableCell>{listing.model}</TableCell>
                                    <TableCell>
                                        ${numeral(listing.price).format("0,0")}
                                    </TableCell>
                                    <TableCell>
                                        <ListingStatusBadge status={listing.status}/>
                                    </TableCell>
                                    <TableCell className="flex justify-end gap-1">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/listing/${listing.id}`}>
                                                <EyeIcon />
                                            </Link>
                                        </Button> 
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/admin-dashboard/edit/${listing.id}`}>
                                                <PencilIcon />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                {Array.from({length: totalPages}).map((_, i) => (
                                    <Button 
                                        disabled={page === i + 1} 
                                        key={i} 
                                        asChild={page !== i + 1}
                                        variant="outline" 
                                        className="mx-1"
                                    >
                                        <Link href={`/admin-dashboard?page=${i + 1}`}>
                                            {i + 1}
                                        </Link>
                                    </Button>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
        </div>
    )
}