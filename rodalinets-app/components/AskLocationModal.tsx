import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { ExternalLink } from '@/components/ExternalLink';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';

type AskLocationModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onPressAction: () => void;
};

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const AskLocationModal = ({ modalVisible, setModalVisible, onPressAction }: AskLocationModalProps) => {
  return (
    <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'white' }}>
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
            <Image source={require('../assets/images/pin.png')} style={styles.image} contentFit="contain" />
            <View>
              <Text style={{ fontSize: Fonts.base, marginBottom: 20, textAlign: 'justify'}}>RODALINETS necessita el vostre permís d'<Text style={{fontWeight: 'bold'}}>ubicació en segon pla</Text> per proporcionar actualitzacions de viatges en temps real i seguiment de rutes, fins i tot quan l'aplicació no es troba en primer pla. La ubicació només s’utilitzarà quan estigui en marxa un viatge. </Text>
              <Text style={{ fontSize: Fonts.base, textAlign: 'justify'}}>
              Tingueu en compte que tota la informació recopilada és totalment <Text style={{fontWeight: 'bold'}}>anònima</Text> s'utilitza únicament per millorar la vostra experiència de viatge.</Text>
            </View>
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
    padding: 30,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 50,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
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
  image: {
    width: '100%',
    height: 100,
  },
});
