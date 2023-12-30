import { Dimensions, Text,StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
// import Feather from "react-native-vector-icons/Feather"
import ReelsComponent from '../../screenComponents/ReelsComponent'

import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


const Reels = () => {
    const windoWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height


    const [SetReelPageActive, setSetReelPageActive] = React.useState(true);

    // Use useFocusEffect to set SetReelPageActive when the screen is focused
    useFocusEffect(
      React.useCallback(() => {
        setSetReelPageActive(true);
  
        // Cleanup function when the component loses focus
        return () => {
          setSetReelPageActive(false);
          // Any cleanup logic if needed
        };
      }, [])
    );

    console.log("smhvdajs",SetReelPageActive)
    return (
  
        <View style={{
            marginTop:0,
            width: windoWidth,
            height: windowHeight,
            // backgroundColor: 'black'
        }}>
      <StatusBar style="auto" />

            {/* Reels Header */}
            
            <View style={{
                position: 'absolute',
                top: 30,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 1,
                padding: 10,
            }}>
                <Text style={{
                    fontSize: 20, fontWeight: 'bold',
                    // color: 'white' 
                }}>Reels</Text>
                {/* <Feather name="camera" style={{
                    fontSize: 25,
                    // color: 'white'
                }} /> */}
            </View>

            <ReelsComponent isReelPage={SetReelPageActive}/>

            {/* <Text>vsd</Text> */}
        </View>
       
    )
}

export default Reels;

const styles = StyleSheet.create({
    OptionsContainer: {
        position: "absolute",
        right: 10,
        bottom: 70,
        zIndex: 100,
      },

})