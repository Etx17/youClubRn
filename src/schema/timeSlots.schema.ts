import {z} from 'zod';

export const TimeSlotsSchema = z.object({
    timeslots: z.array(z.object({
        // startTime: z.date().nullable(),
        // endTime: z.date().nullable(),
        startTime: z.string().nullable(),
        endTime: z.string().nullable(),
        isNew: z.boolean().optional(),
    })),
});

export type TimeSlots = z.infer<typeof TimeSlotsSchema>;
