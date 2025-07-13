import { ListingStatus } from "@/types/listingStatus"
import { Badge } from "./ui/badge";

const statusLabel = {
    "for-sale": "For Sale",
    withdrawn: "Withdrawn",
    draft: "Draft",
    sold: "Sold",
};

const variant: {
    [key: string]: "primary" | "destructive" | "secondary" | "success";
} = {
    "for-sale": "primary",
    withdrawn: "destructive",
    draft: "secondary",
    sold: "success",
}

const ListingStatusBadge = ({
    status,
    className
}: {
    status: ListingStatus;
    className?: string;
}) => {
    const label = statusLabel[status];

    return (
        <Badge variant={variant[status]} className={className}>
            {label}
        </Badge>
    )
}

export default ListingStatusBadge