import { Text, StyleSheet, ImageBackground, View, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Button } from '../../screenComponents/Auth'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../redux/actions/loginAction'
import { useNavigation } from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserGetProfileDetails } from '../../utils/API_Calls'
import { OpenStore } from '../../utils/OpenStore';
import onShare from '../../screenComponents/ShareBtn';
import { AppLinkAndroid } from '../../Enviornment';
import { AppLinkIOS } from '../../Enviornment';
const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [UserName, setUserName] = useState("")
  const [StartingLetter, setStartingLetter] = useState("")
  const [profilepic, setProfilepic] = useState(null)
  const [appLink, setAppLink] = useState()
  const dispatch = useDispatch();
  let tokenn = useSelector((state) => state.token);



const PlatformChecker=()=>{
  if (Platform.OS !== 'ios') {
    setAppLink(AppLinkAndroid)
  } else {
    setAppLink(AppLinkIOS)
  }

}



  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) { 
    console.log("Error in token quotes", err)
  }

  useEffect(() => {
    ProfileNameKosam()
    PlatformChecker()
  }, [])

  const ProfileNameKosam = async () => {
    setSpinnerbool(true)
    // console.log(tokenn)
    try {
      const res = await UserGetProfileDetails(tokenn)


      if (res) {
        console.log(">>>", res.data)

        setUserName([res.data.firstname, " ", res.data.lastname])
        setStartingLetter(res.data.firstname.charAt(0))
        var datadsd = res.data.profile_pic
        setProfilepic(datadsd)


        if (datadsd == "") {
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

  const logoutValidation = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?',
      [{ text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'YES', onPress: () => {
          LogOutHandle()
          // navigation.navigate('Decide-navigator')
        }
      }]
    )
  }

  const LogOutHandle = async () => {
    setSpinnerbool(true)
    try {
      await AsyncStorage.removeItem('AdsReel$:' + 'Token');
      setSpinnerbool(false)
      setTimeout(() => {
        dispatch(setToken(null));
      }, 2000)
    }
    catch (e) {
      console.log("error", e)
    }



  }
  const navigation = useNavigation();

  return (
    <View>
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
      <Text style={[styles.Heading_1, { margin: 25, marginHorizontal: 20 }]}>Profile</Text>


      <ScrollView style={[{ marginTop: 10, borderTopRightRadius: 25, borderTopLeftRadius: 25, bottom: 20, backgroundColor: "#FFF" }]}>
        <View style={[{ paddingLeft: 29, paddingTop: 40, paddingRight: 45, }]}>


          <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileProfile") }}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

              <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                <View>
           

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
                </View>

                <View style={{ margin: 5, marginLeft: 14 }}>
                  <Text>{UserName}</Text>
                  <Text>Show profile</Text>
                </View>


              </View>

              <View style={{ marginTop: 10 }}>
                <Image style={{ width: 22, height: 22 }}
                  source={require("../../../assets/utilsImages/right.png")}
                  resizeMode={"contain"} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.Heading_u2}>
            <View>


              <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>Account</Text>

              <View style={{ marginBottom: 10 }}>


                {/* <Pressable onp> */}
                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileProfile") }}>



                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }} >

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/account-circle-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Profile</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>
                {/* </Pressable> */}


              </View>

              {/* Password tab */}
              <View style={{ marginBottom: 10 }}>


                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfilePassword") }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/lock-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Password</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>

              </View>
              {/* Password tab  end*/}

              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileNotifications") }}>


                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/bell-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Notifications</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>

              </View>
            </View>



            <View>
              <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>More</Text>


              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileAbout") }}>

                  {/* About */}
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/alert-circle-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}> About</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>

              {/* Rate & Review tab */}
              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={OpenStore
                  // () => { navigation.navigate("ProfileRateAndReview") }
                  }>


                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/hexagram.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Rate & Review</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>

                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfilePrivacyPolicy") }}>


                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/account-lock-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Privacy Policy</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>

                {/* <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileShareApp") }}> */}
                <TouchableOpacity activeOpacity={0.6} onPress={() => {  onShare(appLink) }}>
                {/* onShare */}

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/share-all-outline.png")} 
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Share App</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>

                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 10 }}>


                <TouchableOpacity activeOpacity={0.6} onPress={() => { navigation.navigate("ProfileHelp") }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>

                    <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

                      <View>
                        <Image style={{ width: 24, height: 24, }}
                          source={require("../../../assets/utilsImages/ProfileLogos/help-circle-outline.png")}
                          resizeMode={"contain"} />
                      </View>

                      <View style={{ marginLeft: 14 }}>
                        <Text style={[styles.Heading_u3, { marginTop: 2 }]}>Help 123</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                      <Image style={{ width: 22, height: 22 }}
                        source={require("../../../assets/utilsImages/right.png")}
                        resizeMode={"contain"} />
                    </View>

                  </View>
                </TouchableOpacity>

              </View>



            </View>
          </View>




        </View>
        <View style={[{ padding: 29, paddingTop: 0, paddingRight: 60, paddingBottom: 100 }]}>
          <Button title='LogOut' onPress={() => { logoutValidation() }}>Logout</Button>
        </View>



      </ScrollView>

    </View>
  )

}

export default Profile;



const styles = StyleSheet.create({
  Heading_1: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  Heading_u2: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  Heading_u3: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },



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
  letter: {
    fontSize: 24,
    color: '#fff', // Change the text color as needed
  },

});