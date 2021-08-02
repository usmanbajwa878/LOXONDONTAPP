import React from 'react';
import { Modal, View } from 'react-native';
// Styles
import styles from './ModalView.styles';


const ModalView = (props,{ isVisible, setIsVisible }) => {


  return (
    <View style={styles.container}>
      <Modal animationType="fade" onRequestClose={() => {}} transparent={true} visible={isVisible}>
        <View style={styles.modalBackground}>
          {props.children}
        </View>
      </Modal>
    </View>
  );
};


export default ModalView;
