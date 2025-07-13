"use client";

import { z } from 'zod';

import ListingForm from '@/components/ListingForm';
import { listingDataSchema } from '@/validation/listingSchema';
import { PlusCircleIcon } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { createListing } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const NewListingForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof listingDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const response = await createListing(data, token);

    if (!!response.error) {
      toast("There was an error in creating the new listing!")
      return;
    }

    if (!response.error) {
      toast("New listing created successfully!")
    }

    router.push("/admin-dashboard");
    console.log({ response });
  };

  return (
    <div>
      <ListingForm handleSubmit={handleSubmit} submitButtonLabel={<>
        <PlusCircleIcon /> Create Listing
      </>}/>
    </div>
  )
}

export default NewListingForm