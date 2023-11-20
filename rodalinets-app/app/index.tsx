import { StyleSheet, Pressable, Image, Modal } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

import {useStationStore, useStationStoreState} from '@/stores/stationStore'
import {useTravelStore} from '@/stores/travelStore'

import { Text, View } from '@/components/Themed';
import { SelectInput } from '@/components/SelectInput';
import {Timetable} from '@/components/Timetable'
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { ExternalLink } from '@/components/ExternalLink';



export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const stations =  useStationStore(state => state.stations)
  const fetchStations = useStationStore(state => state.fetchStations);

  const departureStation = useStationStore(state => state.departureStation);
  const destinationStation = useStationStore(state => state.destinationStation);

  const setDepartureStation = useStationStore(state => state.setDepartureStation);
  const setDestinationStation = useStationStore(state => state.setDestinationStation);

  const setTravelStarted = useTravelStore((state) => state.setTravelStarted);

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
    fetchStations();
  }, [fetchStations])

 
  useEffect(() => {
    setModalVisible(true);

    generateAndStoreUserId();
  }, [])

  const requestLocationPermission = async () => {
    let resf = await Location.requestForegroundPermissionsAsync();
    let resb = await Location.requestBackgroundPermissionsAsync();
    if (resf.status !== 'granted' && resb.status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      console.log('Permission to access location granted');
    }
  };


  return (
    <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>We need your background location permission to provide real-time travel updates and route tracking, even when the app is not in the foreground.
          {"\n"}
          {"\n"}
          Please note that all information collected is <Text style={{fontWeight: 'bold'}}>anonymous</Text> and solely used for improving your travel experience.</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                requestLocationPermission();
              }}
            >
              <Text style={styles.textStyle}>Understood</Text>
            </Pressable>
            <ExternalLink href="https://rodalinets.upf.edu/" asChild   style={[styles.button, styles.buttonOpen]}>
              <Pressable>
                <Text style={[styles.textStyle, {color: Colors.text}]}>More information</Text>
              </Pressable>
            </ExternalLink>
          </View>
        </View>
      </View>
    </Modal>
    <View style={styles.container}>
      <View style={styles.selectInputContainer}>
        <SelectInput value={departureStation} onSelect={setDepartureStation} style={{zIndex: 10, elevation: 10}} data={stations} placeholder='Select a departure station' label='Departure station' />
        <SelectInput value={destinationStation} onSelect={setDestinationStation} style={{zIndex: 8, elevation: 8}} data={stations} placeholder='Select a destination station' label='Destination station' />
      </View>
      <Timetable />
    </View>
    <View style={{ flex: 0.10,  elevation: 10, height: 30, backgroundColor: 'white', zIndex: 99 , display: 'flex', width: '100%', alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 20 }}>
        <Link href={"/travel"}  
          style={[{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10},
          (!departureStation || !destinationStation) ? {backgroundColor: Colors.gray} : {backgroundColor: Colors.tint}
          ]
        } asChild>
            <Pressable disabled={ (departureStation && destinationStation)  ? false :  true} onPress={() => setTravelStarted(true)}>
                <Text 
                style={[{fontFamily: 'Poppins_Bold'},
                  (!departureStation || !destinationStation) ? {color: Colors.text} : {color: 'white'}
                ]}>Start Travel <AntDesign name="right" /></Text>
            </Pressable>
        </Link>
      </View>
    </>
  );
}

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

  selectInputContainer:{
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingVertical: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    elevation: 2,
    flex: 1,
    
  },
  buttonOpen: {
    backgroundColor: Colors.background,
  },
  buttonClose: {
    backgroundColor: Colors.tint,

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,

    textAlign: "center"
  }
});
