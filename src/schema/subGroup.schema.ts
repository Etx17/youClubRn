import {z} from 'zod';

export const ActivitySchema = z.object({
    // { 
    //     "id": "sg1", 
    //     "address": "4 rue du General Foy, 75017", 
    //     "name": "Découverte", 
    //     "price": "Gratuit", 
    //     "activity_id": "3",
    //     "reccurence": "",
    //     "type": "cours collectif",
    //     "short_description": "Le cours gratuit ne s'addresse qu'aux débutant, sans expérience. Il est obligatoire de s'inscrire ou de réserver.",
    //     "schedule": {
    //         "sub_group_id": "sg1",
    //         "id": "sc7",
    //         "lundi": ["19:00-19:30"],
    //         "mardi": ["20:00 - 21:30"]
    //     }
    // },
    name: z.string().min(3).max(35).optional(),
   
    short_description: z.string().min(10).max(500).optional(),
 
    address: z.string().optional(),
    price: z.string()
        .regex(/^(Gratuit|Payant)$/)
        .optional(),
        
    
});

export type Activity = z.infer<typeof ActivitySchema>;

