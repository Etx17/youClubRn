import { View, Text, Alert, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Checkbox, HelperText, RadioButton, TextInput,  } from 'react-native-paper'
import { useForm, Controller, Control, useFieldArray } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledInput from '../../components/ControlledInput';
import { SubGroupSchedule, SubGroupScheduleSchema } from '../../schema/subGroupSchedule.schema';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../themes/colors';
const NewSubGroupScheduleScreen = (schedule: {}) => {
  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm<SubGroupSchedule>({
    resolver: zodResolver(SubGroupScheduleSchema),
    defaultValues: {
      schedules: [{ startTime: new Date(), endTime: new Date() }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  const navigation = useNavigation();
  const route = useRoute();
  const scheduleDaysPresent = Object.keys(route?.params?.schedule).filter(day => day !== 'id' && day !== 'sub_group_id')
  const daysOfWeekToShow = [ 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche' ].filter(day => !scheduleDaysPresent.includes(day))
  const [daysToShow, setDaysToShow] = useState(daysOfWeekToShow)

  const saveAndGoToActivity = (data) => {
    // Append to the data object back the route.params.schedule id, et subgroupId
    data.sub_group_id = route?.params?.schedule?.sub_group_id
    data.id = route?.params?.schedule?.id
    console.log(data, 'this is data')
    navigation.goBack()
  }
  const [schedules, setSchedules] = useState([{ date: new Date() }]);
  const onChange = (selectedDate, index) => {
    const newSchedules = [...schedules];
    newSchedules[index].date = selectedDate || newSchedules[index].date;
    setSchedules(newSchedules);
  };
  const addSchedule = () => {
    setSchedules([...schedules, 
      { date: new Date() }
    ]);
  };

  const [currentPickerIndex, setCurrentPickerIndex] = useState(null);
  const [currentPickerField, setCurrentPickerField] = useState(null);
  console.log(errors, 'this is errors');
  

  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      <Card>
        <Card.Title title="Choisissez un jour"/>
        <Card.Content style={{gap: 5}}>

        <Controller 
          control={control}
          name={"dayName"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error, invalid },
          }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              { daysToShow?.map(day => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value={day} />
                    <Text>{day}</Text>
                    
                  </View>
                )
              })}
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            </RadioButton.Group>
            )}
          />

          <Card.Title title="Ajoutez des horaires"/>
     

        <View>
        {fields.map((field, index) => (
        <View key={field.id} style={{flexDirection: 'row', alignItems: 'center', gap: 15, justifyContent: 'center', marginVertical: 5}}>
          <Pressable onPress={() => { setCurrentPickerIndex(index); setCurrentPickerField('startTime'); }}>
            <Text>
            De {"  "} 
              <Text style={{backgroundColor: colors.primary}}>
                {getValues(`schedules[${index}].startTime`) ? new Date(getValues(`schedules[${index}].startTime`)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '- -  :  - -'}
              </Text>
            </Text>
          </Pressable>
          {currentPickerIndex === index && currentPickerField === 'startTime' && (
            <Controller
              control={control}
              name={`schedules[${index}].startTime`}
              defaultValue={field.startTime}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    onChange(selectedDate);
                    setCurrentPickerIndex(null);
                    setCurrentPickerField(null);
                  }}
                />
              )}
            />
          )}
          <Pressable onPress={() => { setCurrentPickerIndex(index); setCurrentPickerField('endTime'); }}>
          <Text>
            à {"  "}
            <Text style={{backgroundColor: colors.primary}}>
              {getValues(`schedules[${index}].endTime`) ? new Date(getValues(`schedules[${index}].endTime`)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '- -  :  - -'}
            </Text>
          </Text>
          </Pressable>
          {currentPickerIndex === index && currentPickerField === 'endTime' && (
            <Controller
              control={control}
              name={`schedules[${index}].endTime`}
              defaultValue={field.endTime}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    onChange(selectedDate);
                    setCurrentPickerIndex(null);
                    setCurrentPickerField(null);
                  }}
                />
              )}
            />
          )}
         <Button onPress={() => remove(index)}>X</Button>
        </View>
      ))}
      { fields.length < 10 &&
        <Button style={{backgroundColor: colors.secondary}} onPress={() => append({ startTime: new Date(), endTime: new Date() })}>Ajouter un horaire</Button>
      }
      </View>

        </Card.Content>
      </Card>
      <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoToActivity)} mode='elevated' textColor='black'>Enregistrer</Button>

    </ScrollView>
  )
}

export default NewSubGroupScheduleScreen