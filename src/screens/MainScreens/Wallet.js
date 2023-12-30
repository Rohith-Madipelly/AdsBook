import { View, Text,ToastAndroid} from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';

export default function Wallet() {
  const NotificationSender=({Message})=>{
    ToastAndroid.showWithGravityAndOffset(
      Message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,);
  }



  return (
    <View>
      <Text>wallet</Text>
      <View
          style={{
            // ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#999999" />

          <Text 
          style={{fontFamily:"Jost-VariableFont",fontWeight:900,fontSize:62}} 
          onPress={()=>NotificationSender({Message:'<<dvsv>>'})}> dvsv</Text>

          {/* <button >Click Me</button> */}

         
        </View>
    </View>
  )
}

