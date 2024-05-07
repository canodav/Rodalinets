import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Fonts, LineHeights } from '@/constants/Fonts';

export const IconPopup = ({ children, text } : {children : any, text: string}) => {
  const [showText, setShowText] = useState(false);

  const handlePress = () => {
    setShowText(!showText);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
        {children}
        {showText && (
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>{text}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    position: 'absolute',
    top: '100%',
    left: '0%',
    width: '500%',
    transform: [{ translateX: -200 }],
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    zIndex: 9999
  },
  popupText: {
    color: Colors.text,
    fontSize: Fonts.sm,
    lineHeight: LineHeights.sm,
  }
});
