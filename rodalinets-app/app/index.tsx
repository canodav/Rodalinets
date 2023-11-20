import { StyleSheet, Pressable, Image } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from 'react';

import * as Location from 'expo-location';

import {useStationStore, useStationStoreState} from '@/stores/stationStore'
import { Text, View } from '@/components/Themed';
import { SelectInput } from '@/components/SelectInput';
import {Timetable} from '@/components/Timetable'
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';



export default function Home() {
  const stations =  useStationStore(state => state.stations)
  const fetchStations = useStationStore(state => state.fetchStations);

  const departureStation = useStationStore(state => state.departureStation);
  const destinationStation = useStationStore(state => state.destinationStation);

  const setDepartureStation = useStationStore(state => state.setDepartureStation);
  const setDestinationStation = useStationStore(state => state.setDestinationStation);

  useEffect(() => {
    fetchStations();
  }, [fetchStations])

 
  useEffect(() => {
    const config = async () => {
      let resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();
    if (resf.status != 'granted' && resb.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, [])


  return (
    <>
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
            <Pressable disabled={ (departureStation && destinationStation)  ? false :  true} >
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
});
