import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import colors from '../themes/colors';
import subcategories from '../assets/data/subcategories';
import { StyleSheet } from 'react-native';
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
      autoScroll={true}
      placeholder="Sous catégorie"
      containerStyle={[style]}
      labelProps={{ numberOfLines: 1,  style: styles.label,  }}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuesub) => {
        onValueChange && onValueChange(valuesub);
      }}
      listMode="MODAL"
      modalProps={{ animationType: 'fade', }}
      style={{
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginVertical: 5,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        borderWidth: 0,
        maxWidth: "100%",
      }}
      disabledStyle={{
        opacity: 0.5
      }}
      textStyle={{
        fontSize: 20,
        color: 'black',
      }}
      showArrowIcon={true}
      arrowIconStyle={{
        tintColor: colors.dark,
        width: 20,
        height: 30,
      }}
      itemSeparator={true}
      itemSeparatorStyle={{
        backgroundColor: colors.grayDark,
      }}
      selectedItemContainerStyle={{
        backgroundColor: colors.primaryLight,
        height: 50
      }}
      listItemContainerStyle={{
        height: 50,
      }}
    />
  );
}
const styles = StyleSheet.create({
  label: { 
    fontSize: 13, 
    color: colors.dark, 
    textTransform: 'uppercase', 
    // maxWidth: "80%", 
    // minWidth: "80%", 
    width: "80%",
    backgroundColor: colors.primaryLight, 
    overflow: "hidden", 
    borderRadius: 20, 
    padding: 10,
  },
})
export default SubCategoryDropdown;
