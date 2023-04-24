import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuesub?: String | null;
}

const SubCategoryDropdown = ({style, disabled, onValueChange, valuesub}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Peach', value: 'peach'},
    {label: 'Orange', value: 'orange'}
  ]);

  return (

    <DropDownPicker
      open={open}
      value={value}
      items={items}
      zIndex={2}
      placeholder="Select a sub-category"
      disabled={disabled? true : false}
      containerStyle={[{ zIndex: 2 }, style]}
      labelProps={{ numberOfLines: 2, style: { fontSize: 16, color: 'black'} }}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuesub) => {
        onValueChange && onValueChange(valuesub);
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

export default SubCategoryDropdown;