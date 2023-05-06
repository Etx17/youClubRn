import { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import * as Location from 'expo-location';
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
        
        // console.log(deviceLocation.coords, 'location from context');
        const locationObject = {
            latitude: deviceLocation.coords.latitude,
            longitude: deviceLocation.coords.longitude
        }
        const geocodeData = await Location.reverseGeocodeAsync(locationObject);
        if (geocodeData && geocodeData.length > 0) {
        setCity(geocodeData[0]?.city);
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