import { View, Text,Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { videoData } from './Database'
import ReelSingle from './ReelSingle'

const ReelsComponent = () => {



    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index)
        // console.log("Index of play ", index)
    }


    return (
        <SwiperFlatList
    
            vertical={true}
            data={videoData}
            onChangeIndex={handleChangeIndexValue}
            renderItem={({ item, index }) => (
                <ReelSingle item={item} index={index} currentIndex={currentIndex}  />
            )}
            keyExtractor={(item, index) => index.toString()}
          loop={true}
        
        
        />

    )
}

export default ReelsComponent