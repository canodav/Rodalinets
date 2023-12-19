import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import {AntDesign} from '@expo/vector-icons'

import { useTravelStore } from '@/stores/travelStore'
import { useStationStore } from '@/stores/stationStore'
import Colors from '@/constants/Colors'

export const TravelIndex = (
    {text} : {text: string}
) => {

    const departureStation = useStationStore(state => state.departureStation);
    const destinationStation = useStationStore(state => state.destinationStation);

    const setTravelStarted = useTravelStore((state) => state.setTravelStarted);
    const isTravelStarted = useTravelStore((state) => state.isTravelStarted);
  
  return (
    <View style={{ flex: 0.10,  elevation: 10, backgroundColor: 'white', zIndex: 99 , display: 'flex', width: '100%', paddingHorizontal: 20 }}>
        { (departureStation && destinationStation) &&
        <Link href={"/travel"} style={{backgroundColor: 'red', height: '100%', width: '100%', display: 'flex', flex: 1 }} asChild >
            <Pressable style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', justifyContent:'space-between', alignItems: 'center'}}>
                <Text style={[{fontFamily: 'Poppins_Bold', color: Colors.text}]}>{text}</Text>
                <Pressable disabled={ (departureStation && destinationStation)  ? false :  true} onPress={() => setTravelStarted(true)} style={[{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.tint}]}>
                    <Text 
                    style={[{fontFamily: 'Poppins_Bold'},
                        (!departureStation || !destinationStation) ? {color: Colors.text} : {color: 'white'}
                    ]}>{isTravelStarted ? "End Travel" : "Start Travel" }  <AntDesign name="right" /></Text>
                </Pressable>
            </Pressable>
        </Link>
        }
    </View>
    )
}





const styles = StyleSheet.create({})