import { View, Text, ToastAndroid, StyleSheet, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GetWalletAmountAPI } from '../../utils/API_Calls';




export default function Wallet({route}) {
  const [WalletAmount, setWalletAmount] = useState(0)
  let tokenn = useSelector((state) => state.token);
  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes", err)
  }


  const WithDraw = () => {
    console.log("WithDraw Function and api here")
  }

  const Transfer = () => {
    console.log("WithDraw Transfer and api here")
    WalletAmountFunction()

  }

  const WalletAmountFunction = async () => {
    try {
      const res = await GetWalletAmountAPI(tokenn)
      console.log("scas",res.data)
      setWalletAmount(res.data.Amount)
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else {
          console.log("An error occurred response.")
        }
      }
      else if (error.request) {
        console.log("No Response Received From the Server.")
      }
      else {
        console.log("Error in Setting up the Request.")
      }
    }
    finally {

    }

  }



  useEffect(() => {
    console.log("GetWalletAmountAPI")

    WalletAmountFunction()

  },[])
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
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


              <View style={styles.outerCircle}>
                <ImageBackground
                  style={styles.innerCircle}
                  // source={profilepic}
                  // source={{
                  //   uri: profilepic,
                  // }}

                  source={require("../../../assets/utilsImages/profile.png")}

                  resizeMode="cover"
                >

                </ImageBackground>
              </View>

              <View style={{ margin: 5, marginLeft: 8 }}>
                <Text style={[styles.Heading_0HH]}>Rohith Madipely</Text>
                <Text style={[styles.Heading_0HH, { color: 'rgba(0, 0, 0, 0.72)' }]}>email</Text>
              </View>


              {/* <Text style={styles.Heading_1HH}>Available Balance</Text>
              <Text style={styles.Heading_1HH}>Available Balance</Text> */}
            </View>

            <View style={{
              backgroundColor: 'rgba(152, 58, 150, 1)',
              // width: 78,
              height: 31, borderRadius: 50, justifyContent: 'center'
            }}>

              <Text style={[styles.Heading_2HH, { paddingHorizontal: 5, color: 'white' }]}>₹ {WalletAmount} .00 </Text>

            </View>
          </View>
        </View>


        <View style={[styles.BtnContainer]}>
          <Pressable onPress={() => { WithDraw() }} style={[styles.WalletBtn, { marginRight: 15, }]}>
            <TouchableOpacity>
              <View style={[styles.WalletBtnCenter]}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../../assets/utilsImages/Withdraw.png')}
                />
                <Text style={[styles.Heading_1HH, { marginTop: 5 }]}>Withdraw</Text>
              </View>
            </TouchableOpacity>
          </Pressable>

          <Pressable onPress={() => { Transfer() }} style={[styles.WalletBtn, { marginLeft: 15, }]}>
            <TouchableOpacity>
              <View style={[styles.WalletBtnCenter]}>
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
  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 75,
    overflow: 'hidden', // Ensure inner content doesn't overflow
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnContainer: {
    marginTop: 64, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'
  },
  WalletBtnCenter: {
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  WalletBtn: {
    width: 140,
    height: 109,
    backgroundColor: 'white',

    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Heading_0HH: {
    color: '#000',
    // fontFamily: 'Jost',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
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