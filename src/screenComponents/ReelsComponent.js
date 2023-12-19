import { View, Text,Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import { videoData } from './Database'

import ReelSingle from './ReelSingle'

const ReelsComponent = () => {



    const [currentIndex, setCurrentIndex] = useState(0);
    const [playVideo, setPlayVideo] = useState(0);


    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index)
        // console.log("Index of play ", index)
    }


    return (
        <SwiperFlatList
            vertical={true}
            data={videoData}
            onChangeIndex={handleChangeIndexValue}
            // onMomentumScrollEnd={()=>{console.error("ipoyindhi ra waste fellow")}}
     
            
            renderItem={({ item, index }) => (
                <ReelSingle item={item} index={index} currentIndex={currentIndex} play={playVideo} />
            )}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item, index) => index}

          loop={true}
        

          pagingEnabled
          decelerationRate={0.9}
        
        />
        // <view>
        //     <Text>Rohith</Text>
        // </view>

    )
}

export default ReelsComponent