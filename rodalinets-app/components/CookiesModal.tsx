import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { ExternalLink } from '@/components/ExternalLink';
import { Fonts } from '@/constants/Fonts';

type AskLocationModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onPressAction: () => void;
};

export const CookiesModal = ({ modalVisible, setModalVisible, onPressAction }: AskLocationModalProps) => {
  return (
    <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'white' }}>
      <Text>{modalVisible ? "dsdas" : "s"} </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {fontWeight: 'bold'}]}>{`Rodalinets necessita el vostre consentiment per utilitzar les vostres dades personals per:`}</Text>
            <Text style={styles.modalText}>
              {`\n\u2022 Publicitat i continguts personalitzats, publicitat i mesura de continguts, investigació d'audiències i desenvolupament de serveis
              \n\u2022 Emmagatzemar i/o accedir a la informació en un dispositiu`}
            </Text>
            <ExternalLink href="https://rodalinets.com/privacy" style={{width: '100%', marginBottom: 20}} >
            <Text style={{textAlign: 'left', width: '100%', color: Colors.tint, fontWeight: 'bold', fontSize: Fonts.base,}}>
              Aprèn més
            </Text>
            </ExternalLink>

            <Text style={[styles.modalText, {fontSize: Fonts.sm}]}>Les teves dades personals es processaran i la informació del teu dispositiu (galetes, identificadors únics i altres dades del dispositiu) es podrà emmagatzemar, accedir-hi i compartir-hi o utilitzat específicament per aquest lloc o aplicació. 
            Alguns proveïdors poden tractar les vostres dades personals sobre la base d'un interès legítim, al qual podeu oposar-vos gestionant les vostres opcions a continuació. Cerqueu un enllaç a la part inferior d'aquesta pàgina o a la nostra política de privadesa on podeu retirar el consentiment.</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onPressAction();
                }}
              >
                <Text style={styles.textStyle}>Entès</Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginHorizontal: 20,

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    width: '100%'
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: Fonts.base,

    textAlign: 'left',
  },
});
