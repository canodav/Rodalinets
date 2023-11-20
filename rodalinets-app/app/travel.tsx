import { StyleSheet, Text, View, Pressable } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, Link } from "expo-router";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTimetableStore } from "@/stores/timetableStore";
import { useTravelStore } from "@/stores/travelStore";
import { TrainArrival } from "@/types";
import Colors from "@/constants/Colors";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useStationStore } from "@/stores/stationStore";

let globalTravelId : null | number = null;

const LOCATION_TRACKING =  'background-location-task';

const startLocationTracking = async () => {

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.High,
        timeInterval: 30000,
        showsBackgroundLocationIndicator: true,
        distanceInterval: 1,
        foregroundService: {
            notificationTitle: 'Using your location',
            notificationBody: 'To turn off, go back to the app and switch something off.',
        },
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
    );
  };

  


const Travel = () => {
    const timetable = useTimetableStore((state) => state.timetable);
    const departureStation = useStationStore((state) => state.departureStation);
    const destinationStation = useStationStore((state) => state.destinationStation);
    const isTravelStarted = useTravelStore((state) => state.isTravelStarted);
    const setTravelStarted = useTravelStore((state) => state.setTravelStarted);
    const setTravelId = useTravelStore((state) => state.setTravelId);


    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    
    const trainArrival = timetable[0];

    useEffect(() => {
        startTravel();
    },[])



  const stopLocation = () => {
    setTravelStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
      .then((tracking) => {
          if (tracking) {
              Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
          }
      })
  }

  const startTravel = async () => {
    if(!isTravelStarted || !departureStation || !destinationStation){
        return;
    }

    const userId = await AsyncStorage.getItem("userId", (uuid) => {console.log(uuid)});
    setUserId(userId); 

    fetch( "https://rodalinets.upf.edu/travel?" + new URLSearchParams({
      fromStation: departureStation.name,
      toStation: destinationStation.name,
      userId: userId
    }),
      {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    })
    .then(data => {
        startLocationTracking();
        setTravelId(data.id);
        const timerId = setTimeout(() => {
          stopLocation();
          endTravel();
        }, 20 * 60 * 1000);
        setTimerId(timerId);
        globalTravelId = data.id;
    })
    
  };

  const endTravel = () => {
    fetch( "https://rodalinets.upf.edu/travel/" + globalTravelId,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        endTime: new Date()
      })
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }).then(data => {
        /*
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(null);
      }
      */
      stopLocation();
    });
  };

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
                    <Link href={"/"}  
                    style={{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.background}} asChild >
                        <Pressable onPress={() => endTravel()} style={{ borderRadius: 10, paddingHorizontal: 30, paddingTop: 12, paddingBottom: 10, backgroundColor: Colors.background}}>
                            <Text 
                            style={{fontFamily: 'Poppins_Bold', color: Colors.text , textAlign: 'center'}}>End travel<AntDesign name="right" /></Text>
                        </Pressable>
                    </Link>
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



TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
        console.log('LOCATION_TRACKING task ERROR:', error);
        return;
    }
    if (data) {
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;
  
        l1 = lat;
        l2 = long;
  
        let location = await Location.getCurrentPositionAsync({});
         
        try {
          fetch("https://rodalinets.upf.edu/location?" + new URLSearchParams({
            id: globalTravelId,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }),
            {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
          .then(data => {
          });
    
        } catch (error) {
          console.log('Error fetching location: ' + error.message);
        }
      }
  });