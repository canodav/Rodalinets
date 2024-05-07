import { StyleSheet, Text, View, TouchableOpacity, Pressable, Touchable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Notify = () => {

  const {id} = useLocalSearchParams();


  const fetchTrainIncidence = async () => {
    const userId = await AsyncStorage.getItem('userId', (uuid) => {
      
    });
    const response = await fetch(`https://rodalinets.upf.edu/train/${id}/reportIncidence?userId=${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const {reports} = await response.json();
    const incidence = incidences.find(inc => inc.name == reports[0].incidenceType)
    if(incidence) {
      setSelectedIncidence(incidence)
    }
  }

  useEffect(() => {
    const data = fetchTrainIncidence();
  },[])

  const [selectedIncidence, setSelectedIncidence] = useState<{ name: string; text: string }| null>(null);
  const [text, setText] = useState<string| null>("");

  const incidences = [
    { name: 'Delay', text: 'Retràs' },
    { name: 'Breakdown', text: 'Avería' },
    { name: 'Missed', text: 'El tren no ha passat' },
  ];

  const toggleIncidences = (incidence: { name: string; text: string }) => {
    if (selectedIncidence && selectedIncidence.name === incidence.name) {
      setSelectedIncidence(null); // Deselect if the same incidence is clicked again
    } else {
      setSelectedIncidence(incidence);
    }
  };

  const handleSubmit = async () => {
    if(!selectedIncidence){
      return;
    }
    const userId = await AsyncStorage.getItem('userId', (uuid) => {
    });

    const response = await fetch(`https://rodalinets.upf.edu/train/${id}/reportIncidence?incidenceType=${selectedIncidence.name}&userId=${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json()

    if(response.status == 200){
      setText("Incidència compartida")
    }

  };

  return (
    <View style={styles.container}>
    <View style={{ marginBottom: 20, gap: 14 }}>
      {incidences.map((incidence, index) => (
        <TouchableOpacity key={index} style={styles.checkboxContainer} onPress={() => toggleIncidences(incidence)}>
          <View style={styles.checkbox}>
            {selectedIncidence && selectedIncidence.name === incidence.name && <View style={styles.checkedCheckbox} />}
          </View>
          <Text style={styles.label}>{incidence.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View>
      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.buttonOpen]}>
        <Text style={[styles.textStyle]}>Comparteix incidència</Text>
      </TouchableOpacity>
      <Text style={{color : Colors.text, marginTop: 10}}>{text}</Text>
    </View>
  </View>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingTop: 14,
    marginBottom: 0,
    paddingHorizontal: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: Colors.background,
    height: '100%',
    gap: 10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checkbox: {
    marginLeft: 8,
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.tint,
  },
  checkedCheckbox: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.tint,
  },
  label: {
    fontSize: Fonts.base,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.tint,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
