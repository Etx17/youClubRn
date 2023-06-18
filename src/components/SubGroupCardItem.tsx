import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../themes/colors";
import AddressDetails from "./AddressDetails";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/AuthContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons'; 



const SubGroupCardItem = (subgroup, activityId) => {
  const {user} = useAuthContext();
  const navigation = useNavigation();
  console.log(subgroup.subgroup.schedule, 'this is subgroup')
  const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    return (
      <View style={{marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 10, backgroundColor: colors.text }}>
        <Text style={styles.subCategoryTag}>{subgroup.subgroup.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%"}}>
          <Text style={styles.object}>{subgroup.subgroup.price}€/{subgroup.subgroup.reccurence} </Text>
          <AddressDetails address={subgroup.subgroup.address} postalCode={subgroup.subgroup.postal_code}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          { subgroup.subgroup.type && <Text style={{color: colors.grayDarkest, margin: 5, textTransform: 'uppercase'}}>{subgroup.subgroup.type}</Text> }
          { subgroup.subgroup.type == "event" && (
            <Text style={{color: colors.grayDarkest}}>Le {subgroup.subgroup.start_date} à {subgroup.subgroup.start_time}</Text>
          ) }
        </View>

        <Text style={{color: colors.grayDarkest, margin: 5}}>{subgroup.subgroup.short_description}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
          {

            Object.keys(subgroup.subgroup.schedule)
            .filter(day => day !== 'id' && day !== 'sub_group_id')
            .sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
            .map((day, index) => (
              <View key={index} style={{ margin: 5, borderRadius: 14, borderTopWidth: 1, borderTopColor: '#666666', borderLeftWidth: 2, borderLeftColor: "#333333" ,padding: 10, backgroundColor: "#333339" }}>
                <Text style={styles.dayLabel}>{day}</Text>
                {subgroup.subgroup.schedule[day].map((time, index) => (
                  <Text key={index} style={styles.timespan}>{time}</Text>
                ))}
                { user.role === 'club' && (
                  // Delete button on top right of the parent view 
                  <Pressable 
                    onPress={() => Alert.alert("Voir projet insta", "avec la modale pour supprimer qui apparait en bas")} 
                    style={{position: 'absolute', top: -8, right: -8, padding: 0, backgroundColor: colors.primary, borderRadius: 20}}>
                    <Ionicons name='close-outline' size={18} color={colors.black} />
                  </Pressable>
                )}
                { user.role === 'club' && (
                  <Pressable onPress={() => navigation.navigate("EditSubGroupSchedule", {subgroup: subgroup})}><Text style={{color: colors.grayDarkest, marginTop: 5, textAlign: 'center', fontSize: 12}}>Modifier</Text></Pressable>
                )}
              </View>
            ))
          }
          
          { user.role === 'club' && Object.keys(subgroup.subgroup.schedule).filter(day => day !== 'id' && day !== 'sub_group_id').length < 7 && (
            <Pressable onPress={() => navigation.navigate('NewSubGroup', {activityId: activityId})} style={{marginTop: 10, borderRadius: 25, borderWidth: 1, borderColor: '#666666',padding: 5, backgroundColor: "#333339", width: "100%" }}>
                <Text style={{fontSize: 14, color: colors.primary, textAlign: 'center'}}> Ajouter </Text>
            </Pressable>
          )}

        </View>

        { user.role === 'club' && (
          // Delete button on top right of the parent view 
          <Pressable 
            onPress={() => Alert.alert("Supprimer ? Voir projet insta", "avec la modale pour supprimer qui apparait en bas")} 
            style={{position: 'absolute', top: -8, right: -4, padding: 5, borderWidth: 1, borderRadius: 20, backgroundColor: colors.primary}}>
            <Ionicons name='close-outline' size={18} color={"black"} />
          </Pressable>
        )}

        { user.role === 'club' && (
          // Delete button on top right of the parent view 
          <Pressable 
            onPress={() => navigation.navigate('EditSubGroup', {subgroup: subgroup.subgroup})} 
            style={{position: 'absolute', top: -8, right: 30, padding: 5, borderWidth: 1, borderRadius: 20, backgroundColor: colors.primary}}>
            <Entypo name="edit" size={18} color="black" />
          </Pressable>
        )}
      
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    object: {
        fontSize: 15,
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
  })

  export default SubGroupCardItem;