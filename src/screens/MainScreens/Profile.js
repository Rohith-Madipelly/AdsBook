import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import React, { Component } from 'react'
import { Button } from '../../screenComponents/Auth'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../redux/actions/loginAction'

import Ionic from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

  const dispatch = useDispatch();

  const LogOutHandle = async () => {
    try {
      await AsyncStorage.removeItem('AdsReel$:' + 'Token');

      setTimeout(() => {
        dispatch(setToken(null));
      }, 2000)
    }
    catch (e) {
      console.log("error", e)
    }



  }


  return (
    <View>
      <Text style={[styles.Heading_1, { margin: 25, marginHorizontal: 20 }]}>Profile</Text>


      <ScrollView style={[{ marginTop: 10, borderTopRightRadius: 25, borderTopLeftRadius: 25, bottom: 20, backgroundColor: "#FFF" }]}>
        <View style={[{ paddingLeft: 29, paddingTop: 40, paddingRight: 45, }]}>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginBottom:15 }}>
           
            <View style={{ display: '', flexDirection: 'row', justifyContent: 'flex-start' }}>

            <View>
            <Image style={{ width: 50, height: 50 }}
                source={require("../../../assets/utilsImages/profile.png")}
                resizeMode={"contain"} />

            </View>

              <View style={{margin:5,marginLeft:14}}>
              <Text>Rohith Madipelly</Text>
                <Text>Show profile</Text>
              </View>
                
              
            </View>

            <View style={{marginTop:10}}>
              <Image style={{ width: 22, height: 22 }}
                source={require("../../../assets/utilsImages/right.png")}
                resizeMode={"contain"} />
            </View>
          </View>

          <View style={styles.Heading_u2}>
            <View>
              <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>Account</Text>

              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Profile</Text>

              </View>

              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Password</Text>

              </View>
              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Notifications</Text>

              </View>


            </View>



            <View>
              <Text style={[styles.Heading_u2, { marginBottom: 28 }]}>More</Text>

              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>About</Text>

              </View>
              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Rate & Review</Text>

              </View>

              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Privacy Policy</Text>

              </View>

              <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                <View>
                  <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Share App</Text>
                </View>
                <View>
                  <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Share App</Text>
                </View>
              </View>


              <View>
                <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Help</Text>

              </View>
              {/* <View>
            <Text style={[styles.Heading_u3, { marginBottom: 28 }]}>Notifications</Text>

            </View> */}


            </View>
          </View>




        </View>
        <View style={[{ padding: 29, paddingTop: 0, paddingRight: 60, paddingBottom: 100 }]}>
          <Button title='LogOut' onPress={() => { LogOutHandle() }}>Logout</Button>
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
});