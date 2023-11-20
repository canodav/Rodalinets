import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/Card';
import Colors from '@/constants/Colors'
import { TrainArrival } from '@/types';

import { useStationStore } from '@/stores/stationStore';
import { useTimetableStore } from '@/stores/timetableStore';

import { SmallCard } from './SmallCard';
import { TimetableSkeleton } from './TimetableSkeleton';

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
                    <Text>Last update: {lastUpdateTime}</Text> 
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
                                (index == 0) ?
                                <Card 
                                    departure_time={timetable[0]?.departure_time} 
                                    real_departure_time={timetable[0]?.real_departure_time} 
                                    key={timetable[0]?.id} 
                                    id={timetable[0]?.id}
                                    animationDelay={200 + 0 * 100} 
                                /> 
                                :
                                <SmallCard 
                                    departure_time={item.departure_time} 
                                    real_departure_time={item.real_departure_time} 
                                    key={item.id} 
                                    id={item.id}
                                    animationDelay={200 + index * 100} 
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
        fontSize: 16,
        fontFamily: 'Poppins_Bold'
    },
})