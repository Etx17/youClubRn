import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
type Location = {
  latitude: number;
  longitude: number;
};

type LocationPickerProps = {
  onLocationSelected: (location: Location) => void;
};

export const LocationPicker = ({ onLocationSelected, size }: any) => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>({
    latitude: 48.856614,
    longitude: 2.3522219,
  });

  const handlePress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleLocationSelection = () => {
    onLocationSelected(selectedLocation);
    setModalVisible(false);
  };

  return (
    <>
      <Pressable style={{marginRight: 10}} onPress={() => setModalVisible(true)}>
        <Ionicons name="location-sharp" size={size} color="black" />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
      >
        <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <Text style={styles.title}>Touchez pour choisir votre location</Text>
        <MapView
          style={{ flex: 1, paddingVertical: 50 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handlePress}
        >
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
            />
          )}
        </MapView>
        <Pressable style={styles.button} onPress={handleLocationSelection}>
          <Text>OK</Text>
        </Pressable>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})
