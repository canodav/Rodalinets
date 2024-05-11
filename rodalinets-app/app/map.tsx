import { StyleSheet, Text, View, TouchableOpacity, Pressable, Touchable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import { useStationStore } from '@/stores/stationStore';
let initialCoords = {latitude: 41.3924353, longitude: 2.1804163}
const fetchLocation = () => {
  return {
    latitude: initialCoords.latitude + Math.random() * 0.01 - 0.005,
    longitude: initialCoords.longitude + Math.random() * 0.01 - 0.005,
  };
}

export default function Map() {
  const departureStation = useStationStore((state) => state.departureStation);
  const destinationStation = useStationStore((state) => state.destinationStation);
  const stations = useStationStore((state) => state.stations);

  const [trainPositions, setTrainPositions] = useState({ latitude: 41.3924353, longitude: 2.1804163})

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTrainPosition = fetchLocation();
      setTrainPositions(newTrainPosition);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: departureStation?.latitude ? departureStation?.latitude : 41.3924353,
          longitude: departureStation?.longitude ? departureStation?.longitude : 2.1804163,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
      >
        {stations.map((station) => (
          <Marker key={station.id} coordinate={{ latitude: station.latitude, longitude: station.longitude }} title={station.name} description={station.name} />
        ))}

        <Marker
         key={200} pinColor={Colors.tint} coordinate={{ latitude: trainPosition.latitude, longitude: trainPosition.longitude }} title={"Tren"} description={"Train n 200"} 
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
