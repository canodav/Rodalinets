import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { ExternalLink } from '@/components/ExternalLink'

type SpeedModalProps = {
    modalVisible: boolean,
    setModalVisible: (value: boolean) => void,
    onPressAction: () => void
    children?: React.ReactNode
}

export const SpeedModal = ({modalVisible, setModalVisible, onPressAction, children}: SpeedModalProps) => {
  return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      style={{width: 30, height: '100%', flex: 1, backgroundColor: 'white' , position: 'absolute', top: 0, left: 10}}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        {children}
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
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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