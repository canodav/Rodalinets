import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput, TouchableWithoutFeedback, FlatList, PixelRatio, Keyboard } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Station, SelectInputProps } from '@/types';
import { useStationStore } from '@/stores/stationStore';

import NearestStationOption from '@/components/NearestStationOption';
import OutsidePressHandler from 'react-native-outside-press';

import Fuse from 'fuse.js';
import { Fonts, LineHeights } from '@/constants/Fonts';

export const FuzzySelectInput = ({ data, placeholder, label, style, onSelect, nearestStationOption = false, value }: SelectInputProps) => {
  const nearestStation = useStationStore((state) => state.nearestStation);

  const [selectedItem, setSelectedItem] = useState<Station | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [stations, setStations] = useState<Array<Station>>([]);

  // Scroll to selected item
  const scrollViewRef = useRef<ScrollView | null>(null);
  const textInputRef = useRef<TextInput | null>(null);

  const fuse = new Fuse(data, {
    keys: ['name'],
    shouldSort: true,
    includeMatches: true,
  });

  const handleTextChange = (text: string) => {
    setSearchString(text);
  };

  useEffect(() => {
    const result = fuse.search(searchString);
    if (searchString === '') {
      setStations(data);
    } else {
      setStations(result.map((sts) => sts.item));
    }
  }, [searchString]);

  useEffect(() => {
    setStations(data);
  }, [data]);

  useEffect(() => {
    if (value) {
      setSelectedItem(value);
      setSearchString(value.name);
    } else {
      setSelectedItem(null);
      setSearchString('');
    }
  }, [value]);


  const closeDropdown = () => {
    setIsListVisible(false);
    Keyboard.dismiss();
    textInputRef.current?.blur();
  };

  const handlePress = () => {
    setIsListVisible(true);
  };

  const handleSelectedOption = (item: Station) => {
    setSelectedItem(item);
    setSearchString(item.name);
    onSelect(item);
    closeDropdown();
  };

  const clearSelection = () => {
    setSearchString('');
    onSelect(null);
  };

  return (
    <OutsidePressHandler style={{ ...style, shadowOpacity: 0 }} onOutsidePress={closeDropdown}>
      <View
        style={{
          position: 'relative',
          width: '100%',
          elevation: 0,
          shadowOpacity: 0,
        }}
      >
        <View
          style={{
            backgroundColor: '#e9e9e9',
            height: 40,
            borderRadius: 8,
            alignItems: 'center',
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            elevation: 0,
            zIndex: 0,
            shadowOpacity: 0,
          }}
        >
          <TextInput placeholder={placeholder} onFocus={handlePress} style={{ flex: 1, height: '100%' }} onChangeText={handleTextChange} value={searchString} ref={textInputRef}></TextInput>
          {searchString.length ? (
            <Pressable onPress={clearSelection}>
              <AntDesign name="close" size={20} color="#999" />
            </Pressable>
          ) : (
            <AntDesign name="down" size={20} color="#999" />
          )}
        </View>
        {isListVisible && (
          <GestureHandlerRootView
            style={{
              position: 'absolute',
              top: 50,
              left: 0,
              backgroundColor: '#fff',
              width: '100%',
              height: 500,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <ScrollView ref={scrollViewRef}>
              {stations.map((item, index) => {
                return (
                  <View key={item.id}>
                    <Pressable
                      style={{ paddingVertical: 10 }}
                      key={item.name}
                      onPress={() => {
                        handleSelectedOption(item);
                      }}
                    >
                      {item.name == selectedItem?.name ? <Text style={{ color: '#00A0D3' }}>{item.name}</Text> : <Text>{item.name}</Text>}
                    </Pressable>
                    {index < data.length - 1 && (
                      <View
                        style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: '#e9e9e9',
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </GestureHandlerRootView>
        )}
      </View>
    </OutsidePressHandler>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: '90%',
    backgroundColor: '#e9e9e9',
    height: 32,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: Fonts.sm,
    lineHeight: LineHeights.sm,
  },
  labelText: {
    fontSize: Fonts.sm,
    lineHeight: LineHeights.sm,
  },
  spanText: {
    fontSize: Fonts.sm,
    lineHeight: LineHeights.sm,
    fontWeight: 'bold',
  },
});
