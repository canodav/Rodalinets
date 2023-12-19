import { useState, useRef } from 'react'
import { Text, View, StyleSheet, Touchable, Pressable } from 'react-native'
import Animated, { FadeInLeft, useAnimatedStyle, withTiming, useSharedValue, SharedTransition } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StationProgress } from '@/components/StationProgress';
import Colors from '@/constants/Colors'
import { useStationStore } from '@/stores/stationStore';


type cardProps = {
    departure_time : string
    real_departure_time: string,
    animationDelay?: number,
    id: number,
}


export const Card = ({id, departure_time, real_departure_time, animationDelay} : cardProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const animationHeight = useSharedValue(0);
    const arrowAnimation = useSharedValue(0);

    const stations =  useStationStore(state => state.stations)
    const departureStation = useStationStore(state => state.departureStation);
    const destinationStation = useStationStore(state => state.destinationStation);

    const toggleCard = () => {
        animationHeight.value = expanded ? 0 : 1; 
        arrowAnimation.value = expanded ? -180 : 0;

        setExpanded(!expanded)
    }


    const heightAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(animationHeight.value * 75, { duration: 300 })
        };
    });



    return (
        <Animated.View entering={FadeInLeft.duration(400).delay(200)}  >
            <Link href={`/trainarrival/${id}`} style={{height: '100%', flex: 1}} asChild>
                <Pressable>
                    <View style={styles.container}  >
                        <View>
                            <View >
                                <Text style={styles.label}>Estimated Departure Time:</Text><Text style={{...styles.text, ...styles.primaryText}}>{real_departure_time}</Text>
                            </View>
                            <View >
                                <Text style={{...styles.label, fontSize: 14} }>Scheduled Time:</Text><Text style={{...styles.text, ...styles.secondaryText}}>{departure_time}</Text>
                            </View>
                        </View>
                        <AntDesign style={{alignSelf: 'flex-end'}} name="plus" size={40} color="white" />
                    </View>
                </Pressable>
            </Link>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.tint,
        borderRadius: 10,
        paddingVertical: 14,
        marginBottom: 0,
        paddingHorizontal: 20,
        elevation: 2,
        height: 150,
        flexDirection: 'row',    
        justifyContent: 'space-between'    
    },
    text: {
        color: Colors.background,
        fontFamily: 'Poppins_Bold',
    },
    primaryText:{
        fontSize: 40,
        lineHeight: 48,
    },
    secondaryText:{
        fontSize: 26,
        lineHeight: 30
    },
    label: {
        color: Colors.background,
        fontSize: 16,
        fontFamily:'Poppins_Bold',
        textTransform: "uppercase"
    }
})