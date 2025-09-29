import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { splashStyles } from './SplashScreen.Style';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const letterAnimations = useRef([
    new Animated.Value(0), // F
    new Animated.Value(0), // i
    new Animated.Value(0), // n
    new Animated.Value(0), // Z
    new Animated.Value(0), // e
    new Animated.Value(0), // n
  ]).current;

  const subtitleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate letters one by one first
    const letterAnimationSequence = letterAnimations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: 800 + (index * 300), 
        useNativeDriver: true,
      })
    );

    // Start all animations
    Animated.parallel([
      // Letters animate in sequence
      ...letterAnimationSequence,
      // Subtitle animates after all letters (with calculated delay)
      Animated.timing(subtitleAnimation, {
        toValue: 1,
        duration: 800,
        delay: 800 + (letterAnimations.length * 300) + 500, 
        useNativeDriver: true,
      })
    ]).start();

    // Set timeout for finishing the splash screen
    const totalDuration = 800 + (letterAnimations.length * 300) + 500 + 800 + 1500; 
    setTimeout(() => {
      onFinish();
    }, totalDuration);

  }, [letterAnimations, subtitleAnimation, onFinish]);

  const letters = ['F', 'i', 'n', 'Z', 'e', 'n'];

  return (
    <View style={splashStyles.container}>
      {/* Animated letters */}
      <View style={splashStyles.textContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              splashStyles.letter,
              {
                opacity: letterAnimations[index],
                transform: [
                  {
                    translateY: letterAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>

      {/* Animated subtitle */}
      <Animated.Text
        style={[
          splashStyles.subtitle,
          { 
            opacity: subtitleAnimation,
            transform: [
              {
                translateY: subtitleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [15, 0],
                }),
              },
            ],
          }
        ]}
      >
        Tu app financiera
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;