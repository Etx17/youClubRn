import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../themes/colors";
import AddressDetails from "./AddressDetails";


const SubGroupCardItem = (subgroup) => {
  // console.log(Object.keys(subgroup.subgroup.schedule), 'this is object keys')
    // console.log(subgroup.subgroup.name, 'this is subgroup from component')
    return (
      <View style={{marginVertical: 10, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 10, backgroundColor: colors.text }}>
        <Text style={styles.subCategoryTag}>{subgroup.subgroup.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%"}}>
          <Text style={styles.object}>{subgroup.subgroup.price}€/{subgroup.subgroup.reccurence} </Text>
          {/* <Text style={styles.object}>{subgroup.subgroup.address}</Text> */}
          <AddressDetails address={subgroup.subgroup.address} postalCode={subgroup.subgroup.postal_code}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          { subgroup.subgroup.type && <Text style={{color: colors.grayDarkest, margin: 5, textTransform: 'uppercase'}}>{subgroup.subgroup.type}</Text> }
          { subgroup.subgroup.type == "event" && (
            <Text style={{color: colors.grayDarkest}}>Le {subgroup.subgroup.start_date} à {subgroup.subgroup.start_time}</Text>
          ) }
        </View>

        <Text style={{color: colors.grayDarkest, margin: 5}}>{subgroup.subgroup.short_description}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap'}}>
          
        {
          Object.keys(subgroup.subgroup.schedule)
          .filter(day => day !== 'id' && day !== 'sub_group_id')
          .map((day, index) => (
            <View key={index} style={{ margin: 5, borderRadius: 14, borderTopWidth: 1, borderTopColor: '#666666', borderLeftWidth: 2, borderLeftColor: "#333333" ,padding: 10, backgroundColor: "#333339" }}>
              <Text style={styles.dayLabel}>{day}</Text>
              {subgroup.subgroup.schedule[day].map((time, index) => (
                <Text key={index} style={styles.timespan}>{time}</Text>
              ))}
            </View>
          ))
        }

      

        </View>
        
        
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