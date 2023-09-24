import {z} from 'zod';

const HoursObject = z.object({
    start_time: z.string(),
    end_time: z.string(),
});
export const SubGroupScheduleSchema = z.object({
    dayName: z.string(),
    timeslots: z.array(z.object({
        startTime: z.date().nullable(),
        endTime: z.date().nullable(),
    })),

});

export type SubGroupSchedule = z.infer<typeof SubGroupScheduleSchema>;
