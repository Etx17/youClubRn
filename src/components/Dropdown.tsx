import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import colors from '../themes/colors';
import categories from '../assets/data/categories';


interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuecat?: String | null;
}


const Dropdown = ({style, disabled, onValueChange, valuecat}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("sports");
  // const [items, setItems] = useState([
  //   { label: "Activités artistiques et culturelles", value: "1", icon:  () => <Text>🎨</Text> },
  //   { label: "Sports, activités de plein air", value: "2", icon: () => <Text>🏃‍♀️</Text>},
  // ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={categories}
      maxHeight={300}
      autoScroll={true}
      placeholder="Catégorie"
      containerStyle={[style]}
      labelProps={{ numberOfLines: 1,  style: { fontSize: 13, color: colors.dark, textTransform: 'uppercase', maxWidth: "80%", backgroundColor: colors.primaryLight, overflow: "hidden", borderRadius: 20, padding: 10},  }}
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
      // setItems={setItems} pourra servir pour les sous catégories en fonction de la catégorie
      listMode="MODAL"
      modalProps={{
        animationType: 'fade', // Change the modal animation type
      }}
      style={{
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginVertical: 5,
        marginLeft: 0,
        overflow: 'hidden',
        maxWidth: "100%",
        borderWidth: 0,
      }}
      disabledStyle={{
        opacity: 0.5
      }}
      textStyle={{
        fontSize: 18,
        fontWeight: "light",
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

export default Dropdown;
