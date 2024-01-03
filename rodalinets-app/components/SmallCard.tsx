import Colors from '@/constants/Colors'
import { Text, View, StyleSheet } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { PixelRatio } from 'react-native';


type cardProps = {
    departure_time : string
    real_departure_time: string,
    animationDelay?: number,
    id: number,
}
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size : any) => size / fontScale;


export const SmallCard = ({id, departure_time, real_departure_time, animationDelay} : cardProps) => {
    return (
        <Animated.View style={styles.container}  entering={FadeInLeft.duration(400).delay(400)}  >
            <Text style={styles.label}>Estimated Departure Time:</Text><Text style={{...styles.text, ...styles.primaryText}}>{real_departure_time}</Text>
            <Text style={{...styles.label, fontSize: 14} }>Scheduled Time:</Text><Text style={{...styles.text, ...styles.secondaryText}}>{departure_time}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: Colors.background,
        borderRadius: 10,
        paddingVertical: 14,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: Colors.gray,
        gap: 0,
        height: 120,
    },
    text: {
        color: Colors.text,
        fontFamily: 'Poppins_Bold',
    },
    primaryText:{
        fontSize: getFontSize(28),
        lineHeight: getFontSize(32),
    },
    secondaryText:{
        fontSize: getFontSize(20),
        lineHeight: getFontSize(24)
    },
    label: {
        color: Colors.text,
        fontSize: getFontSize(16),
        lineHeight: getFontSize(20),
        fontFamily:'Poppins_Bold',
        textTransform: "uppercase"
    }
})

