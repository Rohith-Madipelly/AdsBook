import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Button } from '../../screenComponents/Auth'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../redux/actions/loginAction'


import AsyncStorage from '@react-native-async-storage/async-storage';

 const Profile=()=> {

  const dispatch = useDispatch();

  const LogOutHandle = async() => {
    try{
      await AsyncStorage.removeItem('AdsReel$:' + 'Token');
      
      setTimeout(()=>{
        dispatch(setToken(null));
      },2000)
    }
    catch(e){
      console.log("error",e)
    }

   
    
}

    return (
      <View>
        <Text>Profile</Text>
        <Button title='LogOut' onPress={() => { LogOutHandle() }}>Logout</Button>

      </View>
    )
  
}

export default Profile;

const styles = StyleSheet.create({
});