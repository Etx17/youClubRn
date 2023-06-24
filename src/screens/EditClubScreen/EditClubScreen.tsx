import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const EditClubScreen = () => {
  return (
    <View>
      <Text>EditClubScreen</Text>
      <Button onPress={()=> Alert.alert('Envoyer a l API')}mode='elevated' textColor='black'>Enregistrer</Button>
    </View>
  )
}

export default EditClubScreen