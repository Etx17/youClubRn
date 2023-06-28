import {z} from 'zod';
const tarificationSchema = z.object({
  number: z.string()
    .min(1, 'Le numéro doit avoir au moins 1 caractère')
    .max(30, 'Le numéro ne peut pas dépasser 30 caractères')
    .refine(value => /^\d+$/.test(value), 'Veuillez entrer un nombre entier'),

  text: z.string()
    .min(1, 'Le texte doit avoir au moins 1 caractère')
    .max(30, 'Le texte ne peut pas dépasser 30 caractères')
    .refine(value => /.*\D+.*/.test(value), 'Ne peut pas contenir que des chiffres'),
});

export const SubGroupSchema = z.object({
  name: z.string().min(3, 'Le nom doit comporter au moins 3 caractères').max(35, 'Le nom ne peut pas dépasser 35 caractères').optional(),
  type: z.string().min(3, 'Le type doit comporter au moins 3 caractères').max(35, 'Le type ne peut pas dépasser 35 caractères').optional(),
  reccurence: z.string().min(3, 'La récurrence doit comporter au moins 3 caractères').max(35, 'La récurrence ne peut pas dépasser 35 caractères').optional(),
  minPrice: z.string()
    .min(1, 'Le prix minimal doit comporter au moins 1 caractère')
    .max(4, 'Le prix minimal ne peut pas dépasser 4 caractères')
    .refine(value => /^\d+$/.test(value), 'Veuillez entrer un nombre entier'),
  shortDescription: z.string().min(10, 'Doit comporter au moins 10 caractères').max(500, 'Ne peut pas dépasser 500 caractères').optional(),
  address: z.string().optional(),
  tarifications: z.array(tarificationSchema).optional(),
});

export type SubGroup = z.infer<typeof SubGroupSchema>;

