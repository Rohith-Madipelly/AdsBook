import { View, Text, ToastAndroid, StyleSheet, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GetWalletAmountAPI, UserGetProfileDetails } from '../../utils/API_Calls';




export default function Wallet({route}) {
  const [WalletAmount, setWalletAmount] = useState(0)
  const [profilepic, setProfilepic] = useState(null)
  const [StartingLetter, setStartingLetter] = useState("")


  const [UserName, setUserName] = useState("")
  const [UserEmail, setUserEmail] = useState("")

  const [appLink, setAppLink] = useState()

  const [spinnerBool, setSpinnerbool] = useState(false)
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


  const ProfileNameKosam = async () => {
    setSpinnerbool(true)
    // console.log(tokenn)
    try {
      const res = await UserGetProfileDetails(tokenn)


      if (res) {
        console.log(">>>", res.data)

        setUserName([res.data.firstname, " ", res.data.lastname])
        setUserEmail(res.data.email)
        setStartingLetter(res.data.firstname.charAt(0))
        var datadsd = res.data.profile_pic
        setProfilepic(datadsd)


        if (datadsd == "") {
          console.error("sdf")
        }
        else {
          setProfilepic(`https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${datadsd}`)

        }
        console.log(profilepic)
        setSpinnerbool(false)
      }
      else {
 
      }
    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
      }, 1000);
    }
    finally {
      setSpinnerbool(false)

    }
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
 ProfileNameKosam()
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


            {profilepic?<View style={styles.outerCircle}>
                    <ImageBackground
                      style={styles.innerCircle}
                      // source={profilepic}
                      source={{
                        uri: profilepic,
                      }}
                      resizeMode="cover"
                    >

                    </ImageBackground>
                  </View>:<View style={styles.outerCircle}>
                    <ImageBackground
                      style={styles.innerCircle}
                      source={require("../../../assets/utilsImages/profile.png")}
                      resizeMode="cover"
                    >
                      <Text style={styles.letter}>{StartingLetter.toLocaleUpperCase()}</Text>
                    </ImageBackground>
                  </View>}

              <View style={{ margin: 5, marginLeft: 15 }}>
                <Text style={[styles.Heading_0HH]}>{UserName}</Text>
                <Text style={[styles.Heading_0HH, { color: 'rgba(0, 0, 0, 0.72)' }]}>{UserEmail } </Text>
                {/* .slice(0, 20) */}
              </View>


              {/* <Text style={styles.Heading_1HH}>Available Balance</Text>
              <Text style={styles.Heading_1HH}>Available Balance</Text> */}
            </View>

            {/* <View style={{
              backgroundColor: 'rgba(152, 58, 150, 1)',
              // width: 78,
              height: 31, borderRadius: 50, justifyContent: 'center'
            }}>

              <Text style={[styles.Heading_2HH, { paddingHorizontal: 5, color: 'white' }]}>₹ {WalletAmount} .00 </Text>

            </View> */}
          </View>
        </View>


        <View style={[styles.BtnContainer]}>
          <View onPress={() => { WithDraw() }} style={[styles.WalletAmountBtn,]}>
            {/* <TouchableOpacity> */}
              {/* <View style={[styles.WalletBtnCenter]}> */}
                {/* <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../../assets/utilsImages/Withdraw.png')}
                /> */}
                <Text style={[styles.Heading_1HH, { marginBottom: 10}]}>Rewards</Text>
              {/* </View> */}

              <View style={{
              backgroundColor: 'black',
              width: 250,
              height: 80, borderRadius: 5, justifyContent: 'center'
            }}>

              <Text style={[styles.Heading_2HH, {textAlign:'center', color: 'white' }]}>₹ {WalletAmount}.00 Points</Text>

            </View>
            {/* </TouchableOpacity> */}
          </View>
        </View>

        <View style={[styles.BtnContainer]}>
          <Pressable onPress={() => { WithDraw() }} style={[styles.WalletBtn,styles.shadowProp, { marginRight: 15, }]}>
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
    width: 60,
    height: 60,
    borderRadius: 75,
    overflow: 'hidden', // Ensure inner content doesn't overflow
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnContainer: {
    marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
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
  shadowProp: {  
    shadowOffset: {width: 50, height: 20},  
    shadowColor: 'red',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
  },  
  WalletAmountBtn: {
    width: '90%',
    height: 180,
    backgroundColor: 'white',

    borderRadius: 25,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20
 
  },
  Heading_0HH: {
    color: '#000',
    // fontFamily: 'Jost',
    fontSize: 15,
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
  },  letter: {
    fontSize: 24,
    color: '#fff', // Change the text color as needed
  },
});