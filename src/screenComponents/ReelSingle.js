import { View, Text, Dimensions, Touchable, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
// import Video from "react-native-video"
import { Video, ResizeMode } from 'expo-av';
import { ActivityIndicator } from 'react-native';

// import { getDeviceHeight, getDeviceWidth } from "../utils";

import ReelsBtns from "./ReelsBtns";
import ReelDescription from './ReelDescription';



const ReelSingle = ({ item, index, currentIndex }) => {
  const [isBuffering, setIsBuffering] = useState(true);


  useEffect(() => {

    if (currentIndex === index) {
    videoRef.current.replayAsync();

      PlayVideo()
    }
    // else if (currentIndex != index) {
    //   PauseVideo()
    // }
    else {
      PauseVideo()
    }

  }, [currentIndex])



  const PlayVideo = async () => {
    try {
      console.log("play the index video of ", currentIndex)

      if (videoRef.current !== null) {
        videoRef.current.playAsync()
      }
      // else{
      //   return;
      // }
    } catch (error) { console.log("Error in PlayVideo", currentIndex) }
  };

  const PauseVideo = async () => {
    try {
      console.log("Pause the index video of", currentIndex)

      if (videoRef.current !== null) {
        videoRef.current.pauseAsync()
      }
      // else{
      //   return;
      // }
    } catch (error) { console.log("Error in PauseVideo", currentIndex) }
  };

  // const handlePlaybackStatus=(playbackStatus)=>
  // {
  //   if (!playbackStatus.isLoaded || playbackStatus.isBuffering) {
  //     setLoading(true);
  //     return;
  //   } else {
  //     setLoading(false);
  //   }
  // }


  // const windoWidth = getDeviceHeight();
  // const windowHeight =  getDeviceWidth();
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



  // not a complete code look for full buffering data code

  const onPlaybackStatusUpdate = (status) => {
    // videoRef.current.replayAsync();

  // Check if the video has just started playing
    if (status.didJustFinish) {
      // Video finished playing, seek to the beginning
      videoRef.current.replayAsync();
      // console.log("Reel Single Page : 94 >> Video is replaying now again")
      const Amount=item.Price
      console.error("You Have Completed watching this reels.")
      console.error(" Your have earned ",item.Price)
      
    }

    if (status.isLoaded && !status.isBuffering) {
      setIsBuffering(false);
    }

    
  };


  return (
    <View style={{ width: windoWidth, height: windowHeight, position: 'relative' }}>

      <>
     
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
          seNativeControls={false}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
          onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status)}

        />

        <View>
          <ReelDescription description={item.description}/>
          {/* <Text>uasgdfuf</Text> */}
          <ReelsBtns

            // isLiked={item.liked}
            // likes="50"
            // shares="50"
            // comments="50"
            // thumbnailUrl="50"

          isLiked={item.liked}
          likes={item.likes}
          shares={item.shares}
          comments={item.comments}
          UploaderthumbnailUrl="https://ezewin-files.s3.ap-south-1.amazonaws.com/MTU1XzE3MDI0NjU2MTExOThfNjgz.jpeg"
          // index={currentIndex}
          />
        </View>
      
      </>

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