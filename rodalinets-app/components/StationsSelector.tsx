import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';

import { SelectInput } from '@/components/SelectInput';
import { FuzzySelectInput } from '@/components/FuzzySelectInput';

import { useStationStore } from '@/stores/stationStore';

import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export const StationsSelector = () => {
  const departureStation = useStationStore((state) => state.departureStation);
  const destinationStation = useStationStore((state) => state.destinationStation);

  const setDepartureStation = useStationStore((state) => state.setDepartureStation);
  const setDestinationStation = useStationStore((state) => state.setDestinationStation);

  const fetchStations = useStationStore((state) => state.fetchStations);
  const stations = useStationStore((state) => state.stations);

  const loadLastTravel = useStationStore((state) => state.loadLastTravel);

  const swapStations = () => {
    const departureStationAux = departureStation;
    setDepartureStation(destinationStation);
    setDestinationStation(departureStationAux);
  };

  useEffect(() => {
    loadLastTravel();
  }, []);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return (
    <View style={styles.selectInputContainer}>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '92%' }}>
        <FuzzySelectInput value={departureStation} onSelect={setDepartureStation} style={{ zIndex: 99, elevation: 10 }} data={stations} placeholder="Select a departure station" label="Departure station" /*nearestStationOption={true} */ />
        <FuzzySelectInput value={destinationStation} onSelect={setDestinationStation} style={{ zIndex: 98, elevation: 8 }} data={stations} placeholder="Select a destination station" label="Destination station" />
      </View>
      <TouchableOpacity style={{ height: '100%', width: '8%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={swapStations}>
        <FontAwesome5 name="exchange-alt" size={16} color="#999" style={{ transform: [{ rotate: '90deg' }] }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 90,
  },
});
