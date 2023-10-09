import React, { useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import colors from '../themes/colors';

type IPhotosSectionProps = {
  selectedImages: string[];
  numRows: number;
  pickImageAsync: () => void;
  handleImageDelete: (image: string) => void;
};

const PhotosSection = ({ selectedImages, numRows, pickImageAsync, handleImageDelete }: IPhotosSectionProps) => {
  const [isImageLoading, setIsImageLoading] = useState(false)
  console.log(selectedImages, 'selected images from Edit to PhotosSection')
  return (
    <View>
      {/* Component d'input pour des photos */}
      {selectedImages.length > 0 ? (
        <View style={{ borderWidth: 0, margin: 10 }}>

          <FlatList
            data={selectedImages}
            keyExtractor={(item) => item}
            numColumns={3}
            scrollEnabled={false}
            style={{ maxHeight: numRows * 150 }}
            renderItem={({ item }) => (
              <View style={styles.thumbnailContainer}>
                {isImageLoading && <ActivityIndicator style={styles.activityIndicator} />}
                <Image
                  source={{ uri: item }}
                  style={styles.thumbnail}
                  onLoadStart={() => setIsImageLoading(true)}
                  onLoadEnd={() => setIsImageLoading(false)}
                />
                <Pressable style={styles.deleteButton} onPress={() => handleImageDelete(item)}>
                  <Ionicons name='trash-outline' size={20} color={colors.danger} />
                </Pressable>
              </View>
            )}
          />
          {/* <Text onPress={pickImageAsync} style={{ fontSize: 14, color: colors.grayDarkest, margin: 10 }}>
            {selectedImages.length} images sélectionnées <Text style={{ color: colors.danger }}>(Ajouter)</Text>
          </Text> */}
        </View>
      ) : (
        <Button onPress={pickImageAsync} style={styles.imageButton}>
          <Text style={styles.addImageText}>+</Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: 'black'
    },
    activityIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -12 }, { translateY: -12 }],
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
export default PhotosSection;
