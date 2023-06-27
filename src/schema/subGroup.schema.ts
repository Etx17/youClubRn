import {z} from 'zod';
const tarificationSchema = z.object({
    number: z.string().min(1).max(30).regex(/^\d+$/, "Veuillez entrer un nombre entier"),
    text: z.string().min(1).max(30).regex(/.*\D+.*/, "Ne peut pas contenir que des chiffres"),
  });

export const ActivitySchema = z.object({
    name: z.string().min(3).max(35).optional(),
    type: z.string().min(3).max(35).optional(),
    reccurence: z.string().min(3).max(35).optional(),
    minPrice: z.number().min(0).max(9999).optional(),
    shortDescription: z.string().min(10).max(500).optional(),
    address: z.string().optional(),
        
    
});

export type Activity = z.infer<typeof ActivitySchema>;

