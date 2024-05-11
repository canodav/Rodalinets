import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, Link, router } from 'expo-router';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { OccupationLevelInput } from '@/components/OccupationLevelInput';

import { useTimetableStore } from '@/stores/timetableStore';
import { useTravelStore } from '@/stores/travelStore';
import { TrainArrival } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

import { useStationStore } from '@/stores/stationStore';

import i18n from '@/i18n';

import { Fonts, LineHeights } from '@/constants/Fonts';

import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';

const Travel = () => {
  const timetable = useTimetableStore((state) => state.timetable);
  const departureStation = useStationStore((state) => state.departureStation);
  const destinationStation = useStationStore((state) => state.destinationStation);
  const isTravelStarted = useTravelStore((state) => state.isTravelStarted);
  const startTravel = useTravelStore((state) => state.startTravel);
  const endTravel = useTravelStore((state) => state.endTravel);
  const startTime = useTravelStore((state) => state.startTime);

  const travelId = useTravelStore((state) => state.travelId);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(20 * 60);
  const [userId, setUserId] = useState<string | null>(null);

  const [locationCount, setLocationCount] = useState<number>(0);

  const trainArrival = timetable[2];

  const [travelTime, setTravelTime] = useState('');

  useEffect(() => {
    let intervalId : Timeout;
    console.log({isTravelStarted, startTime})

    if (isTravelStarted && startTime) {
      console.log("asdsadsa")
      intervalId = setInterval(() => {
        const now = Date.now();
        const elapsed = new Date(now - startTime);
        const minutes = elapsed.getUTCMinutes().toString().padStart(2, '0');
        const seconds = elapsed.getUTCSeconds().toString().padStart(2, '0');
        setTravelTime(`${minutes}:${seconds}`);
      }, 1000); // Update every second
    } else {
      setTravelTime('00:00'); 
    }

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount or when the conditions change
    };
  }, [isTravelStarted, startTime]);


  const fetchTravelLocations = async (travelId: number) => {
    try {
      const response = await fetch(`https://rodalinets.upf.edu/location?travelId=${travelId}`);
      if (response.ok) {
        let data = await response.json();
        setLocationCount(data.length)
        return data;
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleStartTravel = async () => {
    if (!isTravelStarted && departureStation && destinationStation && userId) {
      await startTravel(departureStation, destinationStation, userId);
    }
  };

  const handleEndTravel = async () => {
    await endTravel();
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    fetchUserId();
  }, []);

  const fling = Gesture.Fling()
    .direction(Directions.DOWN)
    .runOnJS(true)
    .onEnd((_e, success) => {
      if (success) {
        router.push("/");
      }
  });

  if(travelId){
    fetchTravelLocations(travelId)
  }

  return (
    <View style={styles.container}>
      <GestureDetector gesture={fling}>
        <View style={styles.card}>
          <Pressable onPress={() => router.back()} style={{ flexDirection: 'row', justifyContent: 'center', padding: 0}}>
            <Svg width="40" height="30" viewBox="0 0 14 5" fill="none">
              <Path fill-rule="evenodd" clip-rule="evenodd" d="M0.553 0.776004C0.612413 0.657716 0.716308 0.567814 0.841905 0.526011C0.967502 0.484208 1.10455 0.493915 1.223 0.553004L7 3.44L12.776 0.552004C12.8348 0.521985 12.8989 0.503894 12.9647 0.498775C13.0305 0.493657 13.0966 0.50161 13.1593 0.522179C13.222 0.542747 13.28 0.575522 13.33 0.618616C13.38 0.661709 13.4209 0.714268 13.4505 0.773262C13.48 0.832256 13.4976 0.896518 13.5022 0.962344C13.5069 1.02817 13.4984 1.09426 13.4773 1.15679C13.4563 1.21933 13.4231 1.27709 13.3796 1.32672C13.3361 1.37636 13.2832 1.4169 13.224 1.446L7.224 4.446C7.15447 4.48085 7.07777 4.49899 7 4.49899C6.92223 4.49899 6.84553 4.48085 6.776 4.446L0.776 1.446C0.657712 1.38659 0.567811 1.2827 0.526008 1.1571C0.484205 1.0315 0.493912 0.894454 0.553 0.776004Z" fill="black"/>
            </Svg>
          </Pressable>
          <View style={{ width: '100%', height: 180, flexDirection: 'row', marginTop: 10}}>
            <View style={{ flex: 0.2, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', transform: [{ translateY: -10 }] }}>
              <View style={{ width: 10, height: 10, backgroundColor: Colors.text, borderRadius: 999 }}></View>
              <View style={{ width: 3, height: '50%', backgroundColor: Colors.text }}></View>
              <View style={{ width: 10, height: 10, backgroundColor: Colors.text, borderRadius: 999 }}></View>
            </View>
            <View style={{ paddingLeft: 20 }}>
            <View style={{ flexDirection: 'column', flex: 0.5 }}>
              <Text style={[styles.title]}>{departureStation && departureStation.name}</Text>
              <Text style={[styles.label]}>{i18n.t('departure_time_label')}</Text>
              <Text style={[styles.text]}>{trainArrival.estimated_departure_time ? trainArrival.estimated_departure_time : trainArrival.departure_time}</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 0.5 }}>
              <Text style={[styles.title]}>{destinationStation && destinationStation.name}</Text>
              <Text style={[styles.label]}>{i18n.t('arrival_time_label')}</Text>
              <Text style={[styles.text]}>{trainArrival.estimated_arrival_time ? trainArrival.estimated_arrival_time : trainArrival.arrival_time}</Text>
            </View>
          </View>
          </View>
          <View  style={{  flex: 1, height: '100%'}}>
            <Text>Is travel started: {isTravelStarted}</Text>
            <Text style={{fontSize: Fonts.lg, fontWeight: 'bold'}}>{i18n.t('travel_id')}</Text>
            <Text style={{fontFamily: 'Poppins_Bold',fontSize: Fonts.xl3}}>{travelId}</Text>

            <Text style={{fontSize: Fonts.lg, fontWeight: 'bold'}}>{i18n.t('travel_time')}</Text>
            <Text style={{fontFamily: 'Poppins_Bold',fontSize: Fonts.xl3}}>{travelTime}</Text>
            <Text style={{fontSize: Fonts.lg, fontWeight: 'bold'}}>{i18n.t('number_of_contributions')}</Text>
            <Text style={{fontFamily: 'Poppins_Bold',fontSize: Fonts.xl3}}>{locationCount}</Text>

            <OccupationLevelInput trainId={trainArrival.TrainId} />
          </View>
         
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {/*
            <Animated.View sharedTransitionTag="sharedTag">
              <TouchableOpacity onPress={isTravelStarted ? handleEndTravel : handleStartTravel} style={[{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.tint }]}>
                <Text style={[{ fontFamily: 'Poppins_Bold', color: Colors.background, fontSize: Fonts.sm }]}>
                  {isTravelStarted ? i18n.t('end_travel') : i18n.t('start_travel')} <AntDesign name="right" />
                </Text>
              </TouchableOpacity>
            </Animated.View>
            */}
          </View>
        </View>
      </GestureDetector>
    </View>
  );
};

export default Travel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
    paddingTop: 0,
    zIndex: 1,
    elevation: 0,
  },

  card: {
    width: '100%',
    backgroundColor: Colors.background,
    borderColor: Colors.gray,
    borderWidth: 1,

    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 20,
    marginBottom: 0,
    elevation: 0,
    zIndex: 0,
    boxShadow: 1,
    height: 580,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.text,
    fontFamily: 'Poppins_Bold',
    fontSize: Fonts.lg,
    lineHeight: LineHeights.lg,
  },

  label: {
    color: Colors.text,
    fontSize: Fonts.base,

    fontFamily: 'Poppins_Bold',
    textTransform: 'uppercase',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'flex-start',
  },
  title: {
    fontSize: Fonts.xl,
    lineHeight: LineHeights.xl,
    fontFamily: 'Poppins_Bold',
    color: Colors.text,
  },
});
