import { StyleSheet, Text, View } from 'react-native'
import Animated, {FadeInLeft} from 'react-native-reanimated';
import React from 'react'
import { useLocalSearchParams, Link } from 'expo-router'


import { useTimetableStore } from "@/stores/timetableStore";
import { TrainArrival } from '@/types';
import Colors from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';


const details = () => {
  const {id} = useLocalSearchParams();
  const timetable = useTimetableStore(state => state.timetable);

  const trainArrival = timetable.filter((trainArrival : TrainArrival ) => trainArrival.id == Number(id))[0]
 // console.log(trainArrival);
    return (
      <View style={styles.container}>
          <View style={styles.card}  >
              <View style={{flexDirection: 'row', justifyContent:'space-between', width: '100%'}}>
                <Animated.View sharedTransitionTag='sharedTag' style={{flexDirection: 'column'}}>
                  <Text style={[styles.label]}>Departure Time:</Text><Text style={[styles.text]}>{trainArrival.real_departure_time}</Text>
                </Animated.View>
                <View style={{alignSelf: 'flex-end'}}>
                  <FontAwesome5 name="long-arrow-alt-right" size={24} color={Colors.background} />
                </View>
                <Animated.View sharedTransitionTag='sharedTag' style={{flexDirection: 'column'}}>
                  <Text style={[styles.label, {textAlign: 'right'}] }>Arrival Time:</Text><Text style={[styles.text, {textAlign: 'right'}]}>{trainArrival.estimated_arrival_time}</Text>
                </Animated.View>
              </View>

          </View>
          { /*
          <Animated.View style={[{backgroundColor: Colors.gray, overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}]}>
              <StationProgress stations={stations} currentStation={{"id":79412, "name":"Cabrera de Mar-Vilassar de Mar","latitude":41.506864,"longitude":2.4013433,"index":13}} />
          </Animated.View>
        */ }
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
    paddingTop: 0,
    padding: 20,
    zIndex: 1,
    elevation: 0,
    backgroundColor: Colors.background
  },

  card: {
      width: '100%',
      backgroundColor: Colors.tint,
      borderRadius: 10,
      paddingVertical: 14,
      marginBottom: 0,
      paddingHorizontal: 20,
      elevation: 2,
      height: 500,
      flexDirection: 'row',    
      justifyContent: 'space-between'    
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