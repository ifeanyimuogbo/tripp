/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme, images} from '../../constants';

const {onboarding1, onboarding2, onboarding3} = images;
const {COLORS, FONTS, SIZES} = theme;

const onboardings = [
  {
    title: "Let's travelling",
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam, consetetur sadipscing elitr, sed diam',
    img: onboarding1,
  },
  {
    title: 'Navigation',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam, consetetur sadipscing elitr, sed diam',
    img: onboarding2,
  },
  {
    title: 'Destination',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam, consetetur sadipscing elitr, sed diam',
    img: onboarding3,
  },
];
const Onboarding = () => {
  const [completed, setCompleted] = useState(false);
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.floor(value / SIZES.width) === onboardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);
  //Render
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onboardings.map((item: any, index: number) => (
          <View key={index} style={{width: SIZES.width}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 40,
                right: 40,
              }}>
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.gray,
                  textAlign: 'center',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'center',
                  marginTop: SIZES.base,
                  color: COLORS.gray,
                }}>
                {item.description}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 5,
                right: 0,
                width: 150,
                height: 50,
                paddingLeft: 20,
                justifyContent: 'center',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: COLORS.blue,
              }}
              onPress={() => console.log('Button on press')}>
              <Text>{completed ? "Let's Go" : 'Skip'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onboardings.map((_: any, index: number) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              opacity={opacity as any}
              key={`dot-${index}`}
              style={[styles.dot, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '35%' : '25%',
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
export default Onboarding;
