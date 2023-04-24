import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import colors from '../themes/colors';

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
    // <ScrollView nestedScrollEnabled style={{flex: 1}}>
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      zIndex={2}
      listMode="MODAL"
      modalProps={{
        animationType: 'fade', // Change the modal animation type
        transparent: false, // Make the modal background transparent
      }}
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
      dropDownContainerStyle={{
        backgroundColor: 'white',
        borderRadius: 5,
      }}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.dark,
        borderRadius: 5,
        marginVertical: 5,
      }}
    />
    // </ScrollView>
  );
}

export default SubCategoryDropdown;