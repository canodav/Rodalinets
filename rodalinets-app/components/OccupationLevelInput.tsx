import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { Fonts, LineHeights } from '@/constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { useTimetableStore } from '@/stores/timetableStore';
import i18n from '@/i18n';

export const OccupationLevelInput = ({trainId} : {trainId: string}) => {
  const [occupancyLevel, setOccupancy] = useState(0);
  const fetchTimetable = useTimetableStore((state) => state.fetchTimetable);

  const occupancyLabels = [
    "",
    "Està gairebé buit: molts seients lliures.",
    "No hi ha massa gent: Alguns seients disponibles.",
    "Bastant ple: pocs seients i poc espai per estar dret.",
    "Està pràcticament ple: Poc espai per estar dret.",
    "Ple: no accepta més passatgers"
  ];

  const setOccupancyHandler = async (level: number) => {
    
    const userId = await AsyncStorage.getItem('userId', (userId) => {
    });
    const response = await fetch(`https://rodalinets.upf.edu/train/${trainId}/reportOccupancy?occupancyLevel=${level}&userId=${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setOccupancy(level)
    fetchTimetable();
  }

  const fetchOccupancy = async () => {
    const userId = await AsyncStorage.getItem('userId', (userId) => {
    });

    const response = await fetch(`https://rodalinets.upf.edu/train/${trainId}/reportOccupancy?&userId=${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { reports } = await response.json();
    setOccupancy(reports.averageOccupancy)
  }

  useEffect(() => {
    fetchOccupancy()

  }, [])

  return (
    <View style={{marginTop: 10}}>
      <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: Fonts.lg, lineHeight: LineHeights.lg }}>
        {i18n.t('occupation_level_title')}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: 5 }, (_, index) => (
          <Pressable onPress={() => setOccupancyHandler(index + 1)} key={index}>
            <Octicons name={index < occupancyLevel ? "person-fill" : "person"} size={35} color={Colors.tint} style={styles.icon} />
          </Pressable>
        ))}
      </View>
      <Text style={{color: Colors.text, fontSize: Fonts.base}}>
        {i18n.t('occupancy_descriptions')[occupancyLevel]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 7,
    marginVertical: 5,
  },
});
