import { z } from 'zod';

export const listingDataSchema = z.object({
    make: z.string().min(1, "Make must contain a value"),
    model: z.string().min(1, "Model must contain a value"),
    year: z.coerce.number().positive("Year must be greater than zero"),
    vehicleType: z.string().min(1, "Vehicle type must contain a value"),
    price: z.coerce.number().positive("Price must be greater than zero"),
    description: z.string().min(40, "Description must contain at least 40 characters."),
    condition: z.enum(["new", "pre-owned"]),
    status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
});

export const listingImagesSchema = z.object({
    images: z.array(z.object({
        id: z.string(),
        url: z.string(),
        file: z.instanceof(File).optional()
    }))
})

export const listingSchema = listingDataSchema.and(listingImagesSchema);