import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import constants from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalComponet = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{alignSelf:'flex-end',backgroundColor:constants.Colors.color_menuTabHigh,padding:20,marginTop:-36,marginRight:-15,borderBottomLeftRadius:36}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
    
                <Icon name="close" color={constants.Colors.color_WHITE} size={30}/>
                
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalText}>Term and Conditions</Text>
                <Text style={{fontFamily:constants.fonts.Cardo_Regular,fontSize:16}}>
                    Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with 'real' content. This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.
                    The usefulness of nonsensical content
                    Dummy text is also used to demonstrate the appearance of different typefaces and layouts, and in general the content of dummy text is nonsensical. Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts. If the distribution of letters and 'words' is random, the reader will not be distracted from making a neutral judgement on the visual impact and readability of the typefaces (typography), or the distribution of text on the page (layout or type area). For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces. Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.
                </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={{fontSize:18,fontFamily:constants.fonts.Cardo_Regular,color:constants.Colors.color_heading}}>{props.titleText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewContainer:{
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    marginTop: 80,
    marginBottom: 80,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: constants.Colors.color_WHITE,
    borderRadius: 0,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontFamily:constants.fonts.Cardo_Bold,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontFamily:constants.fonts.Cardo_Bold,
    fontSize:16
  }
});

export default ModalComponet;
