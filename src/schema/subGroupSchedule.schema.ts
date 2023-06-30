import {z} from 'zod';

const HoursObject = z.object({
    start_time: z.string(),
    end_time: z.string(),
});
export const SubGroupScheduleSchema = z.object({
    // "schedule": {
    //     "sub_group_id": "sg1",
    //     "id": "sc10",
    //     "mardi": ["19:30 - 20:30", "20:30 - 21:30"],
    //     "samedi": ["16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00"]
    // }
    dayName: z.string(),
    schedules: z.array(z.object({
        startTime: z.date().nullable(),
        endTime: z.date().nullable(),
    })),

});

export type SubGroupSchedule = z.infer<typeof SubGroupScheduleSchema>;

