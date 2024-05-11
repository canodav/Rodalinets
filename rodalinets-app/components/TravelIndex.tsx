import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';

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
      {departureStation && destinationStation  && (
        <GestureDetector gesture={fling}>
          <Link href={'/travel'} style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }} asChild>
            <Pressable style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'flex-start' }}>
              <View  style={{ flexDirection: 'row', justifyContent: 'center', padding: 0}}>
                <Svg width="40" height="30" viewBox="0 0 14 5" fill="none" rotation={180}>
                  <Path fill-rule="evenodd" clip-rule="evenodd" d="M0.553 0.776004C0.612413 0.657716 0.716308 0.567814 0.841905 0.526011C0.967502 0.484208 1.10455 0.493915 1.223 0.553004L7 3.44L12.776 0.552004C12.8348 0.521985 12.8989 0.503894 12.9647 0.498775C13.0305 0.493657 13.0966 0.50161 13.1593 0.522179C13.222 0.542747 13.28 0.575522 13.33 0.618616C13.38 0.661709 13.4209 0.714268 13.4505 0.773262C13.48 0.832256 13.4976 0.896518 13.5022 0.962344C13.5069 1.02817 13.4984 1.09426 13.4773 1.15679C13.4563 1.21933 13.4231 1.27709 13.3796 1.32672C13.3361 1.37636 13.2832 1.4169 13.224 1.446L7.224 4.446C7.15447 4.48085 7.07777 4.49899 7 4.49899C6.92223 4.49899 6.84553 4.48085 6.776 4.446L0.776 1.446C0.657712 1.38659 0.567811 1.2827 0.526008 1.1571C0.484205 1.0315 0.493912 0.894454 0.553 0.776004Z" fill="black"/>
                </Svg>
              </View>
              {/*
              <Animated.View sharedTransitionTag="sharedTag">
                
                <TouchableOpacity disabled={!departureStation || !destinationStation} onPress={handleTravelToggle} style={[{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.tint }]}>
                  <Text style={[{ fontFamily: 'Poppins_Bold', fontSize: Fonts.sm }, !departureStation || !destinationStation ? { color: Colors.text } : { color: 'white' }]}>
                    {isTravelStarted ? i18n.t("end_travel") : i18n.t("start_travel")} <AntDesign name="right" />
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              */}
            </Pressable>
          </Link>
        </GestureDetector>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
