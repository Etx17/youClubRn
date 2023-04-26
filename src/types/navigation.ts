export type RootNavigatorParamsList = {
    Home: undefined;
    ClubDetails: { clubId: string };
}
// export type CreateCommentRouteProp = RouteProp<
//   RootNavigatorParamsList,
//  'Comments'
//  >;
 
// export type CommentsRouteProp = RouteProp<
// RootNavigatorParamsList,
// 'Comments'
// >;

export type BottomTabNavigatorParamsList = {
    HomeTab: undefined
    Likes: undefined
    MyProfile: undefined
};

// export type SearchTabTabNavigatorParamsList = {
//     Users: undefined
//     Posts: undefined
// };

// export type UploadStackNavigationParamsList = {
//   Camera: undefined
//   Create: {
//     image?: string;
//     images?: string[];
//     video?: string;
//   }
// };

// export type CreateRouteProp = RouteProp<
//   UploadStackNavigationParamsList,
//  'Create'
//  >;

//  export type CreateNavigationProp = RouteProp<
//   UploadStackNavigationParamsList,
//  'Create'
//  >;

// export type CameraNavigationProp = NativeStackNavigationProp<
//     UploadStackNavigationParamsList,
//     'Camera'
// >

// export type MyProfileNavigationProp = BottomTabNavigationProp<
//     BottomTabNavigatorParamsList,
//     'MyProfile'
// >;

// export type MyProfileRouteProp = RouteProp<
// BottomTabNavigatorParamsList,
//     'MyProfile'
// >;

// export type HomeStackNavigatorParamsList = {
//     Feed: undefined
//     UserProfile: {userId: string}
//     UpdatePost: {postId: string}
//     PostLikes: {postId: string}
// }

// export type PostLikesRouteProp = RouteProp<
// HomeStackNavigator
//     HomeStackNavigatorParamsList,
//     'PostLikes'
// >;

// export type UpdatePostRouteProp = RouteProp<