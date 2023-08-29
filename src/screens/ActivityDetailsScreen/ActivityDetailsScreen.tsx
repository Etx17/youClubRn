import React, {createRef, useEffect, useRef, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, Pressable, ScrollView, Linking, ActivityIndicator } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../themes/colors'
import { Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DetailsCarousel from '../../components/DetailsCarousel'
import AddressDetails from '../../components/AddressDetails'
import InscriptionButton from '../../components/InscriptionButton'
import DescriptionSection from '../../components/DescriptionSection'
import TitleSection from '../../components/TitleSection'
import SubGroupsSection from '../../components/SubGroupsSection'
import SubGroupCardItem from '../../components/SubGroupCardItem'
import { useAuthContext } from '../../contexts/AuthContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from '@apollo/client'
import { GET_ACTIVITY } from './queries'
import ApiErrorMessage from '../../components/apiErrorMessage/ApiErrorMessage'
import { Storage } from 'aws-amplify'
import { DELETE_ACTIVITY, DELETE_SUB_GROUP } from './mutations'


interface ActivityDetailsParams {
    activityData: {
      id: string;
      name: string;
      objet: string;
      address: string;
      club_name: string;
      type: string;
      description: string;
      actual_zipcode: string;
      domaine_activite_libelle_categorise: string;
      sub_groups: [SubGroup];
    };
    images: string[];
    darkTheme?: boolean;
    onActivityDeleted?: () => void;
  }
  type SubGroup = {
    id: string,
    activityId: string,
    minPrice: number,
    name: string,
    shortDescription: string,
    address: string,
    schedules: [Schedule],
    price: string,
    reccurence: string,
    tarifications: []
  }

  type Schedule = {
    id: string,
    day: string,
    timeSlots: [{ start_time: string, end_time: string}]
  }

  type ActivityDetailsRoute = RouteProp<Record<string, ActivityDetailsParams>, string>;
const ActivityDetailsScreen = () => {
  const { user } = useAuthContext();
  console.log(user, 'this is user from authContext')
  const navigation = useNavigation()
  const route = useRoute<ActivityDetailsRoute>();
  const {darkTheme} = route?.params
  const [images, setImages] = useState([])
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [subGroups, setSubGroups] = useState([])
  const activityId = route?.params?.activityId || route?.params?.activityData?.id
  const {data, loading, error, refetch} = useQuery(GET_ACTIVITY, {variables: {id: activityId}})
  const imageKeys = data?.activity ? data?.activity.images : []
  const [deleteSubGroup, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_SUB_GROUP, {
    onCompleted: () => {
      Alert.alert('Sous-groupe supprimé')
      refetch()
    }
  });

  const [deleteActivity, { data: deleteActivityData, loading: deleteActivityLoading, error: deleteActivityError }] = useMutation(DELETE_ACTIVITY, {
    onCompleted: () => {
      Alert.alert('Activité supprimée')
    },
  });

  useEffect(() => {
    if (data?.activity?.subGroups) {
      setSubGroups(data?.activity?.subGroups)
    }
    if(data?.activity?.images){
      Promise.all(
        data?.activity?.images.map((imageKey) => Storage.get(imageKey))
      ).then((fetchedImages) => {
          setImages(fetchedImages);
      }).catch((error) => {
        console.error('Error fetching images', error);
      });
    }
  }, [data])

  const changeImage = (direction: String) => {
    if (direction === 'left') {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)

    }
  }


  const handleScrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleDeleteSubGroup = async (index: number, subGroupId: any) => {
    await deleteSubGroup({ variables: { input: { id: subGroupId } } }).then(() => {
    setSubGroups (prevSubGroups => prevSubGroups.filter((_, i) => i !== index))
    }).catch((error) => {
      console.error(error)
    })
  }

  const handleDeleteActivity = async () => {
    await deleteActivity({ variables: { input: { id: activityId } } }).then(() => {
      if (route.params?.onActivityDeleted) {
        route.params.onActivityDeleted();
      }
      navigation.goBack();
    }).catch((error) => {
      console.error(error)
    })
  }


  if(loading || deleteLoading){ return <ActivityIndicator/> }
  if(error || deleteError){
    return (
      <ApiErrorMessage
      title="Erreur, veuillez réessayer dans quelques instants"
      message={error?.message || 'User not found'}
      onRetry={()=>refetch()}
      />
      )
    }
    // console.log(data?.activity, "<==============================================data")
    const { id, name, address, fullDescription, actualZipcode } = data?.activity
    const ActivitySubGroups = data?.activity.subGroups


    return (
      <ScrollView ref={scrollViewRef} style={{backgroundColor: 'black'}}>
        {/* IMAGE CAROUSEL */}
        <DetailsCarousel images={images || []} currentImageIndex={currentImageIndex} changeImage={changeImage} />


        <View style={styles.contentContainer}>
          {/* Bouton de retourn qui est fixé contre le bas du DetailsCarousel */}

          <TitleSection
            title={name}
            onButtonPress={() => navigation.goBack()}
            onEditButtonPress={()=> navigation.navigate('EditActivityDetails', { activityData: data?.activity, images: images })}
            isEditButtonPresent={user?.role === "club"}
          />

          <AddressDetails address={address} postalCode={actualZipcode} />
          <Text style={{color: colors.primary}}>{data?.activity.club.name}</Text>
          { data?.activity.subGroups &&
            <Pressable onPress={handleScrollToEnd}>
              <SubGroupsSection subGroups={data?.activity.subGroups} activityId={id} />
            </Pressable>
          }

          <DescriptionSection description={fullDescription} />

          {data?.activity.subGroups && data?.activity.subGroups?.map((subgroup: SubGroup, index: number) => (
            <SubGroupCardItem
              key={index}
              subgroup={subgroup}
              onDeletePress={() => handleDeleteSubGroup(index, subgroup.id)}
              refetchActivityData={refetch}
              />
          ))}
          {user?.role === 'club' && (
          <Pressable onPress={() => navigation.navigate('NewSubGroup', {activityId: id, refetchActivityData: refetch})} style={styles.addActivityButton}>
              <Text style={{fontSize: 24, color: colors.primary,}}> + </Text>
          </Pressable>
        )}

          <InscriptionButton onPress={() => Alert.alert("Bientôt disponible", "Lorsque cette association aura récupéré son profil, elle pourra mettre en place l'inscription")} />

        </View>

        <LinearGradient colors={[darkTheme === true ? colors.dark : 'transparent', 'transparent']} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, }} />

        {/* Delete activity button for club owner */}
        {user?.role === 'club' && (
          <Pressable onPress={() => {
            Alert.alert(
              "Supprimer l'activité",
              "Êtes-vous sûr de vouloir supprimer cette activité ?",
              [
                {
                  text: "Annuler",
                  onPress: () => console.log("Cancel Pressed"),

                },
                { text: "Supprimer", onPress: () => handleDeleteActivity() }
              ]
            )
          }} style={styles.deleteActivityButton}>
              <Text style={{fontSize: 18, color: colors.danger}}> Delete activity</Text>
          </Pressable>
        )}



        <StatusBar style={darkTheme === true ? "light" : 'auto'} />

      </ScrollView>
    )
  }
  const buttonWidth = 45;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      maxHeight: "95%",
      borderBottomWidth: 0.8,
      borderBottomColor: 'lightgrey',
      borderRadius: 10,
    },
    image: {
      flex: 1,
      width: '100%',
      aspectRatio: 0.8,
    },
    contentContainer: {
      padding: 15,
      backgroundColor: 'black',
      flex: 1,
    },
    informationsContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    leftButton: {
      width: "50%",
      height: "100%",
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
    },
    rightButton: {
      width: "50%",
      height: "100%",
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    indexButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      position: 'absolute',
      paddingHorizontal: 5,
      overflow: 'hidden',
    },
    goBackButton: {
      backgroundColor: colors.primary,
      borderRadius: buttonWidth/2,
      width: buttonWidth,
      borderColor: 'black',
      borderWidth: 1,
      overflow: 'hidden',
      elevation: 8,
      position: 'absolute', //Here is the trick
      right: 10,
      bottom: 10,
    },
    addActivityButton: {
      marginTop: 10,
      fontSize: 24,
      paddingVertical: 0,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      borderColor: colors.primary,
      borderWidth: 1,
      width: "100%",
      marginHorizontal: 4,
    },
    deleteActivityButton: {
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      backgroundColor: 'black',
      borderColor: colors.danger,
      borderWidth: 1,
      paddingHorizontal: 6
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      width: "80%"
    },
    subTitle: {
      fontSize: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    object: {
      fontSize: 15,
      color: colors.white,
      padding: 5,
      maxWidth: "50%",
      fontWeight: 'bold',
    },
    dayLabel: {
      fontSize: 13,
      textTransform: 'uppercase',
      color: colors.primary,
    },
    timespan: {
      fontSize: 15,
      color: 'white',

    },
    subCategoryTag:{
      marginVertical: 0,
      fontSize: 14,
      color: colors.primary,
      paddingVertical: 4,
      alignSelf: 'flex-start',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      width: "auto",
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    tag: {
      marginTop: 10,
      fontSize: 14,
      color: colors.dark,
      paddingVertical: 4,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      borderRadius: 14,
      overflow: 'hidden',
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: colors.primary,
      width: "auto",
      marginHorizontal: 4,
    },
    signUpButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 16,
      marginVertical: 10,
      overflow: 'hidden',
      elevation: 8,
    },
    stickyButton: {
      position: 'absolute',
      top: 70,
      left: 10,
      backgroundColor: colors.primary,
      borderRadius: 25,
      padding: 10,
      zIndex: 2,
      elevation: 8,
    },
    stickyButtonText: {
      color: 'black',
      fontWeight: 'bold',
    },
  })

export default ActivityDetailsScreen
