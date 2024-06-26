import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, Dimensions,
  ImageSourcePropType,
  TextInput,
  Button,
} from "react-native";

import { BottomSheet } from 'react-native-sheet';

import {
  Entypo,
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,FontAwesome ,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { typographyStyles } from "../constants";
import { formatNumber } from "../utils";
import ShareExample from "./ShareBtn";
import onShare from "./ShareBtn";
import { DownloadSimple } from "@phosphor-icons/react";
// import Download from "../utils/Download";

import { PostRepostAPI, PutLikeAPI } from "../utils/API_Calls";
import { useSelector } from "react-redux";
import { ToasterSender } from "../utils/Toaster";

const windoWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


const ReelsBtns = ({

  isLiked,
  likes,
  shares,
  comments,
  UploaderthumbnailUrl,
  index,
  dateVideoId, urlLink
}) => {
  const [liked, setLiked] = useState(isLiked);
  // setLiked(isLiked)
  const [spinnerBool, setSpinnerbool] = useState(false)
  const bottomSheet = useRef(null);
  const bottomSheet2 = useRef(null);
  let tokenn = useSelector((state) => state.token);
  const [ReportMessage, setReportMessage] = useState("")
  try {
    if (tokenn != null) {
      tokenn = tokenn.replaceAll('"', '');
    }
  }
  catch (err) { 
    console.log("Error in token quotes", err)
  }


  const ReportBtn = async () => {

    setSpinnerbool(true)
    try {
      const ReportData = {
        videoId: dateVideoId,
        complaint: ReportMessage,
      };

      const res = await PostRepostAPI(ReportData, tokenn)
      console.log(res)
      ToasterSender({ Message: `${res.data.message}` })
      setReportMessage("")
    }
    catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 500) {
          console.log("Internal Server Error", error.message)
        }
        else if (error.response.status === 404) {
          console.log("c ", error.message)
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




const LikesFuncationly = async() => {
    
  setSpinnerbool(true)
  try {
  

    const res = await PutLikeAPI(dateVideoId, tokenn)
    ToasterSender({ Message: `${res.data.message}` })

    
  }
  catch (error) {
    console.log(error)
    if (error.response) {
      if (error.response.status === 400) {
        console.log("Error With 400.")
      }
      else if (error.response.status === 500) {
        console.log("Internal Server Error", error.message)
      }
      else if (error.response.status === 404) {
        console.log("c ", error.message)
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






const handleDownload = async () => {
  console.log(urlLink)

};

const option = async () => {
  bottomSheet.current.show()

  // onPress={() => bottomSheet.current.show()}

}








return (
  <View style={[styles.container, { marginBottom: 10 }]}>

    <BottomSheet height={130} ref={bottomSheet}>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => { bottomSheet2.current.show() }} style={{ backgroundColor: "pink", padding: 15, marginTop: 10, borderRadius: 10, }}>
          <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 20 }}>
            <MaterialIcons name="report" size={24} color="black" />
            <Text style={{
              paddingTop: 2, paddingLeft: 10,
              // fontFamily: 'open-sans' 
            }}>Report</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => { handleDownload() }} style={{ backgroundColor: "pink", padding: 15, marginTop: 10, borderRadius: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 25 }}>
            {/* <MaterialIcons name="save" size={24} color="black" /> */}
            <AntDesign name="download" size={24} color={"black"} style={styles.btnbtn} />

            <Text style={{
              paddingTop: 2, paddingLeft: 10,
              // fontFamily: 'open-sans' 
            }}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BottomSheet>

    <BottomSheet height={250} ref={bottomSheet2}>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginVertical: 20, fontWeight: 700, fontSize: 20 }}>Help us understand the problem</Text>

        <View style={styles.inputContainer}>
          <View
            style={[
              styles.input,
              { borderColor: "#ccc", height: 100 },
            ]}
          >
            <TextInput
              placeholderTextColor={"#444"}
              placeholder="Report Message"
              onChangeText={(e) => { setReportMessage(e) }}
              value={ReportMessage}
              multiline={true}
              numberOfLines={4}
              keyboardType="default"
              autoCapitalize="none"

              style={{ color: "black" }}
            />
          </View></View>


      </View>
      <Button title='Send Report' onPress={ReportBtn}></Button>
    </BottomSheet>
    {
      console.log(likes)
    }

    <TouchableOpacity
      style={styles.btn}
      onPress={() => { setLiked((prevState) => !prevState), LikesFuncationly() }}
    >
      {liked ? (
        <Entypo name="heart" size={30} color="red" />
      ) : (
        <Entypo name="heart-outlined" size={30} color="white" />
      )}

      <Text style={[styles.text, typographyStyles.md]}>

        {liked ? formatNumber(likes + 1) : formatNumber(likes)}
        {/* {likes} */}
        {/* {liked ? formatNumber((likes ?? 0) + 1) : formatNumber(likes ?? 0)} */}




      </Text>
    </TouchableOpacity>

    {/* <TouchableOpacity style={styles.btn}> */}
    {/* <Feather name="message-circle" size={35} color="white" /> */}
    {/* <Entypo name="thumbs-up" size={35} color="white" /> */}

    {/* {liked ? (
          <FontAwesome name="thumbs-down" size={30} color="white" />
        ) : (
          <FontAwesome name="thumbs-down" size={30} color="lightblue" />
        )}
        <Text style={[styles.text, typographyStyles.md]}>
          DisLike 
        </Text>
      </TouchableOpacity> */}




    <TouchableOpacity style={styles.btn} onPress={() => { onShare(`This is the refern of video ${dateVideoId}`) }}>
      <Ionicons name="paper-plane-outline" size={30} color={"white"} style={styles.btnbtn} />
      <Text style={[styles.text, typographyStyles.md]}>
        {/* {formatNumber(shares)}  */}
        Share

        {/* shares of {index} */}
      </Text>

    </TouchableOpacity>


    {/* <TouchableOpacity style={styles.btn} onPress={() => { Download()}}>*/}

    {/* <FontAwesome name="download" size={30} color={"white"} style={styles.btnbtn} /> */}
    {/* <AntDesign name="download" size={30} color={"white"} style={styles.btnbtn} /> */}
    {/* name="download" */}
    {/* <DownloadSimple size={32} /> */}
    {/* <Text style={[styles.text, typographyStyles.md]}> */}
    {/* {formatNumber(shares)}  */}
    {/* Save */}
    {/* shares of {index} */}
    {/* </Text>
      </TouchableOpacity> */} 



    <TouchableOpacity style={styles.btn} onPress={() => { option() }}>
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={25}
        color="white"
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.btn}>
      {/* <Image source={{ uri: UploaderthumbnailUrl }} style={styles.image} /> */}

    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
 
  container: {
    position: 'absolute',
    // bottom: -330,
    // bottom: -(windowHeight - 15),
    // top:(windowHeight-(windowHeight/3.10)),

    bottom: Platform.select({
      ios: -(windowHeight - 25), // width for iOS
      android:-(windowHeight - 15), // width for Android
      // web: 300, // width for Web
      // default: 100, // default width
    }),
    left: 7,
    width: 65,
    zIndex: 20,
  },

  
 // container: {
  //   position: "absolute",
  //   bottom: 25,
  //   right: 7,
  //   width: 65,
  //   zIndex: 20,
  // },
  btn: {
    alignItems: "center",
    marginBottom: 10,
  },
  ReelsBtn: {
    size: 10,
    color: 'white',
  },
  text: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
    fontSize: 14,
  },
  image: {
    width: 30,
    height: 30,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 6,
    resizeMode: "cover",
  },


  inputContainer: {
    marginBottom: 12,

  },

  input: {
    width: 300,
    // backgroundColor: "#121212",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,

    borderRadius: 6,
    marginBottom: 6,
    color: "white",
    height: 45,


  },
});

export default ReelsBtns;