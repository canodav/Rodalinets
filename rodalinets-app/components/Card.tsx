import { useState, useRef } from 'react'
import { Text, View, StyleSheet, Touchable, Pressable } from 'react-native'
import Animated, { FadeInLeft, useAnimatedStyle, withTiming, useSharedValue, SharedTransition } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StationProgress } from '@/components/StationProgress';
import Colors from '@/constants/Colors'
import { useStationStore } from '@/stores/stationStore';

import { PixelRatio } from 'react-native';



type cardProps = {
    departure_time : string
    estimated_departure_time: string,
    animationDelay?: number,
    id: number,
    principal: boolean,
    style?: Record<string, number | string> | Array<Record<string, number | string>>
}

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size : any) => size / fontScale;

export const Card = ({id, departure_time, estimated_departure_time, principal, animationDelay, style} : cardProps) => {
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
            <Link href={`/trainarrival/${id}`} style={[style, {height: '100%', flex: 1}]} asChild>
                <Pressable>
                    <View style={ principal ? styles.container : styles.whiteContainer} >
                        <View>
                            <View >
                                <Text style={[styles.label, principal ? null : styles.darkLabel]}>Estimated Departure Time:</Text><Text style={[principal ? styles.text : styles.darkText , styles.primaryText]}>{estimated_departure_time}</Text>
                            </View>
                            <View >
                                <Text style={[styles.label, principal ? null : styles.darkLabel] }>Scheduled Time:</Text><Text style={[principal ? styles.text : styles.darkText , styles.secondaryText]}>{departure_time}</Text>
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
        paddingVertical: 12,
        paddingTop: 14,
        marginBottom: 0,
        paddingHorizontal: 20,
        elevation: 2,
        flexDirection: 'row',    
        justifyContent: 'space-between',
        zIndex: 2,
    },
    whiteContainer: {
        width: '100%',
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.gray,
        borderRadius: 10,
        paddingVertical: 12,
        paddingTop: 14,
        marginBottom: 0,
        paddingHorizontal: 20,
        elevation: 2,
        flexDirection: 'row',    
        justifyContent: 'space-between'    
    },
    text: {
        color: Colors.background,
        fontFamily: 'Poppins_Bold',
    },
    darkText: {
        color: Colors.text,
        fontFamily: 'Poppins_Bold',
    },
    primaryText:{
        fontSize: getFontSize(24),
        lineHeight: getFontSize(28),
    },
    secondaryText:{
        fontSize: getFontSize(18),
        lineHeight: getFontSize(22)
    },
    label: {
        color: Colors.background,
        fontSize: getFontSize(14),
        lineHeight: getFontSize(18),
        fontFamily:'Poppins_Bold',
        textTransform: "uppercase"
    },
    darkLabel: {
        color: Colors.text,
    }
})