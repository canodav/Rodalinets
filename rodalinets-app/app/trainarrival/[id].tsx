import { StyleSheet, Text, View, TouchableWithoutFeedback, Pressable, Dimensions } from 'react-native';

import Animated, { FadeInDown } from 'react-native-reanimated';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import OutsidePressHandler from 'react-native-outside-press';

import { useTimetableStore } from '@/stores/timetableStore';
import { useStationStore } from '@/stores/stationStore';
import { TrainArrival } from '@/types';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import i18n from '@/i18n';

import { StationProgress } from '@/components/StationProgress';
import { Fonts, LineHeights } from '@/constants/Fonts';
import { OccupationLevel } from '@/components/OccupationLevel';
const windowHeight = Dimensions.get('window').height;

const details = () => {
  const { id } = useLocalSearchParams();
  const timetable = useTimetableStore((state) => state.timetable);

  const stations = useStationStore((state) => state.stations);
  const departureStation = useStationStore((state) => state.departureStation);

  const [outsidePressActivated, setOutsidePressActivated] = useState(true);

  const router = useRouter();

  const trainArrival = timetable.filter((trainArrival: TrainArrival) => trainArrival.Train.id == Number(id))[0];
  return (
    <View style={styles.container}>
      <OutsidePressHandler onOutsidePress={() => outsidePressActivated && router.back()}>
        <Animated.View style={styles.card} entering={FadeInDown.delay(100).duration(300)}>
          <Link href={{pathname: `/notify`, params: {id}}} style={{width: '100%', alignSelf: 'flex-end'}} replace>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>{i18n.t('notify_incident')}</Text>
              <MaterialCommunityIcons name="message-alert" size={30} color="white" />
            </View>
          </Link>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'column', flex: 0.45}}>
              <Text style={styles.label}>{i18n.t('departure_time_label')}</Text>
              <Text style={[styles.text]}>{trainArrival?.estimated_departure_time ? trainArrival?.estimated_departure_time : trainArrival?.departure_time}</Text>
            </View>
            <View style={{flex: 0.1, alignItems: 'center'}}>
              <FontAwesome5 name="long-arrow-alt-right" size={24} color={Colors.background} />
            </View>
            <View style={{flexDirection: 'column', flex: 0.45}}>
              <Text style={[styles.label, {textAlign: 'right'}]}>{i18n.t('arrival_time_label')}</Text>
              <Text style={[styles.text, {textAlign: 'right'}]}>{trainArrival?.estimated_arrival_time ? trainArrival?.estimated_arrival_time : trainArrival?.arrival_time}</Text>
            </View>
          </View>
          <StationProgress stations={stations} currentStation={departureStation} />
          <OccupationLevel reportsCount={trainArrival?.occupancy.reportsCount} occupationLevel={trainArrival?.occupancy.averageOccupancy || 0} />
        </Animated.View>
      </OutsidePressHandler>
    </View>
  );
};

export default details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: windowHeight - 600,
    padding: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },

  card: {
    width: '100%',
    backgroundColor: Colors.tint,
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 0,
    paddingHorizontal: 20,
    flexDirection: 'column',
    gap: 10,
    elevation: 20,
    alignItems: 'stretch'
  },
  text: {
    color: Colors.background,
    fontFamily: 'Poppins_Bold',
    fontSize: Fonts.xl3,
    lineHeight: LineHeights.xl2,
  },

  label: {
    color: Colors.background,
    fontSize: Fonts.sm,
    fontFamily: 'Poppins_Bold',
    textTransform: 'uppercase',
  },
});
