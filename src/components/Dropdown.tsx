import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import AntIcons from '@expo/vector-icons/AntDesign';

import { ScrollView, Text, View, FlatList  } from 'react-native';
import colors from '../themes/colors';

interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuecat?: String | null;
}

const Dropdown = ({style, disabled, onValueChange, valuecat}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple big Apple i can tellyou a story about trhee little birds just by my doorstep, singin sweet song', value: 'apple',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Banae(-(yena', value: 'banazena',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Orange', value: 'orange',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Peach', value: 'peach',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Pineapple', value: 'pineapple',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Strawberry', value: 'strawberry',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Watermelon', value: 'watermelon',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Mango', value: 'mango',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Grape', value: 'grape',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Papaya', value: 'papaya',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Cherry', value: 'cherry',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Lemon', value: 'lemon',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Pomegranate', value: 'pomegranate',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Coconut', value: 'coconut',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Avocado', value: 'avocado',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Cucumber', value: 'cucumber',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Tomato', value: 'tomato',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Potato', value: 'potato',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Onion', value: 'onion',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Cabbage', value: 'cabbage',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},

    // {label: 'Banana', value: 'banana',  }
  ]);

  return (

    <DropDownPicker
      open={open}
      value={value}
      items={items}
      // zIndex={2}
      maxHeight={300}
      placeholder="Select a category"
      containerStyle={[style]}
      ellipsizeMode="tail"
      labelProps={{ numberOfLines: 1,  style: { fontSize: 16, color: 'black'} }}
      itemProps={{numberOfLines: 3, style: { fontSize: 12, color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center'}}}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuecat) => {
        onValueChange && onValueChange(valuecat);
      }}
      setItems={setItems}
      listMode="MODAL"
      modalProps={{
        animationType: 'fade', // Change the modal animation type
        transparent: false, // Make the modal background transparent
      }}
      dropDownContainerStyle={{
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 5,
      }}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',

      }}
    />

  );
}

export default Dropdown;