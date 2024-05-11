import { useState, useRef } from 'react'
import { Text, View, StyleSheet, Touchable, Pressable } from 'react-native'
import Animated, { FadeInLeft, useAnimatedStyle, withTiming, useSharedValue, SharedTransition } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StationProgress } from '@/components/StationProgress';
import { IconPopup } from '@/components/IconPopup';

import Colors from '@/constants/Colors'
import { Fonts , LineHeights } from '@/constants/Fonts'

import { useStationStore } from '@/stores/stationStore';

import { PixelRatio } from 'react-native';
import { OccupationLevelCard } from './OccupationLevelCard';

import i18n from '@/i18n';

type cardProps = {
    departure_time : string
    estimated_departure_time: string,
    animationDelay?: number,
    id: number,
    incidenceReports: Array<any>,
    occupancyReports: Array<any>,
    principal: boolean,
    style?: Record<string, number | string> | Array<Record<string, number | string>>
    noInfo?: boolean
}

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size : any) => size / fontScale;

export const Card = ({id, departure_time, estimated_departure_time, incidenceReports, occupancyReports, principal, animationDelay, style, noInfo} : cardProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    const animationHeight = useSharedValue(0);
    const arrowAnimation = useSharedValue(0);   
    const averageOccupancy = occupancyReports.averageOccupancy ? occupancyReports.averageOccupancy : 0;

    //const occupancyReportsCounter = occupancyReports.average;

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
            <Link href={`/trainarrival/${id}`} style={[style, {height: '100%', width: '100%', flex: 1}]} asChild>
                <Pressable >
                    <View style={ principal ? styles.container : (noInfo ? styles.grayContainer : styles.whiteContainer) } >
                        <View style={{flexDirection: 'column', flex: 0.8}}>
                            { !noInfo ?
                            <View >
                                <Text style={[styles.label, principal ? null : styles.darkLabel]}>{i18n.t('estimated_departure_time')}</Text><Text style={[principal ? styles.text : styles.darkText , styles.primaryText]}>{estimated_departure_time}</Text>
                            </View>
                            :
                            <View >
                                <Text style={[styles.label, principal ? null : styles.darkLabel, {fontSize: Fonts.base, lineHeight: LineHeights.base, marginBottom: 8, marginTop: 2 }]}>{i18n.t("no_info_text")}</Text>
                            </View>
                            }
                            <View >
                                <Text style={[styles.label, principal ? null : styles.darkLabel] }>Hora d'arribada programada:</Text><Text style={[principal ? styles.text : styles.darkText , styles.secondaryText, {marginBottom: 0}]}>{departure_time}</Text>
                            </View>
                           
                        </View>
                        <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'flex-end', gap: 10 }}>
                            <Text>{id}</Text>
                            {noInfo &&
                            <MaterialCommunityIcons name="information-off-outline" size={24}  color={principal ? Colors.background : Colors.text} />
                            }
                            { (incidenceReports.length > 0) &&
                                <View>
                                    <Ionicons name="warning-outline" size={28} color={principal ? Colors.background : Colors.text} />
                                </View>
                            }
                            <OccupationLevelCard light={principal ? true : false } occupationLevel={averageOccupancy}></OccupationLevelCard>
                        </View>

                    </View>
                </Pressable>
            </Link>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.tint,
        borderRadius: 6,
        paddingVertical: 8,
        marginBottom: 0,
        paddingHorizontal: 10,
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
        borderRadius: 6,
        paddingVertical: 8,
        marginBottom: 0,
        paddingHorizontal:10,
        elevation: 2,
        flexDirection: 'row',    
        justifyContent: 'space-between'    
    },
    grayContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.gray,
        borderRadius: 6,
        paddingVertical: 8,
        marginBottom: 0,
        paddingHorizontal: 10,
        elevation: 2,
        flexDirection: 'row',    
        justifyContent: 'space-between',
        zIndex: 2,
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
        fontSize: Fonts.xl3,
        lineHeight: LineHeights.xl3,
    },
    secondaryText:{
        fontSize: Fonts.xl,
        lineHeight: LineHeights.xl
    },
    label: {
        color: Colors.background,
        fontSize:Fonts.sm,
        lineHeight: LineHeights.sm,
        fontFamily:'Poppins_Bold',
        textTransform: "uppercase"
    },
    darkLabel: {
        color: Colors.text,
    }
})