import React, { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Linking } from 'react-native';

type LocationContextType ={
    lat: number | string ;
    lon: number | string ;
    city: string | null;
    region: string | null;
    zipcode: string ;
    subregion: string | null;
    allowLocation: boolean;
    updateLocation: (newLocation: ILocation, newZipcode: string, newCity: string | null, newRegion: string | null, newSubregion: string | null) => void;
}

type ILocation ={
    coords: {
        latitude: number;
        longitude: number;
    }
}

export const LocationContext = createContext<LocationContextType>({
    lat: "",
    lon: "",
    city: "",
    region: "",
    zipcode: "",
    subregion: "",
    allowLocation: false,
    updateLocation: () => {}
})



const LocationContextProvider = ({children}: {children: ReactNode}) => {
    const [location, setLocation] = useState<ILocation>({coords: {}} as ILocation);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [city, setCity] = useState<string | null>('');
    const [zipCode, setZipCode] = useState<string | null>('');
    const [region, setRegion] = useState<string | null>('');
    const [subregion, setSubregion] = useState<string | null>('');
    const EXPIRATION_TIME = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
    const [allowLocation, setAllowLocation] = useState<boolean>(false);
    const updateLocation = async (newLocation: ILocation, newZipcode: string | null, newCity: string | null, newRegion: string | null, newSubregion: string | null) => {
      await setLocation(newLocation);
      await setZipCode(newZipcode);
      await setCity(newCity);
      await setRegion(newRegion);
      await setSubregion(newSubregion);
    };

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== 'granted') {
          // Si pas authorisé, on définit des valeurs par défaut
          setLocation({ coords: {latitude: 48.8566, longitude: 2.3522}});  // Example: Paris
          setCity('Paris');
          setRegion('Île-de-France');
          setSubregion('Paris');
          setZipCode('75017');
          setAllowLocation(false);
          return;
        } else {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setAllowLocation(true);
        }



        const storedLocation = JSON.parse(await AsyncStorage.getItem('lastLocation') || 'null');

        const storedCity = await AsyncStorage.getItem('lastGeocodedCity');

        const storedRegion = await AsyncStorage.getItem('lastGeocodedRegion');

        const storedSubregion = await AsyncStorage.getItem('lastGeocodedSubregion');

        const storedZipcode = await AsyncStorage.getItem('lastGeocodedZipcode')

        if (storedLocation && storedCity && storedRegion && storedSubregion && storedZipcode) {
          const storedTimestamp = JSON.parse(await AsyncStorage.getItem('lastLocationTimestamp') || 'null');
          const currentTime = new Date().getTime();

          // Check if the stored data is within the expiration time
          if (storedTimestamp && currentTime - storedTimestamp <= EXPIRATION_TIME ) {
            console.log('Using stored location as it is within the expiration time for again : number of seconds: ', (currentTime - storedTimestamp) / 1000 );
            setLocation({ coords: storedLocation });
            setCity(storedCity);
            setRegion(storedRegion);
            setSubregion(storedSubregion);
            setZipCode(storedZipcode);
            return;
          }
        }

        console.log('Getting current position as storage info about location was not complete...');
        let deviceLocation = await Location.getLastKnownPositionAsync({}); // Use getLastKnownPositionAsync()
        if (!deviceLocation) {
          console.log('Last known position not available, getting current position...');
          deviceLocation = await Location.getCurrentPositionAsync({});
        }
        const locationObject = {
          latitude: deviceLocation.coords.latitude,
          longitude: deviceLocation.coords.longitude
        };
        console.log(locationObject, 'got a locationObject')
        setLocation(deviceLocation);

        const geocodeData = await Location.reverseGeocodeAsync(locationObject);
        if (geocodeData && geocodeData.length > 0) {
          console.log(geocodeData, 'geocodeData')
          const currentCity = geocodeData[0].city;
          const currentRegion = geocodeData[0].region;
          const currentSubregion = geocodeData[0].subregion;
          const currentZipCode = geocodeData[0].postalCode;
          setCity(currentCity);
          setRegion(currentRegion);
          setSubregion(currentSubregion);
          setZipCode(currentZipCode);
          if (currentRegion !== null) {
          AsyncStorage.setItem('lastGeocodedRegion', currentRegion);
          }
          if (currentCity !== null){
          AsyncStorage.setItem('lastGeocodedCity', currentCity);
          }
          if (currentSubregion !== null){
              AsyncStorage.setItem('lastGeocodedSubregion', currentSubregion);
          }
          if (currentZipCode !== null){
            AsyncStorage.setItem('lastGeocodedZipcode', currentZipCode);
        }
          AsyncStorage.setItem('lastLocation', JSON.stringify(locationObject));
          AsyncStorage.setItem('lastLocationTimestamp', JSON.stringify(new Date().getTime()));
        } else {
          console.error('Could not geocode city');
        }
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <LocationContext.Provider value={{lat: location?.coords?.latitude, lon: location?.coords?.longitude, city: city, region: region, subregion: subregion, allowLocation: allowLocation, updateLocation, zipcode: zipCode }}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider;
export const useLocationContext = () => useContext(LocationContext)
