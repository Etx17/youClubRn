import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, HelperText, TextInput,  } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledInput from '../../components/ControlledInput';
import { SubGroup, SubGroupSchema } from '../../schema/subGroup.schema';
type Tarification = {
  number: string;
  text: string;
  isNew: boolean;
};

const EditSubGroupScreen = () => {
  // Mock data from API, receive it via props, but fetch it from the API if it's not provided.
  const route = useRoute();
  const subgroup = route?.params?.subgroup;

  const apiData = useMemo(() => ({ // A cause du map, pour économiser le recalcul au cas ou tarifications est un grand array ( mais ca ne l'est pas tant)
    name: subgroup?.name || "Erreur de récupération",
    type: subgroup?.type || "Erreur de récupération",
    shortDescription: subgroup?.short_description || "Erreur de récupération",
    address: subgroup?.address || "Erreur de récupération",
    minPrice: subgroup?.min_price,
    tarifications: subgroup?.tarifications 
        ? subgroup.tarifications.map((tarif: String) => ({
            number: tarif.split('/')[0],
            text: tarif.split('/')[1],
            isNew: false,
          }))
        : [],
  }), [subgroup]);

  const [tarifications, setTarifications] = useState<Tarification[]>(apiData.tarifications);
  
  useEffect(() => {
    setValue("name", apiData.name);
    setValue("type", apiData.type);
    setValue("shortDescription", apiData.shortDescription);
    setValue("address", apiData.address);
    setValue("minPrice", apiData.minPrice.toString());
    setValue("tarifications", tarifications);
  }, [tarifications]);
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<SubGroup>({
    resolver: zodResolver(SubGroupSchema),
  });
  const navigation = useNavigation()

  const handleTarificationChange = <K extends keyof Tarification>( //telling TypeScript field can be any valid key of a Tarification object.
    index: number, 
    field: K, 
    value: Tarification[K]
  ) => {
    setTarifications(prevTarifications => {
      const newTarifications = [...prevTarifications];
      newTarifications[index] = { ...newTarifications[index], [field]: value };
      return newTarifications
    });
  };

  const addTarification = () => {
    const newTarification = { number: '', text: '', isNew: true };
    if (newTarification) {
      setTarifications(prevTarifications => [...prevTarifications, newTarification])
    }
  };
  // console.log(tarifications, 'tarifications')
  const deleteTarification = (index: number) => {
    setTarifications(prevTarifications => prevTarifications.filter((_: any, i: number) => i !== index))
  };

  const saveAndGoToActivity = (data: {}) => {
    console.log(data, "before being joined and digested");
    Alert.alert('Votre activité a été créée avec succès !', 'Vous pouvez maintenant la retrouver dans la liste des activités de votre club. Vous pouvez la modifier à tout moment en cliquant dessus.')
    navigation.goBack()
  }


  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      <View style={{gap: 15}}>
        <Card>
          <Card.Title title="Ajoutez les informations de la division" />
          
          <Card.Content style={{gap: 5}}>

            <ControlledInput 
              control={control as any}
              name="name"
              label="Nom de la division"
              placeholder="Ceinture jaunes, 6-8 ans, groupe 1, etc."
            />

            <ControlledInput 
              control={control as any}
              name="type"
              label="Type (optionnel)"
              placeholder="Evènement, cours collectif, cours indidivuel, stage, session"
            />

            <ControlledInput 
              control={control as any}
              name="shortDescription"
              label="Description courte (300 caractères)"
              maxLength={300}
              placeholder="Brève description de la catégorie, précisions sur les tarifs si nécessaires, etc..."
              numberOfLines={3}
              multiline
              />

            <ControlledInput 
              control={control as any}
              name="address"
              label="Addresse (optionel - si différente)"
              placeholder="Ex: 21 rue des Dames, 75017 Paris"
            />

            <ControlledInput 
              control={control as any}
              name="minPrice"
              label="Premier prix (nombre uniquement)" 
              multiline
              placeholder="Renseignez le prix de votre offre la moins chère - par exemple un cours d'essai ou a l'unité. C'est le prix minimum qu'un client potentiel pourrait dépenser chez vous"
            />

          {/* Tarifications input */}
          <Card.Title title="Ajoutez des tarifications représentatives" />
          {tarifications.map((tarification: Tarification, index: number) => (
            tarification.isNew ? (
              <View key={index} style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Controller 
                  control={control}
                  name={`tarifications[${index}].number` as any}
                  render={({ 
                    field: { onChange, onBlur, value },
                    fieldState: { error, invalid }, }) => (
                    <View>
                    <TextInput 
                      label="Montant"
                      placeholder="100"
                      value={value}
                      onChangeText={value => {
                        onChange(value);
                        handleTarificationChange(index, 'number', value);
                      }}
                      onBlur={onBlur}
                      style={{ width: 100 }}
                      error={!!error}
                    />
                    {error && <HelperText type="error">{error.message}</HelperText>}
                    </View>
                  )}
                />

            <Controller 
              control={control}
              name={`tarifications[${index}].text` as any}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                  label="Réccurence"
                  placeholder="heure, jour, semaine, mois, trimestre, semestre, saison, année, etc..."
                  value={value}
                  onChangeText={value => {
                    onChange(value);
                    handleTarificationChange(index, 'text', value);
                  }}
                  onBlur={onBlur}
                  style={{ width: 120 }}
                />
              )}
            />
            <Button style={{marginBottom: 25}} onPress={() => deleteTarification(index)}>X</Button>
          </View>
  ) : (
    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 }}>
      <Text>{`${tarification.number} € / ${tarification.text}`}</Text>
      <Button onPress={() => deleteTarification(index)}>X</Button>
    </View>
  )
))}
  <Button onPress={addTarification}>Add Tarification</Button>


          </Card.Content>
        </Card>
        <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoToActivity)} mode='elevated' textColor='black'>Enregistrer</Button>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 3000, // Necessary
    flexDirection: 'row',
    gap: 0,
    marginTop: 1.5,
  },
  deleteButton: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowOffset: { width: 2, height: 0 }, // iOS only
    shadowOpacity: 0.8, // iOS only
    elevation: 8, // Android only
  },
  thumbnailContainer: {
    margin: 4,
    marginBottom: 10,
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    elevation: 8, // Android only
    shadowColor: '#000', // iOS only
    shadowOffset: { width: 2, height: 0 }, // iOS only
    shadowOpacity: 0.8, // iOS only
    },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  imageButton: {
    width: "95%",
    height: 100,
    margin: 10,
    padding: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    fontSize: 60,
    color: "lightgrey",
  },
})

export default EditSubGroupScreen