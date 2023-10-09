import React, { useState } from 'react';
import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

interface IDetailsCarouselProps {
    images: string[];
    currentImageIndex: number;
    changeImage: (direction: String) => void;
}
const DetailsCarousel = ({ images, currentImageIndex, changeImage }: IDetailsCarouselProps) => {
  const [isLoading, setIsLoading] = useState(true);

    return (
    <View style={styles.informationsContainer}>
        <Pressable style={styles.leftButton} onPress={() => changeImage('left')}/>
        <Pressable style={styles.rightButton} onPress={() => changeImage('right')}/>
        {isLoading && <ActivityIndicator  style={styles.loader} />}

        <Image
          style={styles.image}
          source={{uri: images[currentImageIndex]}}
          contentFit="cover"
          transition={0}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          />
        <View style={styles.indexButtonContainer}>
        { images.length > 1 && images.map((_, index) => (
            <View
            key={index}
            style={{
                width: `${80 / images.length}%`,
                height: 4,
                backgroundColor: `${ index == currentImageIndex ? 'white' : 'darkgrey' }`,
                margin: 5,
            }}/>)) }
            </View>
    </View>
    );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    aspectRatio: 0.9,
  },
  informationsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  leftButton: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  rightButton: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  indexButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 5,
    overflow: 'hidden',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1,
  }
})
export default DetailsCarousel;
