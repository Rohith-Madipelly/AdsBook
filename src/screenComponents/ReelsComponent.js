import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

// import { videoData } from './Database'

import ReelSingle from './ReelSingle'
import { useSelector } from 'react-redux'
import { GetVideosDataAPI } from '../utils/API_Calls'

const ReelsComponent = ({ isReelPage }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [playVideo, setPlayVideo] = useState(0);


    const [videoData, setvideoData] = useState([])
    const [spinnerBool, setSpinnerbool] = useState(false)

    let tokenn = useSelector((state) => state.token);

    try {
        if (tokenn != null) {
            tokenn=  tokenn.replaceAll('"', '');
        }
    }
    catch (err) {
        console.log("Error in token quotes", err)
    }

    const GetVideos = async () => {
        setSpinnerbool(true)
        try {
            const res = await GetVideosDataAPI(tokenn)
            var Data=res.data.data
            setvideoData((prevItems) => [...prevItems, ...Data]);
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

    // console.log("Data From page", videoData)
    useEffect(() => {
        GetVideos()
    }, [])

    const handleEndReached = () => {
        GetVideos()
      };


    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index)
    }

    return (
        <SwiperFlatList
            vertical={true}
            data={videoData}
            onChangeIndex={handleChangeIndexValue}
            // onMomentumScrollEnd={handleEndReached()}
            onEndReached={() =>{handleEndReached()}}
            onEndReachedThreshold={0.1}
            // loadMinimal
            loadMinimalSize={5}
            renderItem={({ item, index }) => (
                <ReelSingle item={item} index={index} currentIndex={currentIndex} play={isReelPage} tokenn={tokenn}/>
            )}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item, index) => index}
            loop={true}
            pagingEnabled
            decelerationRate={0.1}
        />


    )
}

export default ReelsComponent