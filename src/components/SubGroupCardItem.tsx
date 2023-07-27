import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../themes/colors";
import AddressDetails from "./AddressDetails";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';



const SubGroupCardItem = ({subgroup, onDeletePress }) => {
  const {user} = useAuthContext();
  const navigation = useNavigation();
  const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const [schedules, setSchedules] = useState(subgroup.schedules);
  const possibleTypeOfActivity= ['cours collectif', 'cours particulier', 'stage', 'atelier', 'session', 'évènement', 'autre'];
  const handleDeletePress = () => {
    Alert.alert(
      "Supprimer le sous-groupe",
      "Êtes-vous sûr de vouloir supprimer ce sous-groupe ? Cette action est irréversible.",
      [ { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: onDeletePress }
      ]
    );
  };
  const handleDeleteSchedule = (day) => {
    setSchedules(prevSchedules => {
      const newSchedules = { ...prevSchedules };
      delete newSchedules[day];
      return newSchedules;
    });
  };

  useEffect(() => {
    setSchedules(subgroup.schedules);
  }, [subgroup]);

  console.log(subgroup.schedules,'this is subgroup.schedules')

  return (
      <View style={{marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 10, backgroundColor: colors.text }}>
        <Text style={styles.subCategoryTag}>{subgroup.name}</Text>

        {/* Type de cours */}
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          { subgroup.type && <Text style={{color: colors.grayDarkest, margin: 5, textTransform: 'uppercase'}}>{subgroup.type}</Text> }
          { subgroup.type == "event" && (
            <Text style={{color: colors.grayDarkest}}>Le {subgroup.start_date} à {subgroup.start_time}</Text>
          ) }
        </View>

        {/* Description */}
        <Text style={{color: colors.grayDark, margin: 5}}>{subgroup.short_description}</Text>

        {/* Adresse et prix minimal */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%"}}>
          <Text style={styles.small}>À partir de <Text style={styles.object}>{subgroup.min_price}€</Text></Text>
          <AddressDetails address={subgroup.address} postalCode={subgroup.postal_code}/>
        </View>



        {/* Tarifications */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: 20 }}>
        {subgroup.tarifications.map((tarif, index) => (
          <View style={styles.tag}>
            <Text key={index} style={{color: 'white'}}>
              {tarif}
            </Text>
          </View>
        ))}

      </View>

        {/* <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            Object.keys(schedules)
            .filter(day => day !== 'id' && day !== 'sub_group_id')
            .sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
            .map((day, index) => (
              <View key={index} style={{ margin: 5, borderRadius: 14, borderTopWidth: 1, borderTopColor: '#666666', borderLeftWidth: 2, borderLeftColor: "#333333" ,padding: 10, backgroundColor: "#333339" }}>
                <Text style={styles.dayLabel}>{day}</Text>
                {subgroup.schedule[day].map((time, index) => (
                  <Text key={index} style={styles.timespan}>{time.startTime} - {time.endTime}</Text>
                ))}
                { user.role === 'club' && (
                  // Delete button on top right of the parent view
                  <Pressable
                    onPress={() => {
                      Alert.alert(
                        "Delete Schedule",
                        "Are you sure you want to delete this schedule?",
                        [
                          { text: "Cancel", style: "cancel" },
                          { text: "OK", onPress: () => handleDeleteSchedule(day) }
                        ]
                      );
                    }}
                    style={{position: 'absolute', top: -8, right: -8, padding: 0, backgroundColor: colors.primary, borderRadius: 20}}>
                    <Ionicons name='close-outline' size={18} color={colors.black} />
                  </Pressable>
                )}
                { user.role === 'club' && (
                  <Pressable onPress={() => navigation.navigate("EditSubGroupSchedule", {schedules: subgroup?.schedule[day], day: day, subGroupId: subgroup?.schedule.sub_group_id  })}><Text style={{color: colors.grayDarkest, marginTop: 5, textAlign: 'center', fontSize: 12}}>Modifier</Text></Pressable>
                )}
              </View>
            ))
          }

          { user.role === 'club' && Object.keys(subgroup.schedule).filter(day => day !== 'id' && day !== 'sub_group_id').length < 7 && (
            <Pressable onPress={() => navigation.navigate('NewSubGroupSchedule', {schedule: subgroup.schedule})} style={{marginTop: 10, borderRadius: 25, borderWidth: 1, borderColor: '#666666',padding: 5, backgroundColor: "#333339", width: "100%" }}>
                <Text style={{fontSize: 14, color: colors.primary, textAlign: 'center'}}> Ajouter un horaire </Text>
            </Pressable>
          )}
        </View> */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            subgroup?.schedules?.map((schedule, index) => (
              <View key={index} style={{ margin: 5, borderRadius: 14, borderTopWidth: 1, borderTopColor: '#666666', borderLeftWidth: 2, borderLeftColor: "#333333" ,padding: 10, backgroundColor: "#333339" }}>
                <Text style={styles.dayLabel}>{schedule.day}</Text>
                {schedule.time_slots.map((time, timeIndex) => (
                  <Text key={timeIndex} style={styles.timespan}>{time.startTime} - {time.endTime}</Text>
                ))}
                { user.role === 'club' && (
                  // Delete button on top right of the parent view
                  <Pressable
                    onPress={() => {
                      Alert.alert(
                        "Delete Schedule",
                        "Are you sure you want to delete this schedule?",
                        [
                          { text: "Cancel", style: "cancel" },
                          { text: "OK", onPress: () => handleDeleteSchedule(schedule.day) }
                        ]
                      );
                    }}
                    style={{position: 'absolute', top: -8, right: -8, padding: 0, backgroundColor: colors.primary, borderRadius: 20}}>
                    <Ionicons name='close-outline' size={18} color={colors.black} />
                  </Pressable>
                )}
                { user.role === 'club' && (
                  <Pressable onPress={() => navigation.navigate("EditSubGroupSchedule", {schedules: schedule.time_slots, day: schedule.day, subGroupId: schedule.sub_group_id })}><Text style={{color: colors.grayDarkest, marginTop: 5, textAlign: 'center', fontSize: 12}}>Modifier</Text></Pressable>
                )}
              </View>
            ))
          }

          { user.role === 'club' && subgroup?.schedules?.filter(schedule => schedule.day !== 'id' && schedule.day !== 'sub_group_id').length < 7 && (
            <Pressable onPress={() => navigation.navigate('NewSubGroupSchedule', {schedule: subgroup.schedules})} style={{marginTop: 10, borderRadius: 25, borderWidth: 1, borderColor: '#666666',padding: 5, backgroundColor: "#333339", width: "100%" }}>
                <Text style={{fontSize: 14, color: colors.primary, textAlign: 'center'}}> Ajouter un horaire </Text>
            </Pressable>
          )}
        </View>

        { user.role === 'club' && (
          // Delete button on top right of the parent view
          <Pressable
            onPress={handleDeletePress}
            style={{position: 'absolute', top: -8, right: -4, padding: 5, borderWidth: 1, borderRadius: 20, backgroundColor: colors.primary}}>
            <Ionicons name='close-outline' size={18} color={"black"} />
          </Pressable>
        )}

        { user.role === 'club' && (
          // Delete button on top right of the parent view
          <Pressable
            onPress={() => navigation.navigate('EditSubGroup', {subgroup: subgroup})}
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
