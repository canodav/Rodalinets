import { StyleSheet, Pressable, Image, Modal } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as TaskManager from 'expo-task-manager';

import { useStationStore, useStationStoreState } from '@/stores/stationStore';
import { useTravelStore } from '@/stores/travelStore';

import { Text, View } from '@/components/Themed';
import { SelectInput } from '@/components/SelectInput';
import { Timetable } from '@/components/Timetable';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { ExternalLink } from '@/components/ExternalLink';
import { AskLocationModal } from '@/components/AskLocationModal';
import { TravelIndex } from '@/components/TravelIndex';
import { SpeedModal } from '@/components/SpeedModal';
import { StationsSelector } from '@/components/StationsSelector';

const LOCATION_TRACKING = 'background-location-task';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const isTravelStarted = useTravelStore((state) => state.isTravelStarted);

  const [locationPermissions, setLocationPermissions] = useState({ background: false, foreground: false });
  const [travelIndexText, setTravelIndexText] = useState('');

    
  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.High,
      timeInterval: 30000,
      showsBackgroundLocationIndicator: true,
      distanceInterval: 1,
      foregroundService: {
        notificationTitle: 'Utilitzant la teva ubicació',
        notificationBody: 'Per desactivar-lo, torna a l\'aplicació i desactiva alguna cosa.',
        killServiceOnDestroy: true,
      },
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
  };

  const stopLocationTracking = async () => {
    const isTracking = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    if (isTracking) {
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    }
  };

  const generateAndStoreUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        const newUserId = Crypto.randomUUID();
        await AsyncStorage.setItem('userId', newUserId);
        return newUserId;
      }
      return userId;
    } catch (error) {
      console.error('Error al generar o almacenar el ID de usuario:', error);
    }
  };

  const checkLocationPermissions = async () => {
    const foreground = await Location.getForegroundPermissionsAsync()
    const background = await Location.getBackgroundPermissionsAsync()
    
    setLocationPermissions({ background: background.status === 'granted', foreground: foreground.status === 'granted' });
  }

  useEffect(() => {
    if (isTravelStarted) {
      startLocationTracking();
    } else {
      stopLocationTracking();
    }
  }, [isTravelStarted]);


  useEffect(() => {
    checkLocationPermissions();
   
    if(!locationPermissions.background || !locationPermissions.foreground){
      setModalVisible(true);      
    }
    generateAndStoreUserId();
  }, []);


  const requestLocationPermission = async () => {

    let resf = await Location.requestForegroundPermissionsAsync();
    let resb = await Location.requestBackgroundPermissionsAsync();

    
    if (resb.status !== 'granted' || resf.status !== 'granted') {
      setModalVisible(true);
    }
    setLocationPermissions({ background: resb.status === 'granted', foreground: resf.status === 'granted' });
    console.log(resf.status !== 'granted' , resb.status !== 'granted')
    if (resf.status !== 'granted' || resb.status !== 'granted') {
      console.log('Permission to access location was denied');
      Linking.openSettings()
    } else {
      console.log('Permission to access location granted');
    }
  };

  return (
    <>
      {locationPermissions.background && locationPermissions.foreground ? (
        <>
          <View style={styles.container}>
            <StationsSelector></StationsSelector>
            <Timetable />
          </View>
          <TravelIndex text={travelIndexText}></TravelIndex>
        </>
      ) : (
        <>
          <AskLocationModal modalVisible={modalVisible} setModalVisible={setModalVisible} onPressAction={requestLocationPermission} />
        </>
      )}
    </>
  );
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    let latitude = locations[0].coords.latitude;
    let longitude = locations[0].coords.longitude;
    let speed = locations[0].coords.speed;
    try {
      const travelId = await AsyncStorage.getItem('travelId');
        fetch(`https://rodalinets.upf.edu/location?id=${travelId}&latitude=${latitude}&longitude=${longitude}&speed=${speed}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
   
      }
    catch (error) {
      console.log('Error fetching location: ' + error.message);
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 0,
    padding: 14,
    zIndex: 1,
    elevation: 0,
    backgroundColor: Colors.background,
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
