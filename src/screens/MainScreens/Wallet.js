import { View, Text, ToastAndroid,StyleSheet,TouchableOpacity,Linking } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';



export default function Wallet() {



  const openPaytm = () => {
    // Replace 'your_paytm_url' with the actual URL or deep link to the Paytm app
    const paytmUrl = 'https://paytm.com/';

    // Use Linking to open the URL
    Linking.openURL(paytmUrl)
      .catch((err) => console.error('An error occurred', err));
  };






  const NotificationSender = ({ Message }) => {
    ToastAndroid.showWithGravityAndOffset(
      Message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,);
  }



  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>


        <LinearGradient
          colors={['#F28E80', '#F28E80']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            marginTop: 30,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >

          <View style={{ width: 320, height: 120, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
            <View>
              <Text style={styles.Heading_1HH}>Available Balance</Text>
            </View>

            <View style={{backgroundColor:'white',width:100,height:100,borderRadius:50,justifyContent:'center'}}>
  
              <Text style={[styles.Heading_2HH,{padding:15 }]}>₹ 15.00</Text>
              
            </View>
          </View>
        </LinearGradient>


        <TouchableOpacity activeOpacity={0.6} onPress={() => {openPaytm()}}>
        <View style={{marginTop:50}}>
          <Text style={[styles.Heading_2HH,{color:'blue'}]}>
          Withdrawal Via PAYTM
          </Text>
        </View>
        </TouchableOpacity>





      </View>
    </View >
  )
}





const styles = StyleSheet.create({
  Heading_1HH: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
  },  Heading_2HH: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  }
});