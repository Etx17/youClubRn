import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import AntIcons from '@expo/vector-icons/AntDesign';

import { Text, View } from 'react-native';
import colors from '../themes/colors';

interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    value?: String | null;
}

const Dropdown = ({style, disabled, onValueChange}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple big Apple i can tellyou a story about trhee little birds just by my doorstep, singin sweet song', value: 'apple',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    {label: 'Banana', value: 'banana',  icon: () =>  <AntIcons name="arrowright" size={40} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7  }} />},
    // {label: 'Banana', value: 'banana',  }
  ]);

  return (

    <DropDownPicker
      open={open}
      value={value}
      items={items}
      zIndex={2}
      placeholder="Select a category"
      containerStyle={[{ zIndex: 2 }, style]}
      labelProps={{ numberOfLines: 2, style: { fontSize: 16, color: 'black'} }}
      itemProps={{numberOfLines: 3, style: { fontSize: 12, color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center'}}}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(value) => {
        console.log(value);
      }}
      setItems={setItems}
      modalProps={{
        animationType: 'fade', // Change the modal animation type
        transparent: true, // Make the modal background transparent
      }}
      dropDownContainerStyle={{
        backgroundColor: 'white',
        borderRadius: 5,
      }}
      style={{
        backgroundColor: 'lightblue',
        borderWidth: 0,
        borderRadius: 5,
        marginVertical: 5,
      }}
    />
    
  );
}

export default Dropdown;