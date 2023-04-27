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
      labelProps={{ numberOfLines: 1,  style: { fontSize: 16, color: colors.dark} }}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuecat) => {
        onValueChange && onValueChange(valuecat);
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
        marginHorizontal: 5,
        overflow: 'hidden',
        // elevation: 8,
        borderWidth: 0,
        maxWidth: "90%"

      }}
      disabledStyle={{
        opacity: 0.5
      }}
      textStyle={{
        fontSize: 16,
      }}
    />
  );
}

export default Dropdown;