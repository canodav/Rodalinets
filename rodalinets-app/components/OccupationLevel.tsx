import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { Fonts, LineHeights } from '@/constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import i18n from '@/i18n'; // Make sure i18n is properly set up and imported

export const OccupationLevel = ({occupationLevel, reportsCount} : {occupationLevel: number, reportsCount: number}) => {
  const [occupacyLevel, setOccupacy] = useState(0);
  
  return (
    <View style={{marginTop: 10}}>
      <Text style={{ color: Colors.background, fontWeight: 'bold', fontSize: Fonts.lg, lineHeight: LineHeights.lg, marginBottom: 4}}>
        {i18n.t('occupation_level_title')}
      </Text>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 8}}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
          <Octicons key={index} name={index <= occupationLevel ? "person-fill" : "person"} size={30} color={Colors.background} />
        ))}
      </View>
      <Text style={{color: Colors.background, fontSize: Fonts.base, marginBottom: 2}}>
        {occupationLevel > 0 ? i18n.t('occupancy_descriptions')[Math.trunc(occupationLevel)] : i18n.t('no_occupancy_info')}
      </Text>
      <Text style={{color: Colors.background, fontSize: Fonts.sm}}>
        {reportsCount > 0 && (reportsCount === 1 ? i18n.t('info_provided_by_one_user') : i18n.t('info_provided_by_multiple_users', { count: reportsCount }))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({

});
