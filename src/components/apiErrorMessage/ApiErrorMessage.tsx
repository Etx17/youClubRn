import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import image from '../../assets/images/error.png';
interface ApiErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ApiErrorMessage = ({
  title = 'Error',
  message = 'Unknown Error',
  onRetry = () => {},
}: ApiErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable onPress={onRetry}>
        <Text>Réessayer</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '70%',
    height: 200,
  },
  title: {
    fontSize: 18,
    margin: 20,
  },
  message: {
    color: "grey",
    marginBottom: 10,
  },
});

export default ApiErrorMessage;
