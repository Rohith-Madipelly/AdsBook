import { View, Text, Linking, Platform } from 'react-native'
import React, { useEffect } from 'react'

const RateReview = () => {
  const GOOGLE_PACKAGE_NAME = 'com.myntra.android';
  const APPLE_STORE_ID = 'id907394059';
  // const MYNTRA_STORE_URL = 'myntra://';

  const openStore = () => {
    if (Platform.OS != 'ios') {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
        alert('Please check for Google Play Store'),);
    }
    else {
      Linking.openURL(
        // `items://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
        'https://apps.apple.com/in/app/myntra-fashion-shopping-app/id907394059'
      ).catch(err => alert('Please check for the App Store'))
    }


  };


  useEffect(() => {
    openStore()
  }, [])

  return (
    <View>
      <Text>Rate&Review</Text>
    </View>
  )
}

export default RateReview