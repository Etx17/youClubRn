import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import AntIcons from '@expo/vector-icons/AntDesign';

import { ScrollView, Text, View, FlatList  } from 'react-native';
import colors from '../themes/colors';

interface IDropdownProps {
    style?: any;
    disabled?: boolean;
    onValueChange?: (value: any) => void;
    valuecat?: String | null;
}

const Dropdown = ({style, disabled, onValueChange, valuecat}: IDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("164_014");
  const [items, setItems] = useState([
    { label: "culture, pratiques d’activités artistiques, culturelles", value: "1", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} style={{ textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.30)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 7 }} /> },
    { label: "Sports, activités de plein air", value: "2", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "amicales, groupements affinitaires, groupements d'entraide (hors défense de droits fondamentaux", value: "3", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "éducation formation", value: "4", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "clubs de loisirs, relations", value: "5", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "Environnement, cadre de vie", value: "6", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "conduite d’activités économiques", value: "7", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "action socio-culturelle", value: "8", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "associations caritatives, humanitaires, aide au développement, développement du bénévolat", value: "9", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "santé", value: "100", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "représentation, promotion et défense d’intérêts économiques", value: "11", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "interventions sociales", value: "12", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "information communication", value: "13", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "aide à l'emploi, développement local, promotion de solidarités économiques, vie locale", value: "14", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "défense de droits fondamentaux, activités civiques", value: "15", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "préservation du patrimoine", value: "16", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "activités religieuses, spirituelles ou philosophiques", value: "17", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "services familiaux, services aux personnes âgées", value: "18", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "activités politiques", value: "19", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "clubs, cercles de réflexion", value: "20", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "chasse pêche", value: "21", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "services et établissements médico-sociaux", value: "22", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "logement", value: "23", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "recherche", value: "24", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "armée (dont préparation militaire, médailles)", value: "25", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "Tourisme", value: "26", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "sécurité, protection civile", value: "27", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },
    { label: "justice", value: "28", icon: () => <AntIcons name="arrowright" size={30} color={colors.primaryLighter} /> },

  ]);

  return (

    <DropDownPicker
      open={open}
      value={value}
      items={items}
      // zIndex={2}
      maxHeight={300}
      placeholder="Select a category"
      containerStyle={[style]}
      ellipsizeMode="tail"
      labelProps={{ numberOfLines: 1,  style: { fontSize: 16, color: 'black'} }}
      itemProps={{numberOfLines: 3, style: { fontSize: 12, color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center'}}}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(valuecat) => {
        onValueChange && onValueChange(valuecat);
      }}
      setItems={setItems}
      listMode="MODAL"
      modalProps={{
        animationType: 'fade', // Change the modal animation type
        transparent: false, // Make the modal background transparent
      }}
      dropDownContainerStyle={{
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 5,
      }}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        overflow: 'hidden',

      }}
    />

  );
}

export default Dropdown;