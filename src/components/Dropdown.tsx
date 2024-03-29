import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import colors from '../themes/colors';
import categories from '../assets/data/categories';
import { StyleSheet } from 'react-native';


interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuecat?: String | null;
    defaultValue?: String | null;
}


const Dropdown = ({style, disabled, onValueChange, valuecat, defaultValue}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>( defaultValue || 'sports');

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={categories}
      maxHeight={300}
      autoScroll={true}
      placeholder={"Catégories (12)"}
      containerStyle={[style]}
      labelProps={{ numberOfLines: 1, style: styles.label }}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuecat) => {
        onValueChange && onValueChange(valuecat);
      }}
      selectedItemContainerStyle={{
        backgroundColor: colors.primaryLight,
        flexGrow: 1,
        height: 50
      }}
      listItemContainerStyle={{
        backgroundColor: 'colors.gray',
        height: 50,
        paddingHorizontal: 10,
      }}
      listMode="MODAL"
      modalProps={{ animationType: 'fade' }}
      style={{
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginVertical: 5,
        marginLeft: 0,
        overflow: 'hidden',
        maxWidth: "100%",
        borderWidth: 0,
      }}
      disabledStyle={{ opacity: 0.5 }}
      textStyle={{
        fontSize: 18,
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
    />
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 13, color: colors.dark,
    textTransform: 'uppercase',
    marginLeft: 8,
    width: "80%",
    backgroundColor: colors.primaryLight,
    overflow: "hidden",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 12,
  },
})

export default Dropdown;
