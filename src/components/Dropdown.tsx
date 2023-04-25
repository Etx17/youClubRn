import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import AntIcons from '@expo/vector-icons/AntDesign';

import { ScrollView, Text, View, FlatList  } from 'react-native';
import colors from '../themes/colors';
import categories from '../assets/data/categories';
import { BorderBottomOutlined } from '@ant-design/icons';

interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuecat?: String | null;
}

const Dropdown = ({style, disabled, onValueChange, valuecat}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
      placeholder="Select a category"
      containerStyle={[style]}
      labelProps={{ numberOfLines: 1,  style: { fontSize: 18, color: 'black'} }}
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
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',
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