import { StyleSheet, Pressable, Image, Modal } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import * as TaskManager from 'expo-task-manager'

import {useStationStore, useStationStoreState} from '@/stores/stationStore'
import {useTravelStore} from '@/stores/travelStore'

import { Text, View } from '@/components/Themed';
import { SelectInput } from '@/components/SelectInput';
import {Timetable} from '@/components/Timetable'
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { ExternalLink } from '@/components/ExternalLink';
import { AskLocationModal } from '@/components/AskLocationModal';
import { TravelIndex } from '@/components/TravelIndex'
import { SpeedModal } from '@/components/SpeedModal';
import { StationsSelector } from '@/components/StationsSelector'

const LOCATION_TRACKING =  'background-location-task';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [speedModalVisible, setSpeedModalVisible] = useState(false);
  const [speed, setSpeed] = useState<number | null>(0);




  const departureStation = useStationStore(state => state.departureStation);
  const destinationStation = useStationStore(state => state.destinationStation);

  const setDepartureStation = useStationStore(state => state.setDepartureStation);
  const setDestinationStation = useStationStore(state => state.setDestinationStation);

  const setTravelStarted = useTravelStore((state) => state.setTravelStarted);
  const isTravelStarted = useTravelStore((state) => state.isTravelStarted);


  const [locationPermissions, setLocationPermissions] = useState({background: false, foreground: false})
  const [travelIndexText, setTravelIndexText] = useState("");


  const startLocationTracking = async () => {

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.High,
        timeInterval: 30000,
        showsBackgroundLocationIndicator: true,
        distanceInterval: 1,
        foregroundService: {
            notificationTitle: 'Using your location',
            notificationBody: 'To turn off, go back to the app and switch something off.',
            killServiceOnDestroy: true,
        },
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
    );
  };


  const stopLocation = () => {
    setTravelStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
      .then((tracking) => {
          if (tracking) {
              Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
          }
      })
  }


  const generateAndStoreUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        const newUserId = Crypto.randomUUID()
        await AsyncStorage.setItem('userId', newUserId);
        return newUserId;
      }
      return userId;
    } catch (error) {
      console.error('Error al generar o almacenar el ID de usuario:', error);
    }
  };



  useEffect(() => {
    setModalVisible(true);
    generateAndStoreUserId();
    //startLocationTracking();
    const intervalId = setInterval(() => {
      checkSpeed();
    }, 10000); 

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [])

  const checkSpeed = async () => {
    const location  = await Location.getCurrentPositionAsync({});
    setSpeed(location.coords.speed);
    console.log("these are the locations", location);
  }

  const requestLocationPermission = async () => {
    let resf = await Location.requestForegroundPermissionsAsync();
    let resb = await Location.requestBackgroundPermissionsAsync();

    if(resb.status !== 'granted' || resf.status !== 'granted') {
      setModalVisible(true);
    }
    setLocationPermissions({background: resb.status === 'granted', foreground: resf.status === 'granted'} )
    if (resf.status !== 'granted' && resb.status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      console.log('Permission to access location granted');
    }
  };




  return (
    <>
      { 
      (locationPermissions.background && locationPermissions.foreground) ? 
        <>
          <View style={styles.container}>
              <StationsSelector></StationsSelector>
            <Timetable />
          </View>
          <TravelIndex text={travelIndexText}></TravelIndex>
          <SpeedModal modalVisible={speedModalVisible} setModalVisible={setSpeedModalVisible} onPressAction={()=> console.log("aaaa")}>
            <Text>Este es el modal {speed}</Text>
          </SpeedModal>
        </>
      :
      <AskLocationModal modalVisible={modalVisible} setModalVisible={setModalVisible} onPressAction={requestLocationPermission} />
      }
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
      console.log(locations);
      let latitude = locations[0].coords.latitude;
      let longitude = locations[0].coords.longitude;
  
      //let location = await Location.getCurrentPositionAsync({});
      try {
        const travelId = await AsyncStorage.getItem('travelId');
        let isTravelStartedString = await AsyncStorage.getItem('isTravelStarted');
        const isTravelStarted = (isTravelStartedString == "true");

        console.log({isTravelStarted});
        if(!isTravelStarted){
          console.log("just checking speed", locations[0].coords.speed)
          fetch(`https://rodalinets.upf.edu/notification`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: `just checking speed ${locations[0].coords.speed}`})
          });
        }else{
          console.log("now im checking coords and sending to the server")
          fetch(`https://rodalinets.upf.edu/notification`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: "now im checking coords and sending to the server"})
          });
          /*
          fetch(`https://rodalinets.upf.edu/location?id=${travelId}&latitude=${latitude}&longitude=${longitude}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
          .then(data => {
          });*/
        }
      } catch (error) {
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
    padding: 20,
    zIndex: 1,
    elevation: 0,
    backgroundColor: Colors.background
  },


 
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
