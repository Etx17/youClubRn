import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    value2?: String | null;
}

const SubCategoryDropdown = ({style, disabled, onValueChange}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Peach', value: 'peach'},
    {label: 'Orange', value: 'orange'}
  ]);

  const handleSubCategoryChange = (value) => {
    setValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };
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

export default SubCategoryDropdown;