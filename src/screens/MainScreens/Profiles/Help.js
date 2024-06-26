import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetVideosDataAPI } from '../../../utils/API_Calls'
import { useSelector } from 'react-redux'


const Help = () => {
  const [videoData, setvideoData] = useState([])
  const [spinnerBool, setSpinnerbool] = useState(false)

  let tokenn =  useSelector((state) => state.token);

  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) {
    console.log("Error in token quotes",err)
  }




  return (
    <View>
      <Text>Help</Text>
    </View>
  )
}

export default Help