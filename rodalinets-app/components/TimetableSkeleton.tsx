import {
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";

import { Card } from "@/components/Card";
import Colors from "@/constants/Colors";
import { TrainArrival } from "@/types";

import { useStationStore } from "@/stores/stationStore";
import { SmallCard } from "./SmallCard";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, withRepeat}  from "react-native-reanimated";

export const TimetableSkeleton = () => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, { duration: 3000 }),
            -1, 
            true,
        );
    }, []);
    
    const animatedBg = useAnimatedStyle(() => {
        return {
          backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            ["#E9E9E9", "#F8F8F8"]
          ),
        };
    });


    
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.card, animatedBg]}></Animated.View>
            <Animated.View style={[styles.smallCard, animatedBg]}></Animated.View>
            <Animated.View style={[styles.smallCard, animatedBg]}></Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        gap: 10,
    },
    text: {
        color: Colors.background,
    },
    card: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 14,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.gray,
        height: 120,
        gap: 0
    },
    smallCard: {
        width: '100%',
        borderRadius: 10,
        paddingVertical: 14,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.gray,
        height: 120,
        gap: 0
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignContent: "flex-start",
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins_Bold",
    },
});
