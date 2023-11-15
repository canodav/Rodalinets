import Colors from '@/constants/Colors'
import { Text, View, StyleSheet } from 'react-native'
import Animated, { FadeInLeft } from 'react-native-reanimated';

type cardProps = {
    departure_time : string
    real_departure_time: string,
    animationDelay?: number,
}

export const Card = ({departure_time, real_departure_time, animationDelay} : cardProps) => {

    return (
      <View /*entering={FadeInLeft.duration(400).delay(animationDelay ? animationDelay : 200)}  */ style={styles.container}>
        <Text style={styles.label}>Estimated Departure Time:</Text><Text style={{...styles.text, ...styles.primaryText}}>{real_departure_time}</Text>
        <Text style={{...styles.label, fontSize: 14} }>Scheduled Time:</Text><Text style={{...styles.text, ...styles.secondaryText}}>{departure_time}</Text>
      </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: Colors.tint,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
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