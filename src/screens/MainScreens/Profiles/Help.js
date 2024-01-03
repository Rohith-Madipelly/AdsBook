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

  const GetVideos = async () => {
    setSpinnerbool(true)
    try {
      const res = await GetVideosDataAPI(tokenn)
      setvideoData(res.data.data)
      setSpinnerbool(false)
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
      setSpinnerbool(false)
    }
  }

  useEffect(() => {
    GetVideos()
  }, [])

  return (
    <View>
      <Text>Help</Text>
      {/* <Text>{videoData}</Text> */}
    </View>
  )
}

export default Help