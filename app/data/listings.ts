import "server-only"

import { ListingStatus } from "@/types/listingStatus";
import { firestore, getTotalPages } from "@/firebase/server";
import { Listing } from "@/types/listing";

type GetListingsOptions = {
    filters?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        status?: ListingStatus[] | null;
    },
    pagination?: {
        pageSize?: number;
        page?: number;
    }
}

// Retrieve listings by filters and page size
export const getListings = async (options?: GetListingsOptions) => {
    const page = options?.pagination?.page || 1;
    const pageSize = options?.pagination?.pageSize || 8;
    const { minPrice, maxPrice, status } = options?.filters || {};

    let listingsQuery = firestore.collection("listings").orderBy("updated", "desc");

    if (minPrice !== null && minPrice !== undefined) {
        listingsQuery = listingsQuery.where("price", ">=", minPrice);
    }

    if (maxPrice !== null && maxPrice !== undefined) {
        listingsQuery = listingsQuery.where("price", "<=", maxPrice);
    }

    if (status) {
        listingsQuery = listingsQuery.where("status", "in", status);
    }

    const totalPages = await getTotalPages(listingsQuery, pageSize);

    const listingsSnapshot = await listingsQuery
        .limit(pageSize)
        .offset((page - 1) * pageSize).get();

        const listings = listingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Listing));

        return { data : listings, totalPages };
}

// Retrieve a single listing by its ID
export const getListingById = async (listingId: string) => {
    const listingSnapshot = await firestore
        .collection("listings")
        .doc(listingId)
        .get()

        const listingData = { id: listingSnapshot.id, ...listingSnapshot.data() } as Listing;
        return listingData;
}

export const getListingsById = async (listingIds: string[]) => {
    if (!listingIds.length) {
        return[];
    }
    const listingsSnapshot = await firestore
        .collection("listings")
        .where("__name__", "in", listingIds)
        .get();

        const listingsData = listingsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        } as Listing)
    );
    return listingsData;
}