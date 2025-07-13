"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

import { listingSchema } from "@/validation/listingSchema";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "./ui/form";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import MultiImageUploader, { ImageUpload } from "./MultiImageUploader";

type Props = {
    handleSubmit: (data: z.infer<typeof listingSchema>) => void;
    submitButtonLabel: React.ReactNode;
    defaultValues?: z.infer<typeof listingSchema>
}

const ListingForm = ({ 
    handleSubmit, 
    submitButtonLabel,
    defaultValues 
}: Props) => {
    const combinedDefaultValues: z.infer<typeof listingSchema> = {
        ...{
            make: "",
            model: "",
            year: 0,
            vehicleType: "",
            price: 0,
            description: "",
            condition: "new",
            image: "",
            status: "draft",
            images: []
        },
        ...defaultValues,
    }

    const form = useForm<z.infer<typeof listingSchema>>({
        resolver: zodResolver(listingSchema),
        defaultValues: combinedDefaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <fieldset 
                        className="flex flex-col gap-2" 
                        disabled={form.formState.isSubmitting}
                    >
                        <FormField control={form.control} name="status" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Status
                                </FormLabel>
                                <FormControl>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">
                                                Draft
                                            </SelectItem>
                                            <SelectItem value="for-sale">
                                                For Sale
                                            </SelectItem>
                                            <SelectItem value="sold">
                                                Sold
                                            </SelectItem>
                                            <SelectItem value="withdrawn">
                                                Withdrawn
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="make" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Make
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="model" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Model
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="year" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Year
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="number"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="vehicleType" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Vehicle Type
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </fieldset>

                    <fieldset 
                        className="flex flex-col gap-2" 
                        disabled={form.formState.isSubmitting}
                    >
                        <FormField control={form.control} name="condition" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Condition
                                </FormLabel>
                                <FormControl>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">
                                                New
                                            </SelectItem>
                                            <SelectItem value="pre-owned">
                                                Pre-Owned
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="price" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Price
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="image" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Image URL
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={4} className="resize-none"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </fieldset>
                </div>

                <FormField control={form.control} name="images" render={({field}) => (
                    <FormItem>
                        <FormControl>
                        <MultiImageUploader 
                            onImagesChange={(images: ImageUpload[]) => {
                                form.setValue("images", images);
                            }}
                            images={field.value}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                
                <Button 
                    type="submit" 
                    className="max-w-md mx-auto mt-2 w-full flex gap-2"
                    disabled={form.formState.isSubmitting}
                >
                    {submitButtonLabel}
                </Button>
            </form>
        </Form>
    )
}

export default ListingForm;