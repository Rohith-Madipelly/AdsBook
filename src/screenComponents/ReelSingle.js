import { View, Text, Dimensions, Touchable, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
// import Video from "react-native-video"
import { Video, ResizeMode } from 'expo-av';
import { ActivityIndicator } from 'react-native';





const ReelSingle = ({ item, index, currentIndex}) => {
  const [isBuffering, setIsBuffering] = useState(true);


  useEffect(() => {

    if (currentIndex === index ) {
      PlayVideo()
    }
    else if (currentIndex != index) {
      PauseVideo()
    }
  }, [currentIndex])



  const PlayVideo = async () => {
    try {
      console.log("play the index video of ", currentIndex)

      if (videoRef.current !== null) {
        videoRef.current.playAsync()
      }
    } catch (error) { console.log("Error in PlayVideo", currentIndex) }
  };

  const PauseVideo = async () => {
    try {
      console.log("Pause the index video of", currentIndex)

      if (videoRef.current !== null) {
        videoRef.current.pauseAsync()
      }
    } catch (error) { console.log("Error in PauseVideo", currentIndex) }
  };




  const windoWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const videoRef = useRef(null)

  const onBuffer = buffer => {
    setIsBuffering(buffer.isBuffering);
    // console.log("buffring", buffer);
  }
  const onError = onError => {
    console.log("error i am buffering", onError);
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isBuffering) {
      setIsBuffering(false);
    }
  };


  return (
    <View style={{ width: windoWidth, height: windowHeight,position: 'relative' }}>


      <Video
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        repeat={true}
        resizeMode='cover'
        // resizeMode="contain"
        paused={false}
        source={item.video}
        // source={{
        //   uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        // }}
        isLooping
        //  useNativeControls
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status)}

      />
      {isBuffering && (
        <View
          style={{
       
            width: windoWidth, height: windowHeight, position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}


    </View>
  )
}

export default ReelSingle