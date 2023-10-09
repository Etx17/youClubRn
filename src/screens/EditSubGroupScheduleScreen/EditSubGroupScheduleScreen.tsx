import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../themes/colors';
import { useMutation, useQuery } from "@apollo/client";
import { GET_TIMESLOTS_BY_SCHEDULE_ID } from './queries';
import { CREATE_TIMESLOT, DELETE_TIME_SLOT } from './mutations';
import { formatDate } from "../../utils/dateUtils";
import { Card, Button } from 'react-native-paper';

type Timeslot = {
  id?: string;
  startTime: string; // Change the type to string
  endTime: string; // Change the type to string
  date?: Date;
  isNew?: boolean;
};

const EditSubGroupScheduleScreen = () => {
  const [showPicker, setShowPicker] = useState<{index: number, type: 'start' | 'end'} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRoute<RouteParams>();
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const subGroupId = route?.params?.subGroupId;
  const scheduleId = route?.params?.scheduleId;
  const refetchActivityData = route?.params?.refetchActivityData as any;
  const navigation = useNavigation();
  const [createTimeSlot, { data: createData, loading: createLoading, error: createError  }] = useMutation(CREATE_TIMESLOT, {
    onCompleted: () => {
      refetch();
    }
  });
  const [deleteTimeSlot, { data: deleteData, loading: deleteLoading, error: deleteError}] = useMutation(DELETE_TIME_SLOT, {
    onCompleted: () => {
      refetchActivityData();
      refetch();
    }
  });

  const handleDeletePress = (id: string) => {
    handleDeleteTimeSlot(id);
  };

  const handleDeleteTimeSlot = async (id: any) => {
    try {
      await deleteTimeSlot({ variables: { id: id } })
    } catch(e) {
      console.log(e)
    }
  };

  const { data, loading, error, refetch } = useQuery(GET_TIMESLOTS_BY_SCHEDULE_ID, { variables: { scheduleId: scheduleId } });

  useEffect(() => {
    if (data?.timeSlotsByScheduleId) {
      setTimeslots(data.timeSlotsByScheduleId); // Directly use the provided time strings
    }
  }, [data, createData, deleteData]);

  const saveAndGoToActivity = async () => {
    if (isSubmitting) { return }
    setIsSubmitting(true);

    try {
      timeslots.forEach(async (timeslot: any) => {
        if (!!timeslot.isNew) {
          await createTimeSlot({ variables: { input: { scheduleId: scheduleId, startTime: timeslot.startTime, endTime: timeslot.endTime } } })
        }
      });
    } catch (error) {
      console.log(error, 'there was an error during the process');
    } finally {
      setIsSubmitting(false);
      refetchActivityData();
      navigation.goBack();
    }
  };


  return (
    <ScrollView style={{ padding: 10, flex: 1 }}>
      <Card>
        <Card.Content>
          <Card.Title title="HORAIRES" titleStyle={styles.title} />
          <View>
            {timeslots.map((field, index) => (
              <View key={field.id} style={styles.dayCard}>
                {field.isNew ? (
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                    <Text  style={{color: '#666666'}}>De</Text>

                    {Platform.OS === 'android' && (
                      <Text onPress={() => setShowPicker({ index, type: 'start' })} style={styles.newTimeSlotPill}>
                        { formatDate(field.startTime) }
                      </Text>
                    )}
                    { Platform.OS === 'android' && showPicker && showPicker.index === index && showPicker.type === 'start' ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(field.startTime)}
                      mode={'time'}
                       is24Hour={true}
                      display="clock"
                       onChange={(event, selectedDate) => {
                        setShowPicker(null);
                        if (selectedDate) {
                          setTimeslots(prevTimeslots => {
                            const updatedTimeslots = [...prevTimeslots];
                            updatedTimeslots[index].startTime = selectedDate.toISOString();
                            return updatedTimeslots;
                          });
                        }
                      }}
                    /> ) : (
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
                    )}
                   <Text style={{color: '#666666'}}> à</Text>
                   {Platform.OS === 'android' && (
                      <Text onPress={() => setShowPicker({ index, type: 'end' })} style={styles.newTimeSlotPill}>
                        { formatDate(field.endTime) }
                      </Text>
                    )}
                    { Platform.OS === 'android' && showPicker && showPicker.index === index && showPicker.type === 'end' ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(field.endTime)}
                      mode={'time'}
                      is24Hour={true}
                      display="default"
                       onChange={(event, selectedDate) => {
                        setShowPicker(null);
                        if (selectedDate) {
                          setTimeslots(prevTimeslots => {
                            const updatedTimeslots = [...prevTimeslots];
                            updatedTimeslots[index].endTime = selectedDate.toISOString();
                            return updatedTimeslots;
                          });
                        }
                      }}
                    />
                    ) : (
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
                    )}
                </View>
                ) : (
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                    <Text style={{color: "#666666"}}>
                    De {"  "}
                    </Text>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      { formatDate(field.startTime)}
                    </Text>
                    <Text style={{color: "#666666"}}>
                    {"  "} à {"  "}
                    </Text>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      { formatDate(field.endTime)}
                    </Text>

                  </View>
                )}
                <Button onPress={() => {
                  if (!!field.isNew) {
                  } else {
                    handleDeletePress(field.id); // Assuming `id` is the correct identifier
                  }
                }}>X</Button>
              </View>
            ))}
            {timeslots.length < 10 && (
              <Button
                style={styles.addTimeSlotButton}
                textColor='black'
                onPress={() => {
                  // Add a new time slot logic here
                  setTimeslots(prevTimeslots => [...prevTimeslots, { startTime: new Date().toISOString(), endTime: new Date().toISOString(), isNew: true }]);
                }}>
                Ajouter un horaire
              </Button>
            )}
          </View>
        </Card.Content>
      </Card>
      <Button
        style={styles.submitButton}
        onPress={saveAndGoToActivity}
        mode='elevated'
        textColor={colors.primary}>
        Enregistrer
      </Button>
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
  newTimeSlotPill: {
    fontSize: 17,
    color: 'black',
    backgroundColor: 'lightgrey',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  }
})
export default EditSubGroupScheduleScreen;
