import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import Animated, {FadeInDown} from 'react-native-reanimated';
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import OutsidePressHandler from 'react-native-outside-press';

import { useTimetableStore } from "@/stores/timetableStore";
import {useStationStore} from "@/stores/stationStore"
import { TrainArrival } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { StationProgress } from '@/components/StationProgress';


const details = () => {
  const {id} = useLocalSearchParams();
  const timetable = useTimetableStore(state => state.timetable);

  const stations =  useStationStore(state => state.stations)
  const departureStation = useStationStore(state => state.departureStation);
  const destinationStation = useStationStore(state => state.destinationStation);

  const router = useRouter();

  const trainArrival = timetable.filter((trainArrival : TrainArrival ) => trainArrival.id == Number(id))[0]

    return (
      <View style={styles.container} >
        <OutsidePressHandler
          onOutsidePress={() => {
            router.back()
          }}
        >
          <Animated.View style={styles.card} entering={FadeInDown.delay(100).duration(300)}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignContent: 'center', alignItems: 'center',  width: '100%'}}>
              <View style={{flexDirection: 'column', flex: 0.4}}>
                <Text style={[styles.label]}>Departure Time:</Text><Text style={[styles.text]}>{trainArrival.estimated_departure_time}</Text>
              </View>
              <View style={{flex: 0.2, alignItems: 'center'}}>
              <FontAwesome5 name="long-arrow-alt-right" size={24} color={Colors.background} />
              </View>

              <View style={{flexDirection: 'column', flex: 0.4}}>
                <Text style={[styles.label, {textAlign: 'right'}] }>Arrival Time:</Text><Text style={[styles.text, {textAlign: 'right'}]}>{trainArrival.estimated_arrival_time}</Text>
              </View>
            </View>
            <View style={[{ overflow: 'hidden', height: 200}]}>
                <StationProgress stations={stations} currentStation={departureStation} />
            </View>
          </Animated.View>
        </OutsidePressHandler>
      </View>
  )
}

export default details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 200,
    padding: 20,
    zIndex: 1,
    backgroundColor:  'rgba(255,255,255,0.7)',

  },

  card: {
      width: '100%',
      backgroundColor: Colors.tint,
      borderRadius: 10,
      paddingVertical: 14,
      marginBottom: 0,
      paddingHorizontal: 20,
      flexDirection: 'column',    
      gap: 30,
      elevation: 20,

  },
  text: {
      color: Colors.background,
      fontFamily: 'Poppins_Bold',
      fontSize: 30,
      lineHeight: 48,
  },

  label: {
      color: Colors.background,
      fontSize: 14,
      fontFamily:'Poppins_Bold',
      textTransform: "uppercase"
  }
})