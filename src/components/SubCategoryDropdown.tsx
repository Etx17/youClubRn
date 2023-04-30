import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import colors from '../themes/colors';
import subcategories from '../assets/data/subcategories';
import categories from '../assets/data/categories'
interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuesub?: String | null;
    categoryName: keyof typeof subcategories;
}

const SubCategoryDropdown = ({style, disabled, onValueChange, valuesub, categoryName}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={subcategories[categoryName] ? subcategories[categoryName] : []}
      maxHeight={300}
      autoScroll={true}
      placeholder="Sous catégorie"
      containerStyle={[style]}
      labelProps={{ numberOfLines: 1,  style: { fontSize: 16, color: colors.dark} }}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuesub) => {
        onValueChange && onValueChange(valuesub);
      }}
      selectedItemContainerStyle={{
        backgroundColor: "lightgrey"
      }}
      // setItems={setItems} pourra servir pour les sous catégories en fonction de la catégorie
      listMode="MODAL"
      modalProps={{
        animationType: 'fade', // Change the modal animation type
      }}
      style={{
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginVertical: 5,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        borderWidth: 0,
        marginHorizontal: 10,
        maxWidth: "90%"
      }}
      disabledStyle={{
        opacity: 0.5
      }}
      textStyle={{
        fontSize: 16,
      }}
    />
    // </ScrollView>
  );
}

export default SubCategoryDropdown;