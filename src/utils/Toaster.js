import { View, Text,ToastAndroid} from 'react-native'

export const ToasterSender=({Message})=>{
    ToastAndroid.showWithGravityAndOffset(
      Message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,);
  }
