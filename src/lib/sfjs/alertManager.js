import { Alert } from 'react-native';

export default class AlertManager extends SFAlertManager {

  static instance = null;

  static get() {
    if (this.instance == null) {
      this.instance = new AlertManager();
    }

    return this.instance;
  }

  async alert({title, text, closeButtonText = "OK", onClose} = {}) {
    return new Promise((resolve, reject) => {
      // On iOS, confirm should go first. On Android, cancel should go first.
      let buttons = [
        {text: closeButtonText, onPress: () => {
          resolve();
          onClose && onClose();
        }},
      ];
      Alert.alert(title, text, buttons, { cancelable: true })
    })
  }

  async confirm({title, text, confirmButtonText = "OK", cancelButtonText = "Cancel", onConfirm, onCancel} = {}) {
    return new Promise((resolve, reject) => {
      // On iOS, confirm should go first. On Android, cancel should go first.
      let buttons = [
        {text: cancelButtonText, onPress: () => {
          reject();
          onCancel && onCancel();
        }},
        {text: confirmButtonText, onPress: () => {
          resolve();
          onConfirm && onConfirm();
        }},
      ];
      Alert.alert(title, text, buttons, { cancelable: true })
    })
  }
}
