import { Text, View, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';

import Colors from '@/constants/Colors';

export const TimetableSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.smallCard]}></View>
      <View style={[styles.smallCard]}></View>
      <View style={[styles.smallCard]}></View>
      <View style={[styles.smallCard]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
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
    height: 180,
    gap: 0,
    zIndex: 1,
    elevation: 1,
  },
  smallCard: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 14,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.gray,
    height: 100,
    gap: 0,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_Bold',
  },
});
