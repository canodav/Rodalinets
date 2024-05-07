import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl, PixelRatio, Animated, Pressable, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';

import { Card } from '@/components/Card';
import Colors from '@/constants/Colors';
import { Fonts, LineHeights } from '@/constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TrainArrival } from '@/types';

import { useStationStore } from '@/stores/stationStore';
import { useTimetableStore } from '@/stores/timetableStore';

import { TimetableSkeleton } from './TimetableSkeleton';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

import i18n from '@/i18n';


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

    scrollViewRef?.current?.scrollTo({ y: 190, animated: false });
  }, [timetable]);

  
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', gap: 10, justifyContent: 'space-between'}}>
        <View style={{}}>
          <Animated.View style={styles.titleContainer}>
            <Text style={styles.title}>
              {departureStation && departureStation.name} - {destinationStation && destinationStation.name}
            </Text>
          </Animated.View>
          <View>
            <Text style={{ fontSize: Fonts.sm, lineHeight: Fonts.sm }}>{i18n.t("last_update")}: {lastUpdateTime}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={fetchTimetables} >
          <MaterialCommunityIcons name="reload" size={28} color={Colors.text} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.tint} />
      ) : departureStation && destinationStation && timetable?.length ? (
        <GestureHandlerRootView style={{ height: '100%' }}>
          <ScrollView  style={{ height: '100%' }} ref={scrollViewRef} fadingEdgeLength={100}>
            { timetable.map((item, index) => (
              <Card style={[{ marginBottom: 8 }, index == 5 ? { marginBottom: 180 } : {}]} incidenceReports={item.incidenceReports} occupancyReports={item.occupancy} departure_time={item.departure_time} estimated_departure_time={item.estimated_departure_time} key={item.Train.id} id={item.Train.id} principal={index == 2 ? true : false} noInfo={Math.round(Math.random()) == 0} animationDelay={200 + 0 * 100} />
            ))}
          </ScrollView>
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
    fontSize: Fonts.sm,
    lineHeight: LineHeights.sm,
    fontFamily: 'Poppins_Bold',
  },
});
