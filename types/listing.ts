import { ListingCondition } from "./listingCondition";
import { ListingStatus } from "./listingStatus";

export type Listing = {
    id: string;
    make: string;
    model: string;
    year: number;
    vehicleType: string;
    price: number;
    description: string;
    condition: ListingCondition;
    status: ListingStatus;
}