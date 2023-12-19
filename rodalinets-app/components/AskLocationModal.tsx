import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { ExternalLink } from '@/components/ExternalLink'

type AskLocationModalProps = {
    modalVisible: boolean,
    setModalVisible: (value: boolean) => void,
    onPressAction: () => void
}

export const AskLocationModal = ({modalVisible, setModalVisible, onPressAction}: AskLocationModalProps) => {
  return (
    <View style={{width: '100%', height: '100%', flex: 1, backgroundColor: 'white'}}>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>We need your background location permission to provide real-time travel updates and route tracking, even when the app is not in the foreground.
          {"\n"}
          {"\n"}
          Please note that all information collected is <Text style={{fontWeight: 'bold'}}>anonymous</Text> and solely used for improving your travel experience.</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                onPressAction();
              }}
            >
              <Text style={styles.textStyle}>Understood</Text>
            </Pressable>
            <ExternalLink href="https://rodalinets.upf.edu/" asChild style={[styles.button, styles.buttonOpen]}>
              <Pressable>
                <Text style={[styles.textStyle, {color: Colors.text}]}>More information</Text>
              </Pressable>
            </ExternalLink>
          </View>
        </View>
      </View>
    </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        paddingVertical: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        elevation: 2,
        flex: 1,
    },
    buttonOpen: {
        backgroundColor: Colors.background,
    },
    buttonClose: {
        backgroundColor: Colors.tint,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
    
        textAlign: "center"
    }
})