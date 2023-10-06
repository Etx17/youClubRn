import { View, Text, Alert, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Checkbox, HelperText, RadioButton, TextInput,  } from 'react-native-paper'
import { useForm, Controller, Control, useFieldArray } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubGroupSchedule, SubGroupScheduleSchema } from '../../schema/subGroupSchedule.schema';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../themes/colors';
import { useMutation } from '@apollo/client';
import { CREATE_SCHEDULE, CREATE_TIMESLOT } from './mutations';
import { formatDate } from "../../utils/dateUtils";


type Timeslot = {
  id?: string;
  startTime: string; // Change the type to string
  endTime: string; // Change the type to string
  date?: Date;
  isNew?: boolean;
};

const NewSubGroupScheduleScreen = (subgroup: {}) => {
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm<SubGroupSchedule>({
    resolver: zodResolver(SubGroupScheduleSchema),
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "timeslots",
  });

  const navigation = useNavigation();
  const route = useRoute();
  const scheduleDaysPresent = route?.params?.subgroup.schedules.map(schedule => schedule.day)
  const daysOfWeekToShow = [ 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche' ].filter(day => !scheduleDaysPresent.includes(day))
  const [daysToShow, setDaysToShow] = useState(daysOfWeekToShow)
  const [schedules, setSchedules] = useState([{ date: new Date() }]);
  const { refetchActivityData } = route?.params as any
  const subgroupId = route?.params?.subgroup.id
  const [createSchedule, { data, loading, error }] = useMutation(CREATE_SCHEDULE);
  const [createTimeSlot, { data: data2, loading: loading2, error: error2 }] = useMutation(CREATE_TIMESLOT);

  const saveAndGoToActivity = async (data: any) => {
    console.log(subgroupId)
    await createSchedule({ variables: { subGroupId: subgroupId, day: data.dayName }})
    .then((res) => {
      console.log(res.data.createSchedule.id)
      const scheduleId = res.data.createSchedule.id
      timeslots.map(async (timeslot) => {
        await createTimeSlot({ variables: { input: { scheduleId: scheduleId, startTime: timeslot.startTime, endTime: timeslot.endTime } } })
        .then((res) => {
          console.log(res)
          refetchActivityData()
        })
        .catch(err => {
          Alert.alert('Erreur', 'Une erreur s\'est produite lors de la création de l\'horaire.');
          console.error(err);
        });
      })
      navigation.goBack()
    })
    .catch(err => {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la création de l\'horaire.');
      console.error(err);
    });
  }

  const handleDeletePress = (index: number) => {
    setTimeslots(prevTimeslots => {
      const updatedTimeslots = [...prevTimeslots];
      updatedTimeslots.splice(index, 1);  // Use the index to remove the item
      return updatedTimeslots;
    });
  }
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
          {timeslots.map((field, index) => (
            <View key={field.id} style={styles.dayCard}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                <Text style={{color: '#666666'}}>De</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(field.startTime)}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                    onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setTimeslots(prevTimeslots => {
                        const updatedTimeslots = [...prevTimeslots];
                        updatedTimeslots[index].startTime = selectedDate.toISOString();
                        return updatedTimeslots;
                      });
                    }
                  }}
                />
                <Text style={{color: '#666666'}}> à</Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(field.endTime)}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTimeslots(prevTimeslots => {
                      const updatedTimeslots = [...prevTimeslots];
                      updatedTimeslots[index].endTime = selectedDate.toISOString();
                      return updatedTimeslots;
                    });
                  }
                  }}
                />

                <Button onPress={() => handleDeletePress(index)}>X</Button>
              </View>
            </View>
            ))}


        {timeslots.length < 10 && (
          <Button
            style={styles.addTimeSlotButton}
            textColor='black'
            onPress={() => {
              setTimeslots(prevTimeslots => [...prevTimeslots, { startTime: new Date().toISOString(), endTime: new Date().toISOString() }]);
            }}>
            Ajouter un horaire
          </Button>
        )}
      </View>

        </Card.Content>
      </Card>
      <Button style={{marginBottom: 30}} onPress={handleSubmit(saveAndGoToActivity)} mode='elevated' textColor='black'>Enregistrer</Button>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  addTimeSlotButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#666666',
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: colors.grayDarkest,
    paddingTop: 8,
  },
})

export default NewSubGroupScheduleScreen
