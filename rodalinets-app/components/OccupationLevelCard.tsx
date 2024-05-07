import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { Fonts, LineHeights } from '@/constants/Fonts';
import Colors from '@/constants/Colors';
import i18n from '@/i18n'; // Make sure i18n is properly set up and imported

export const OccupationLevelCard = ({ occupationLevel, light }: { occupationLevel: number, light: boolean }) => {
  return (
    <View>

      <View style={{ flexDirection: 'row', gap: 5 }}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
          <Octicons key={index} name={index <= occupationLevel ? "person-fill" : "person"} size={18} color={light ? Colors.background : Colors.text} />
        ))}
      </View>
 
    </View>
  );
};
