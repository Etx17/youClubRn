import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import colors from '../themes/colors';
import categories from '../assets/data/categories';
import { StyleSheet } from 'react-native';


interface IDaysDropdownProps {
    days?: any;
    onValueChange?: (value: any) => void;
}


const DaysDropdown = ( {
    days, 
    onValueChange,
 }: IDaysDropdownProps) => {
  const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("sports");
const allDaysOfWeek = [
    { label: "Lundi", value: "lundi" },
    { label: "Mardi", value: "mardi" },
    { label: "Mercredi", value: "mercredi" },
    { label: "Jeudi", value: "jeudi" },
    { label: "Vendredi", value: "vendredi" },
    { label: "Samedi", value: "samedi" },
    { label: "Dimanche", value: "dimanche" },
]
  const filteredDaysOfweek = allDaysOfWeek.filter(day => !days.includes(day.value))
  const [items, setItems] = useState(filteredDaysOfweek);

  return (
    <DropDownPicker
      open={open}
    //   value={value}
      items={days}
      maxHeight={300}
      autoScroll={true}
      placeholder="Choisissez un jour"
      labelProps={{ numberOfLines: 1, style: styles.label }}
      setOpen={setOpen}
    //   setValue={}
      onChangeValue={(value) => {
        onValueChange && onValueChange(value);
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

export default DaysDropdown;
