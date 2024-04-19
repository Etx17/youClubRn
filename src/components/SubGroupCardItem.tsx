import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../themes/colors";
import AddressDetails from "./AddressDetails";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { useMutation } from "@apollo/client";
import { DELETE_SCHEDULE } from "../screens/ActivityDetailsScreen/mutations";
import { ActivityIndicator } from "react-native-paper";
import ApiErrorMessage from "./apiErrorMessage/ApiErrorMessage";
import { formatDate } from "../utils/dateUtils";


const SubGroupCardItem = ({subgroup, onDeletePress, refetchActivityData }) => {
  const {user} = useAuthContext();
  const navigation = useNavigation();
  const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const [schedules, setSchedules] = useState([]);
  const possibleTypeOfActivity= ['cours collectif', 'cours particulier', 'stage', 'atelier', 'session', 'évènement', 'autre'];
  const [deleteSchedule, { data, loading, error }] = useMutation(DELETE_SCHEDULE, {
    onCompleted: () => {
      refetchActivityData();
    }
  });

  const handleDeletePress = () => {
    Alert.alert(
      "Supprimer le sous-groupe",
      "Êtes-vous sûr de vouloir supprimer ce sous-groupe ? Cette action est irréversible.",
      [ { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onDeletePress }
      ]
    );
  };
  const handleDeleteSchedule = async (id: any) => {
    await deleteSchedule({ variables: {input: { id: id } } })
    .catch((error) => {
      console.log(error);
    })
  };

  useEffect(() => {
    if (!subgroup) return;
    setSchedules(subgroup.schedules);
  }, [subgroup]);

  if(loading) return (<ActivityIndicator animating={true} color={colors.primary} />);
  if(error){
    return (
    <ApiErrorMessage
      title="Une erreur est survenue"
      message={error?.message || "Veuillez réessayer"}
    />
    )
  }
  console.log(subgroup?.schedules[0], '<--- SUBGROUP.SCHEDULES[0]')
  return (
      <View style={{marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 10, backgroundColor: colors.text }}>
        <Text style={styles.subCategoryTag}>{subgroup.name}</Text>

        {/* Type de cours */}
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          { subgroup.classType && <Text style={{color: colors.grayDarkest, margin: 5, textTransform: 'uppercase'}}>{subgroup.classType}</Text> }
          { subgroup.classType == "event" && (
            <Text style={{color: colors.grayDarkest}}>Le {subgroup.startDate} à {subgroup.startTime}</Text>
          ) }
        </View>

        {/* Description */}
        <Text style={{color: colors.grayDark, margin: 5}}>{subgroup.shortDescription}</Text>

        {/* Adresse et prix minimal */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%"}}>
          <Text style={styles.small}>À partir de <Text style={styles.object}>{subgroup.minPrice}€</Text></Text>
          {/* <AddressDetails address={subgroup.address} postalCode={subgroup.postal_code}/> */}
        </View>



        {/* Tarifications */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: 20 }}>
          {subgroup?.tarifications.map((tarification: any, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={{color: 'white'}}>
                {tarification.amount}€ / {tarification.recurrence}  {/* Accessing amount property of tarification object */}
              </Text>
            </View>
          ))}
        </View>

          {/* Schedules */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            subgroup?.schedules && subgroup?.schedules.length > 0 && subgroup?.schedules?.map((schedule, index:number) => (

              <View key={index} style={{ margin: 5, borderRadius: 14, borderTopWidth: 1, borderTopColor: '#666666', borderLeftWidth: 2, borderLeftColor: "#333333" ,padding: 10, backgroundColor: "#333339" }}>
                <Text style={styles.dayLabel}>{schedule.day}</Text>
                {
                  schedule?.timeSlots && schedule?.timeSlots?.map((time, timeIndex:number) => (
                    <Text key={timeIndex} style={styles.timespan}>{formatDate(time.startTime)} - {formatDate(time.endTime)}</Text>
                  ))
                }
                { user?.role === 'club' && (
                  // Delete button on top right of the parent view
                  <Pressable
                    onPress={() => {
                      Alert.alert(
                        "Delete Schedule",
                        "Are you sure you want to delete this schedule?",
                        [
                          { text: "Cancel", style: "cancel" },
                          { text: "OK", onPress: () => handleDeleteSchedule(schedule.id) }
                        ]
                      );
                    }}
                    style={{position: 'absolute', top: -8, right: -8, padding: 0, backgroundColor: colors.primary, borderRadius: 20}}>
                    <Ionicons name='close-outline' size={18} color={colors.black} />
                  </Pressable>
                )}
                { user?.role === 'club' && (
                  <Pressable onPress={() => navigation.navigate(
                    "EditSubGroupSchedule",
                    {
                      refetchActivityData: refetchActivityData,
                      scheduleId: schedule.id,
                      day: schedule.day,
                      subGroupId: subgroup.id,
                  })}>
                    <Text style={{color: colors.grayDarkest, marginTop: 5, textAlign: 'center', fontSize: 12}}>
                      Modifier
                    </Text>
                  </Pressable>
                )}
              </View>
            ))
          }

          { user?.role === 'club' && subgroup?.schedules?.filter(schedule => schedule.day !== 'id' && schedule.day !== 'sub_group_id').length < 7 && (
            <Pressable onPress={() => navigation.navigate('NewSubGroupSchedule', {subgroup: subgroup, refetchActivityData: refetchActivityData})} style={{marginTop: 10, borderRadius: 25, borderWidth: 1, borderColor: '#666666',padding: 5, backgroundColor: "#333339", width: "100%" }}>
                <Text style={{fontSize: 14, color: colors.primary, textAlign: 'center'}}>
                  Ajouter un horaire
                </Text>
            </Pressable>
          )}
        </View>

        { user?.role === 'club' && (
          // Delete button on top right of the parent view
          <Pressable
            onPress={handleDeletePress}
            style={{position: 'absolute', top: -8, right: -4, padding: 5, borderWidth: 1, borderRadius: 20, backgroundColor: colors.primary}}>
            <Ionicons name='close-outline' size={18} color={"black"} />
          </Pressable>
        )}

        { user?.role === 'club' && (
          // Edit button on top right of the parent view
          <Pressable
            onPress={() => navigation.navigate('EditSubGroup', {subgroup: subgroup, refetchActivityData: refetchActivityData})}
            style={{position: 'absolute', top: -8, right: 30, padding: 5, borderWidth: 1, borderRadius: 20, backgroundColor: colors.primary}}>
            <Entypo name="edit" size={18} color="black" />
          </Pressable>
        )}

      </View>
    );
  };

  const styles = StyleSheet.create({
    recurrentSubscriptionLabel:{
      fontSize: 20,
      color: colors.grayDark,
      padding:5,
      fontWeight: 'bold',
    },
    object: {
        fontSize: 25,
        color: colors.white,
        padding: 5,
        maxWidth: "33%",
        fontWeight: 'bold',
      },
      dayLabel: {
        fontSize: 13,
        textTransform: 'uppercase',
        color: colors.primary,
      },
      timespan: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
      },
      subCategoryTag:{
        marginVertical: 0,
        fontSize: 18,
        color: colors.primary,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        width: "auto",
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      small: {
        fontSize: 12,
        color: colors.grayDarkest,
        padding: 5,
      },
      tag: {
        marginVertical: 5,
        fontSize: 24,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        borderRadius: 14,
        overflow: 'hidden',
        borderColor: colors.violetLighter,
        borderWidth: 1,
        width: "auto",
        marginHorizontal: 4,
      },
      // title: {
      //   fontSize: 25,
      //   fontWeight: 'bold',
      //   color: 'white',
      //   width: "80%",
      //   textTransform: 'uppercase',
      //   paddingHorizontal: 5,
      // }
  })

  export default SubGroupCardItem;
