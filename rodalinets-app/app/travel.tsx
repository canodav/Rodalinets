import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, Link } from 'expo-router';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTimetableStore } from '@/stores/timetableStore';
import { useTravelStore } from '@/stores/travelStore';
import { TrainArrival } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useStationStore } from '@/stores/stationStore';

const Travel = () => {
  const timetable = useTimetableStore((state) => state.timetable);
  const departureStation = useStationStore((state) => state.departureStation);
  const destinationStation = useStationStore((state) => state.destinationStation);
  const isTravelStarted = useTravelStore((state) => state.isTravelStarted);
  const setTravelStarted = useTravelStore((state) => state.setTravelStarted);
  const setTravelId = useTravelStore((state) => state.setTravelId);
  const travelId = useTravelStore((state) => state.travelId);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(20 * 60);
  const [userId, setUserId] = useState<string | null>(null);

  const trainArrival = timetable[0];

  const startTravel = async () => {
    if (isTravelStarted || !departureStation || !destinationStation) {
      return;
    }

    const userId = await AsyncStorage.getItem('userId', (uuid) => {
      console.log(uuid);
    });
    setUserId(userId);

    fetch(`https://rodalinets.upf.edu/travel?fromStation=${departureStation.name}&toStation=${destinationStation.name}&userId=${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        //startLocationTracking();
        setTravelId(data.id);
        setTravelStarted(true);
        const timerId = setTimeout(() => {
          //stopLocation();
          endTravel();
        }, 20 * 60 * 1000);
        setTimerId(timerId);
      });
  };

  const endTravel = () => {
    console.log('cancellling travel', travelId);
    fetch('https://rodalinets.upf.edu/travel/' + travelId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endTime: new Date(),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        setTravelStarted(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ width: '100%', height: 180, flexDirection: 'row' }}>
          <View style={{ flex: 0.2, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', transform: [{ translateY: -10 }] }}>
            <View style={{ width: 10, height: 10, backgroundColor: 'white', borderRadius: 999 }}></View>
            <View style={{ width: 3, height: '50%', backgroundColor: 'white' }}></View>
            <View style={{ width: 10, height: 10, backgroundColor: 'white', borderRadius: 999 }}></View>
          </View>
          <View style={{ paddingLeft: 20 }}>
            <View style={{ flexDirection: 'column', flex: 0.5 }}>
              <Text style={[styles.title]}>{departureStation && departureStation.name}</Text>

              <Text style={[styles.label]}>Departure Time:</Text>
              <Text style={[styles.text]}>{trainArrival.estimated_departure_time}</Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 0.5 }}>
              <Text style={[styles.title]}>{destinationStation && destinationStation.name}</Text>

              <Text style={[styles.label, { textAlign: 'left' }]}>Arrival Time:</Text>
              <Text style={[styles.text, { textAlign: 'left' }]}>{trainArrival.estimated_arrival_time}</Text>
            </View>
          </View>
        </View>
        <Link href={'/'} style={{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.background }} asChild>
          <Pressable onPress={isTravelStarted ? () => endTravel() : () => startTravel()} style={{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.background, display: 'flex', alignItems: 'center' }}>
            <Text style={[{ fontFamily: 'Poppins_Bold', color: Colors.text }]}>
              {isTravelStarted ? 'End Travel' : 'Start Travel'} <AntDesign name="right" />
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Travel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 0,
    padding: 10,
    zIndex: 1,
    elevation: 0,
    backgroundColor: Colors.background,
  },

  card: {
    width: '100%',
    backgroundColor: Colors.tint,
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 0,
    paddingHorizontal: 14,
    elevation: 2,
    height: 500,
  },
  text: {
    color: Colors.background,
    fontFamily: 'Poppins_Bold',
    fontSize: 30,
    lineHeight: 34,
  },

  label: {
    color: Colors.background,
    fontSize: 14,
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
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Poppins_Bold',
    color: Colors.background,
  },
});
