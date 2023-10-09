
export type RootNavigatorParamsList = {
    Home: undefined;
    ClubDetails: { clubId: string };
    ActivityDetails: { activityId: string };
    ClubHome: undefined;
    EditSubGroupSchedule: { activityId: string, subGroupId: string, scheduleId: string, day: string, schedules: string[] };
}


export type BottomTabNavigatorParamsList = {
    HomeTab: undefined
    Likes: undefined
    MyProfile: undefined
};

export type TopTabNavigatorParamsList = {
    Clubs: undefined
    Activités: undefined
};

export type LikesTopTabNavigatorParamsList = {
    Clubs: undefined
    Activités: undefined
};

export type ClubBottomTabNavigatorParamsList = {
    ClubDetails: { clubId: string }
    EditClubDetails: { clubId: string }
    NewActivity: { clubId: string }
    ClubActivitiesNavigator: undefined
};

export type ClubActivitiesNavigator = {
    ActivityDetails: { activityId: string }
    EditActivityDetails: { activityId: string }
    NewSubGroup: { activityId: string }
    EditSubGroup: { activityId: string, subGroupId: string }
    NewSubGroupSchedule: { activityId: string, subGroupId: string }
    EditSubGroupSchedule: { activityId: string, subGroupId: string, scheduleId: string }
};



