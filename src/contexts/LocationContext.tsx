import { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
type LocationContextType ={
    lat: number | string ;
    lon: number | string ;
    city: string | null;
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
    city: ""    
})



const LocationContextProvider = ({children}: {children: ReactNode}) => {
    const [location, setLocation] = useState<ILocation>({coords: {}} as ILocation);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [city, setCity] = useState<string | null>('');
    useEffect(() => {
        (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let deviceLocation = await Location.getCurrentPositionAsync({});
        setLocation(deviceLocation);
        
        const locationObject = {
            latitude: deviceLocation.coords.latitude,
            longitude: deviceLocation.coords.longitude
        }

        const storedCity = await AsyncStorage.getItem('lastGeocodedCity');
        const storedLocation = JSON.parse(await AsyncStorage.getItem('lastLocation') || 'null');

        if (storedCity && storedLocation) {
            const { latitude: storedLatitude, longitude: storedLongitude } = storedLocation;
            if (storedLatitude === locationObject.latitude && storedLongitude === locationObject.longitude) {
                setCity(storedCity);
            return;
            }
        }

        const geocodeData = await Location.reverseGeocodeAsync(locationObject);
        if (geocodeData && geocodeData.length > 0) {
            const currentCity = geocodeData[0].city;
            setCity(currentCity);
            AsyncStorage.setItem('lastGeocodedCity', currentCity);
            AsyncStorage.setItem('lastLocation', JSON.stringify(locationObject));
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
        <LocationContext.Provider value={{lat: location?.coords?.latitude, lon: location?.coords?.longitude, city: city }}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider;
export const useLocationContext = () => useContext(LocationContext)