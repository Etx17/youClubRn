import {z} from 'zod';

export const ActivitySchema = z.object({
    // id: z.string(),
    name: z.string().min(3).max(35).optional(),
    // rna_number: z.string(),
    // geo_point: z.string(),
    // category: z.string(),
    // subcategory: z.string(),
    description: z.string().min(10).max(500).optional(),
    shortDescription: z.string().min(5).max(100).optional(),
    images: z.array(z.string()).optional(),
    // email: z.string(),
    // phone: z.string(),
    // is_premium: z.boolean(),
    // city: z.string(),
    address: z.string().optional(),
    pricingTypes: z.array(z.string()).optional(),
    // actual_zipcode: z.string(),
    // department: z.string(),
    // region: z.string(),
    // country: z.string(),
    // latitude: z.string(),
    // longitude: z.string(),
    // created_at: z.string(),
    // updated_at: z.string(),
    // deleted_at: z.string(),

});

export type Activity = z.infer<typeof ActivitySchema>;
