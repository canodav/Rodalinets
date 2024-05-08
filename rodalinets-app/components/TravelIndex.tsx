import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useTravelStore } from '@/stores/travelStore';
import { useStationStore } from '@/stores/stationStore';
import Colors from '@/constants/Colors';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { Fonts } from '@/constants/Fonts';

import i18n from '@/i18n';

export const TravelIndex = ({ text }: { text: string }) => {
  const departureStation = useStationStore((state) => state.departureStation);
  const destinationStation = useStationStore((state) => state.destinationStation);

  const { isTravelStarted, startTravel, endTravel } = useTravelStore();

  const handleTravelToggle = async () => {
    if (!isTravelStarted) {
      // Assuming userId is managed elsewhere or globally accessible
      const storedUserId = await AsyncStorage.getItem('userId');
      await startTravel(departureStation, destinationStation, storedUserId);
    } else {
      await endTravel();
    }
  };

  const fling = Gesture.Fling()
    .direction(Directions.UP)
    .runOnJS(true)
    .onEnd((_e, success) => {
      if (success) {
        console.log("esto es lo que peta")
        router.push('/travel');
      }
    });

  const transition = SharedTransition.custom((values) => {
    'worklet';
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
    };
  });

  return (
    <View style={{ flex: 0.1, elevation: 10, backgroundColor: 'white', zIndex: 99, display: 'flex', width: '100%', paddingHorizontal: 20 }}>
      {departureStation && destinationStation && (
        <GestureDetector gesture={fling}>
          <Link href={'/travel'} style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }} asChild>
            <Pressable style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[{ fontFamily: 'Poppins_Bold', color: Colors.text }]}>{text}</Text>
              <Animated.View sharedTransitionTag="shared">
                <TouchableOpacity disabled={!departureStation || !destinationStation} onPress={handleTravelToggle} style={[{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.tint }]}>
                  <Text style={[{ fontFamily: 'Poppins_Bold', fontSize: Fonts.sm }, !departureStation || !destinationStation ? { color: Colors.text } : { color: 'white' }]}>
                    {isTravelStarted ? i18n.t("end_travel") : i18n.t("start_travel")} <AntDesign name="right" />
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Pressable>
          </Link>
        </GestureDetector>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
