import { StyleSheet, Pressable, Image } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

import {useStationStore, useStationStoreState} from '@/stores/stationStore'
import { Text, View } from '@/components/Themed';
import { SelectInput } from '@/components/SelectInput';
import {Timetable} from '@/components/Timetable'
import Colors from '@/constants/Colors';


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

 
  return (
    <View style={styles.container}>
      <View style={styles.selectInputContainer}>
        <SelectInput onSelect={setDepartureStation} style={{zIndex: 9}} data={stations} placeholder='Select a departure station' label='Departure station' />
        <SelectInput onSelect={setDestinationStation} style={{zIndex: 8}} data={stations} placeholder='Select a destination station' label='Destination station' />
      </View>
      <Timetable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
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
    width: '100%'
  },
 
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
