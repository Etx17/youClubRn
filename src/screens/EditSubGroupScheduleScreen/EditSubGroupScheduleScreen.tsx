import { View, Text, ScrollView, Pressable, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card} from 'react-native-paper'
import { useForm, Controller, Control, useFieldArray } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubGroupSchedule, SubGroupScheduleSchema } from '../../schema/subGroupSchedule.schema';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../themes/colors';
import { RouteProp } from '@react-navigation/native';
import { RootNavigatorParamsList } from '../../types/navigation';
import { useMutation, useQuery } from "@apollo/client";
// import { UPDATE_SCHEDULE } from './mutations';
import { GET_TIMESLOTS_BY_SCHEDULE_ID } from './queries';
import { CREATE_TIMESLOT, DELETE_TIME_SLOT } from './mutations';
import { TimeSlots, TimeSlotsSchema } from '../../schema/timeSlots.schema';

type RouteParams = RouteProp<RootNavigatorParamsList, 'EditSubGroupSchedule'>;

type Timeslot = {
  id?: string;
  startTime: Date;
  endTime: Date;
  date?: Date;
  isNew?: boolean;
};


const EditSubGroupScheduleScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRoute<RouteParams>(); // Change this route params in navigation.ts when consuming data from API later.
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const subGroupId = route?.params?.subGroupId
  const scheduleId = route?.params?.scheduleId
  // const dayName = route?.params?.day
  const refetchActivityData = route?.params?.refetchActivityData as any
  // const { subGroupId, scheduleId } = route?.params as any;
  const navigation = useNavigation();
  const [createTimeSlot, { data: createData, loading: createLoading, error: createError  }] = useMutation(CREATE_TIMESLOT);

  const [deleteTimeSlot, { data: deleteData, loading: deleteLoading, error: deleteError}] = useMutation(DELETE_TIME_SLOT, {
    onCompleted: () => {
      refetchActivityData();
      refetch();
    }
  });

  const handleDeletePress = (id: string) => {
    handleDeleteTimeSlot(id)
  };
  const handleDeleteTimeSlot = async (id: any) => {
    try {
      await deleteTimeSlot({ variables: { id: id } })
    } catch(e) {
      console.log(e)
    }
  };
  const {data, loading, error, refetch} = useQuery(GET_TIMESLOTS_BY_SCHEDULE_ID, { variables: {scheduleId: scheduleId} })


  const parseTimeString = (time: string | Date): Date => {
    let date: Date;

    if (typeof time === 'string') {
      const time12HourFormat = /^([0-1]?[0-9]):([0-5][0-9])\s?(AM|PM)$/i;
      const time24HourFormat = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

      if (time.match(time12HourFormat)) {
        const [_, hourStr, minuteStr, amPm] = time.match(time12HourFormat);
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        date = new Date();
        if (amPm.toLowerCase() === 'pm' && hour !== 12) {
          date.setHours(hour + 12);
        } else if (amPm.toLowerCase() === 'am' && hour === 12) {
          date.setHours(0);
        } else {
          date.setHours(hour);
        }
        date.setMinutes(minute);
      } else if (time.match(time24HourFormat)) {
        const [hours, minutes] = time.split(':').map(Number);
        date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        console.warn(`Invalid time string: ${time}`);
        date = new Date();
      }
    } else if (time instanceof Date) {
      date = time;
    } else {
      console.warn(`Invalid time value: ${time}`);
      date = new Date();
    }

    return date;
  };

  const transformScheduleTimeStringToDate = (timeslots: string[]): Timeslot[] => {
    return timeslots?.map(timeslot => {
      const startTime = parseTimeString(timeslot.startTime);
      const endTime = parseTimeString(timeslot.endTime);
      const timeslotId = timeslot.id;
      return { startTime, endTime, timeslotId };
    });
  };

  const { control, handleSubmit, formState: { errors }, reset} = useForm<TimeSlots>({
    resolver: zodResolver(TimeSlotsSchema),
    defaultValues: {
      timeslots: transformScheduleTimeStringToDate(data?.timeSlotsByScheduleId),
    },
  });
  useEffect(() => {
    if (data?.timeSlotsByScheduleId) {
      const timeslotsToTransform = data.timeSlotsByScheduleId
      const transformedTimeSlots = transformScheduleTimeStringToDate(timeslotsToTransform);
      setTimeslots(transformedTimeSlots);
      reset({ timeslots: transformedTimeSlots }); // necessary to load the first time the default values, because it's initialized empty.
    }
  }, [data, createData, deleteData]);

  const { fields, append, remove } = useFieldArray({ control, name: 'timeslots', });
  // console.log(errors, 'THIS IS errors')
  const saveAndGoToActivity = async (data: any) => {
    if (isSubmitting) { return }
    setIsSubmitting(true);
    data.subGroupId = subGroupId
    data.scheduleId = scheduleId
    console.log(data, 'DATA TO SUBMIT')

    try {
      data.timeslots.forEach(async (timeslot: any) => {
        if (!!timeslot.isNew) {
          await createTimeSlot({ variables: { input: { scheduleId: scheduleId, startTime: timeslot.startTime, endTime: timeslot.endTime } } })
        }
      })
    } catch (error) {
      console.log(error, 'there was an error during the process');
    } finally {
      setIsSubmitting(false);
      refetchActivityData()
      navigation.goBack();
    }
  }

  return (

    <ScrollView style={{ padding: 10, flex: 1}}>
      <Card>
        <Card.Content>
          <Card.Title title="HORAIRES" titleStyle={styles.title}/>
          <View>
          {fields.map((field, index) => (
            <View key={field.id} style={styles.dayCard}>
              {field.isNew ? (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#666666'}}>De</Text>
                <Controller
                  control={control}
                  name={`timeslots[${index}].startTime` as any}
                  defaultValue={null}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={value ? value : new Date()}
                      mode={'time'}
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => {
                        onChange(selectedDate || new Date());
                      }}
                    />
                  )}
                />
                </View>
              ) : (
                <Text style={{color: "#666666"}}>
                  De {"  "}
                  <Text style={{fontSize: 17, color: 'black'}}>
                    {new Date(field.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </Text>
              )}

              {field.isNew ? (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#666666'}}>à</Text>
                  <Controller
                    control={control}
                    name={`timeslots[${index}].endTime` as any}
                    defaultValue={null}
                    render={({ field: { onChange, value } }) => (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={value ? value : new Date()}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                          onChange(selectedDate || new Date());
                        }}
                      />
                    )}
                  />
                </View>
                ) : (
                  <Text style={{color: "#666666"}}> à {"  "}
                    <Text style={{fontSize: 17, color: 'black'}}>
                      {new Date(field.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </Text>
                )}
              <Button onPress={() => {
                if(!!field.isNew){
                } else {
                  handleDeletePress(field.timeslotId)
                }
                remove(index);
              }}>X</Button>
            </View>
        ))}

        { fields.length < 10 &&
          <Button style={styles.addTimeSlotButton} textColor='black' onPress={() => append({ startTime: new Date(), endTime: new Date(), isNew: true })}>Ajouter un horaire</Button>
        }
        </View>

        </Card.Content>
      </Card>
      <Button style={styles.submitButton} onPress={handleSubmit(saveAndGoToActivity)} mode='elevated' textColor={colors.primary}>Enregistrer</Button>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666666',
    fontSize: 20
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between',
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: colors.grayDarkest,
    paddingTop: 8,
  },
  addTimeSlotButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#666666',
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 2,
    backgroundColor: colors.black,
  },
})

export default EditSubGroupScheduleScreen
