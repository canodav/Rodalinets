import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';

type StationProgressProps = {
  stations: Array<any>;
  currentStation: any;
};

type coords = {
  longitude: number;
  latitude: number;
};

export const StationProgress = ({ stations, currentStation }: StationProgressProps) => {
  const [trainPosition, setTrainPosition] = useState(null);
  const [trainPositionPercentages, setTrainPositionPercentages] = useState([10, 50, 80]);
  const [currentTrain, setCurrentTrain] = useState(1);

  function calculateTrainPositionPercentage(trainCoords: coords, stations) {
    const distance = (coord1, coord2) => {
      return Math.sqrt(Math.pow(coord2.lat - coord1.lat, 2) + Math.pow(coord2.lon - coord1.lon, 2));
    };
    const stationDistances = stations.map((station) => ({
      ...station,
      distance: distance({ lat: trainCoords[0], lon: trainCoords[1] }, { lat: station.coords.latitude, lon: station.coords.longitude }),
    }));

    const sortedStations = stationDistances.sort((a, b) => a.distance - b.distance);

    const closestStations = sortedStations.slice(0, 2);

    console.log(
      closestStations.map((station) => ({
        name: station.name,
        dist: station.distance,
      }))
    );

    const closestStationPercentage = stations.findIndex((station) => closestStations[0].coords == station.coords) * 25;

    const distanceBetweenStations = distance(
      {
        lat: closestStations[0].coords.latitude,
        lon: closestStations[0].coords.longitude,
      },
      {
        lat: closestStations[1].coords.latitude,
        lon: closestStations[1].coords.longitude,
      }
    );

    const distanceFromClosestStation = closestStations[0].distance;

    return closestStationPercentage;
  }

  useEffect(() => {
    if (trainPosition && stations.length > 0) {
      const percentage = calculateTrainPositionPercentage(trainPosition, stations);
      setTrainPositionPercentages(percentage);
    }
  }, [trainPosition, stations]);

  const currentIndex = stations.findIndex((station) => {
    return station.name == currentStation.name;
  });

  if (currentIndex === -1) {
    console.error('Current station not found in the list');
    return [];
  }

  const totalElements = 5;
  const half = Math.floor(totalElements / 2);

  let startIndex = Math.max(currentIndex - half, 0);
  let endIndex = startIndex + totalElements;

  if (endIndex > stations.length) {
    endIndex = stations.length;
    startIndex = Math.max(endIndex - totalElements, 0);
  }

  stations = stations.slice(startIndex, endIndex);

  const totalStations = stations.length;

  const stationWidth = 100 / (totalStations - 1);

  async function getTrainPosition() {
    try {
      const res = await fetch('https://rodalinets.upf.edu/train');
      const { coords } = await res.json();
      setTrainPosition(coords.reverse());
    } catch (error) {
      console.error('Failed to fetch train position:', error);
    }
  }

  useEffect(() => {
    //getTrainPosition();
    //const intervalId = setInterval(getTrainPosition, 1000);
    //return () => clearInterval(intervalId);
  }, []);

  //const markerLeftPercentage = trainPositionPercentage * (stationWidth * (totalStations - 1)) / 100;

  return (
    <View style={styles.stationContainer}>
      <View style={styles.container}>
        <View style={styles.line} />
        {stations.map((station, index) => (
          <View key={index} style={[styles.station, station.id === currentStation.id ? styles.currentStation : null, { left: `${index * stationWidth - 1}%` }]}>
            <Text style={styles.stationLabel}>{station.name}</Text>
          </View>
        ))}

        {trainPositionPercentages.map((train, index) => (
          <View key={train} style={[styles.train, { left: `${train}%`, backgroundColor: index == currentTrain ? Colors.tint : '#999999' }]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stationContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    //transform: [{ translateX: -3 }],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    width: '90%',
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  line: {
    position: 'absolute',
    top: '80%',
    width: '100%',
    height: 5,
    backgroundColor: 'black',
  },
  station: {
    position: 'absolute',
    bottom: '20%',
    width: 5,
    height: 16,
    backgroundColor: 'black',
    transform: [{ translateY: 5 }],
  },
  stationLabel: {
    position: 'absolute',
    bottom: 70,
    width: 100,
    textAlign: 'left',

    transform: [{ rotate: '-90deg' }, { translateY: -50 }],
    fontSize: 12,
  },

  currentStation: {
    transform: [{ translateY: 16 }],
  },
  train: {
    position: 'absolute',
    bottom: '20%',
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: Colors.tint,
    transform: [{ translateX: -7.5 }, { translateY: 10 }],
  },
});
