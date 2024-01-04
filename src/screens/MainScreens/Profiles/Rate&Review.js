import { View, Text, Linking, Platform } from 'react-native'
import React, { useEffect } from 'react'

const RateReview = () => {
  const GOOGLE_PACKAGE_NAME = 'com.myntra.android';
  const APPLE_STORE_ID = '1116625187';
  const MYNTRA_STORE_URL = 'myntra://';

  const openStore = () => {



    const mytraDeepLink = 'instagram://';

  Linking.canOpenURL(mytraDeepLink).then((supported) => {
    if (supported) {
      return Linking.openURL(mytraDeepLink);
    } else {
      console.warn("Couldn't open the Mytra app. Make sure it's installed.");
    }
  }).catch((err) => console.error('An error occurred', err));



    // if (Platform.OS != 'ios') {
    //   Linking.openURL(GOOGLE_PACKAGE_NAME).catch(err=>alert("error in linking"))
    // } else {
    //   Linking.openURL(
    //     `itms://itunes.apple.com/in/app/myntra/${APPLE_STORE_ID}`,
    //   ).catch(err => alert('Please check for the App Store ID'));
    // }
  };


  useEffect(()=>{
    openStore()
  },[])

  return (
    <View>
      <Text>Rate&Review</Text>
    </View>
  )
}

export default RateReview