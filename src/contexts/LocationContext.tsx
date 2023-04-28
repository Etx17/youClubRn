import { useContext } from "react";
import { createContext,  ReactNode, useState, SetStateAction, useEffect } from "react";
import * as Location from 'expo-location';
type LocationContextType ={
    lat: number | string ;
    lon: number | string ;
}

type ILocation ={
    coords: {
        latitude: number;
        longitude: number;
    }
}

export const LocationContext = createContext<LocationContextType>({
    lat: "",
    lon: ""    
})



const LocationContextProvider = ({children}: {children: ReactNode}) => {
    const [location, setLocation] = useState<ILocation>({coords: {}} as ILocation);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <LocationContext.Provider value={{lat: location?.coords?.latitude, lon: location?.coords?.longitude }}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider;
export const useLocationContext = () => useContext(LocationContext)