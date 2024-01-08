import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl, PixelRatio } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/Card';
import Colors from '@/constants/Colors';
import { TrainArrival } from '@/types';

import { useStationStore } from '@/stores/stationStore';
import { useTimetableStore } from '@/stores/timetableStore';

import { SmallCard } from './SmallCard';
import { TimetableSkeleton } from './TimetableSkeleton';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: any) => size / fontScale;

export const Timetable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTimetables().then(() => setRefreshing(false));
  };

  const departureStation = useStationStore((state) => state.departureStation);
  const destinationStation = useStationStore((state) => state.destinationStation);
  const fetchTimetableStore = useTimetableStore((state) => state.fetchTimetable);
  const lastUpdateTime = useTimetableStore((state) => state.lastTimeUpdate);
  const timetable = useTimetableStore((state) => state.timetable);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const fetchTimetables = async () => {
    setIsLoading(true);
    try {
      fetchTimetableStore();
    } catch (error) {
      console.error('Failed to fetch timetables:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (departureStation && destinationStation) {
      fetchTimetables();
    }
  }, [departureStation, destinationStation]);

  useEffect(() => {
    scrollViewRef?.current?.scrollTo({ y: 240 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.titleContainer}>
        <Text style={styles.title}>
          {departureStation && departureStation.name} - {destinationStation && destinationStation.name}
        </Text>
      </Animated.View>
      <View>
        <Text style={{ fontSize: getFontSize(12), lineHeight: getFontSize(12) }}>Last update: {lastUpdateTime}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.tint} />
      ) : departureStation && destinationStation && timetable?.length ? (
        <GestureHandlerRootView style={{ height: '100%' }}>
          <ScrollView style={{ height: '100%' }} ref={scrollViewRef}>
            {timetable.map((item, index) => (
              <Card style={[{ marginBottom: 12 }, index == 4 ? { marginBottom: 300 } : {}]} departure_time={item.departure_time} estimated_departure_time={item.estimated_departure_time} key={item.id} id={item.id} principal={index == 2 ? true : false} animationDelay={200 + 0 * 100} />
            ))}
          </ScrollView>
          {/*
                        <FlatList 
                            data={timetable}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <Card 
                                    departure_time={item.departure_time} 
                                    estimated_departure_time={item.estimated_departure_time} 
                                    key={item.id} 
                                    id={item.id}
                                    principal={(index == 2) ? true : false}
                                    animationDelay={200 + 0 * 100} 
                                /> 
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
                        />
                        */}
        </GestureHandlerRootView>
      ) : (
        <TimetableSkeleton></TimetableSkeleton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    height: '100%',
    flex: 1,
    zIndex: 0,
  },
  text: {
    color: Colors.background,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'flex-start',
  },
  title: {
    fontSize: getFontSize(14),
    fontFamily: 'Poppins_Bold',
  },
});
