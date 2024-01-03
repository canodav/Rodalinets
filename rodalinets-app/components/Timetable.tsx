import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl, PixelRatio } from 'react-native'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/Card';
import Colors from '@/constants/Colors'
import { TrainArrival } from '@/types';

import { useStationStore } from '@/stores/stationStore';
import { useTimetableStore } from '@/stores/timetableStore';

import { SmallCard } from './SmallCard';
import { TimetableSkeleton } from './TimetableSkeleton';

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size : any) => size / fontScale;


export const Timetable = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchTimetables().then(() => setRefreshing(false));
    };

    const departureStation = useStationStore(state => state.departureStation);
    const destinationStation = useStationStore(state => state.destinationStation);
    const fetchTimetableStore = useTimetableStore(state => state.fetchTimetable);
    const lastUpdateTime = useTimetableStore(state => state.lastTimeUpdate);
    const timetable = useTimetableStore(state => state.timetable);


    const fetchTimetables = async () => {
        setIsLoading(true);
        try {
            fetchTimetableStore();
        } catch (error) {
            console.error('Failed to fetch timetables:', error);
        } finally {
            setIsLoading(false); 
        }
    }

    useEffect(()=> {
        if(departureStation && destinationStation){
            fetchTimetables();
        }
    },[departureStation, destinationStation])

    return (
        <View style={styles.container}>
                <Animated.View style={styles.titleContainer}>
                    <Text style={styles.title}>{departureStation && departureStation.name} - {destinationStation && destinationStation.name}</Text> 
                </Animated.View>
                <View>
                    <Text style={{fontSize: getFontSize(12), lineHeight: getFontSize(12)}}>Last update: {lastUpdateTime}</Text> 
                </View>
            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.tint} />
                ) : (
                    (departureStation && destinationStation && timetable?.length) ?
                    <>
                        <FlatList 
                            data={timetable}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <Card 
                                    departure_time={item.departure_time} 
                                    real_departure_time={item.real_departure_time} 
                                    key={item.id} 
                                    id={item.id}
                                    principal={(index == 0) ? true : false}
                                    animationDelay={200 + 0 * 100} 
                                /> 
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
                        />
                    </>
                :
                <TimetableSkeleton></TimetableSkeleton>
                )}   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        gap: 5,
        height: '100%',
        flex: 1,
    },
    text: {
        color: Colors.background
    },
    titleContainer : {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'flex-start',
    },
    title: {
        fontSize: getFontSize(14),
        fontFamily: 'Poppins_Bold'
    },
})