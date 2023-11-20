import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import React from "react";
import { useLocalSearchParams, Link } from "expo-router";

import { useTimetableStore } from "@/stores/timetableStore";
import { TrainArrival } from "@/types";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useStationStore } from "@/stores/stationStore";

const Travel = () => {
    const timetable = useTimetableStore((state) => state.timetable);
    const departureStation = useStationStore((state) => state.departureStation);
    const destinationStation = useStationStore(
        (state) => state.destinationStation
    );

    const trainArrival = timetable[0];

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View style={{width: '100%', height: 180, flexDirection: 'row'}}>
                    <View style={{flex: 0.2, display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', transform: [{translateY: -10}] }}>
                        <View style={{width: 10, height: 10, backgroundColor: 'white', borderRadius: 999 }}></View>
                        <View style={{width: 3, height: '50%', backgroundColor: 'white', }}></View>
                        <View style={{width: 10, height: 10, backgroundColor: 'white',  borderRadius: 999 }}></View>
                    </View>
                    <View style={{paddingLeft: 20}}>
                        <View style={{ flexDirection: "column" , flex: 0.5}}>
                            <Text style={[styles.title]}>{departureStation && departureStation.name}</Text>

                            <Text style={[styles.label]}>Departure Time:</Text>
                            <Text style={[styles.text]}>
                                {trainArrival.real_departure_time}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "column",  flex: 0.5 }}>
                            <Text style={[styles.title]}>{destinationStation && destinationStation.name}</Text>

                            <Text style={[styles.label, { textAlign: "left" }]}>
                                Arrival Time:
                            </Text>
                            <Text style={[styles.text, { textAlign: "left" }]}>
                                {trainArrival.estimated_arrival_time}
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
            {/*
          <Animated.View style={[{backgroundColor: Colors.gray, overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}]}>
              <StationProgress stations={stations} currentStation={{"id":79412, "name":"Cabrera de Mar-Vilassar de Mar","latitude":41.506864,"longitude":2.4013433,"index":13}} />
          </Animated.View>
        */}
        </View>
    );
};

export default Travel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        paddingTop: 0,
        padding: 10,
        zIndex: 1,
        elevation: 0,
        backgroundColor: Colors.background,
    },

    card: {
        width: "100%",
        backgroundColor: Colors.tint,
        borderRadius: 10,
        paddingVertical: 14,
        marginBottom: 0,
        paddingHorizontal: 14,
        elevation: 2,
        height: 500,
    },
    text: {
        color: Colors.background,
        fontFamily: "Poppins_Bold",
        fontSize: 30,
        lineHeight: 34,
    },

    label: {
        color: Colors.background,
        fontSize: 14,
        fontFamily: "Poppins_Bold",
        textTransform: "uppercase",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignContent: "flex-start",
    },
    title: {
        fontSize: 18,
        lineHeight: 24,
        fontFamily: "Poppins_Bold",
        color: Colors.background
    },
});
