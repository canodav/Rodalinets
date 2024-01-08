import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useStationStore } from '@/stores/stationStore';
import Colors from '@/constants/Colors';

const NearestStationOption = () => {
  const fetchNearestStation = useStationStore((state) => state.fetchNearestStation);
  const nearestStation = useStationStore((state) => state.nearestStation);

  const getNearestStation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    fetchNearestStation(location.coords.latitude, location.coords.longitude);
  };

  const formatDistance = (distance: number) => {
    let distanceString = '';
    if (distance < 1) {
      //print it like meters
      distanceString = Math.round(distance * 1000) + 'm';
    } else {
      distanceString = distance.toFixed(2) + 'km';
    }
    return distanceString;
  };

  return (
    <View>
      <Pressable style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={getNearestStation}>
        <Ionicons name="location-sharp" size={24} color="#00A0D3" />
        <Text style={{ color: '#00A0D3', fontFamily: 'Poppins_Bold' }}>Nearest Station {nearestStation && <Text style={{ color: Colors.text, fontFamily: 'Poppins_Bold' }}>{nearestStation.name + ' ≈ ' + formatDistance(nearestStation.distance)}</Text>} </Text>
      </Pressable>
      <View style={{ width: '100%', height: 1.3, backgroundColor: '#e9e9e9' }} />
    </View>
  );
};

export default NearestStationOption;

const styles = StyleSheet.create({});
