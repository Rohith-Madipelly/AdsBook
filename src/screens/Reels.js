import { Dimensions, Text,StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import Feather from "react-native-vector-icons/Feather"
import ReelsComponent from '../screenComponents/ReelsComponent'

const Reels = () => {
    const windoWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    return (
        <View style={{
            marginTop:0,
            width: windoWidth,
            height: windowHeight,
            // backgroundColor: 'black'
        }}>
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

            <ReelsComponent />
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