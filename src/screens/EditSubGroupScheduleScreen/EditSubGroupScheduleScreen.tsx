import { View, Text, ScrollView, Pressable } from 'react-native'
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

type RouteParams = RouteProp<RootNavigatorParamsList, 'EditSubGroupSchedule'>;

type Schedule = {
  startTime: Date;
  endTime: Date;
  date?: Date;
};


const EditSubGroupScheduleScreen = () => {
  const route = useRoute<RouteParams>(); // Change this route params in navigation.ts when consuming data from API later.
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const subGroupId = route?.params?.subGroupId
  const [currentPickerIndex, setCurrentPickerIndex] = useState<number | null>(null);
  const [currentPickerField, setCurrentPickerField] = useState<string | null>(null);  
  const navigation = useNavigation();
  // Function to parse a time string or Date object and return a Date object
  const parseTimeString = (time: string | Date): Date => {
    let date: Date;
    
    if (typeof time === 'string') {
      const timeFormat = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
      
      if (!time.match(timeFormat)) {
        console.warn(`Invalid time string: ${time}`);
        date = new Date();
      } else {
        const [hours, minutes] = time.split(':').map(Number);
        date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
      }
    } else if (time instanceof Date) {
      date = time;
    } else {
      console.warn(`Invalid time value: ${time}`);
      date = new Date();
    }
    
    return date;
  };
  const transformScheduleTimeStringToDate = (schedules: string[]): Schedule[] => {
    return schedules.map(schedule => {
      const startTime = parseTimeString(schedule?.startTime);
      const endTime = parseTimeString(schedule?.endTime);
      return { startTime, endTime };
    });
  };

  useEffect(() => {
    if (route.params?.schedules) {
      const newSchedules = transformScheduleTimeStringToDate(route.params.schedules);
      setSchedules(newSchedules);
    }
  }, [route.params?.schedules]);


  const { control, handleSubmit, getValues, formState: { errors } } = useForm<SubGroupSchedule>({
    resolver: zodResolver(SubGroupScheduleSchema),
    defaultValues: {
      schedules: transformScheduleTimeStringToDate(route.params.schedules),
      dayName: route?.params?.day,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'schedules', });

  const saveAndGoToActivity = (data: any): void => {
    data.subGroupId = subGroupId
    console.log(data, 'this is data')
    navigation.goBack()
  }
  const onChange = (selectedDate: Date | null, index: number): void => {
    const newSchedules = [...schedules];
    newSchedules[index].date = selectedDate || newSchedules[index].date;
    setSchedules(newSchedules);
  };
  
  return (
    <ScrollView style={{ padding: 15, flex: 1}}>
      <Card>
        <Card.Content style={{gap: 5}}>

          <Card.Title title="Ajoutez ou supprimez des horaires"/>
     

        <View>
        {fields.map((field, index) => (
        <View key={field.id} style={{flexDirection: 'row', alignItems: 'center', gap: 15, justifyContent: 'center', marginVertical: 5}}>
          <Pressable onPress={() => { setCurrentPickerIndex(index); setCurrentPickerField('startTime'); }}>
          <Text>
            De {"  "} 
            <Text style={{backgroundColor: colors.primary}}>
              {(() => {
                const value = getValues(`schedules[${index}].startTime` as any);
                if (typeof value === 'string' || value instanceof Date) {
                  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                return '- -  :  - -';
              })()}
            </Text>
          </Text>
          </Pressable>
          {currentPickerIndex === index && currentPickerField === 'startTime' && (
           <Controller
            control={control}
            name={`schedules[${index}].startTime`as any}
            defaultValue={field.startTime}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                testID="dateTimePicker"
                value={value instanceof Date ? value : new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  onChange(selectedDate || new Date());
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
              {/* This is a IIEF immediately invoked function expression (function())() */}
              {(() => {
                const value = getValues(`schedules[${index}].endTime` as any);
                if (typeof value === 'string' || value instanceof Date) {
                  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                return '- -  :  - -';
              })()} 
            </Text>
          </Text>
          </Pressable>
          {currentPickerIndex === index && currentPickerField === 'endTime' && (
           <Controller
            control={control}
            name={`schedules[${index}].endTime`as any}
            defaultValue={field.endTime}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                testID="dateTimePicker"
                value={value instanceof Date ? value : new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  onChange(selectedDate || new Date());
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

export default EditSubGroupScheduleScreen