import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react';

import { Card } from '@/components/Card';
import Colors from '@/constants/Colors'
import { TrainArrival } from '@/types';

import { useStationStore } from '@/stores/stationStore';

export const Timetable = () => {

    const [timetable, setTimetable] = useState<Array<TrainArrival>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [lastUpdateTime, setLastUpdateTime] = useState<string>(""); 
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchTimetables().then(() => setRefreshing(false));
    };

    const departureStation = useStationStore(state => state.departureStation);
    const destinationStation = useStationStore(state => state.destinationStation);

    const fetchTimetables = async () => {
        setIsLoading(true);
        try {
            if(departureStation && destinationStation){
                const currentTime = new Date().valueOf();
                const response = await fetch(`https://rodalinets.upf.edu/train?fromStationId=${departureStation.id}&toStationId=${destinationStation.id}&currentTime=${currentTime}&limit=3`)
                const { trains } = await response.json();
                setTimetable(trains);
                setLastUpdateTime(new Date().toLocaleString());
            }
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
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{departureStation && departureStation.name} - {destinationStation && destinationStation.name}</Text> 
            </View>
            <View>
                <Text>Last update: {lastUpdateTime}</Text> 
            </View>
         {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                (departureStation && destinationStation) && 
                <FlatList 
                    data={timetable}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <Card 
                            departure_time={item.departure_time} 
                            real_departure_time={item.real_departure_time} 
                            key={item.id} 
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
        
            )}   
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        gap: 10
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
        fontSize: 18,
        fontFamily: 'Poppins_Bold'
      },
})