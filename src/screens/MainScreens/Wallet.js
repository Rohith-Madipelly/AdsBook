import { View, Text, ToastAndroid, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import React from 'react'




export default function Wallet() {













  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>


    
        <View style={{
          marginTop: 30,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'white',

        }}>



          <View style={{ width: 320, height: 120, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.Heading_1HH}>Available Balance</Text>
            </View>

            <View style={{ backgroundColor: 'rgba(152, 58, 150, 1)', width: 78, height: 31, borderRadius: 50, justifyContent: 'center' }}>

              <Text style={[styles.Heading_2HH, { paddingLeft: 10, color: 'white' }]}>₹ 15.00</Text>

            </View>
          </View>
        </View>


        <View style={{ marginTop: 64, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Pressable onPress={() => { console.log("Withdraw") }} style={{ width: 140, height: 109, backgroundColor: 'white', marginRight: 15, borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../../assets/utilsImages/Withdraw.png')}
                />
                <Text style={[styles.Heading_1HH, { marginTop: 5 }]}>Withdraw</Text>
              </View>
            </TouchableOpacity>
          </Pressable>

          <Pressable onPress={() => { console.log("Transfer") }} style={{ width: 140, height: 109, backgroundColor: 'white', marginLeft: 15, borderRadius: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>

              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../../assets/utilsImages/Transfer.png')}
                />
                <Text style={[styles.Heading_1HH, { marginTop: 5 }]}>Transfer</Text>
              </View>
            </TouchableOpacity>
          </Pressable>


        </View>








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
  }, Heading_2HH: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  }
});