import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, Dimensions,
  ImageSourcePropType,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { typographyStyles } from "../constants";
import { formatNumber } from "../utils";
import ShareExample from "./ShareBtn";
import onShare from "./ShareBtn";

const windoWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


const ReelsBtns = ({

  isLiked,
  likes,
  shares,
  comments,
  UploaderthumbnailUrl,
  index,
  dateVideorewardedAPI
}) => {
    const [liked, setLiked] = useState(isLiked);
  // setLiked(isLiked)

const LikesFuncationly=()=>{
  console.log("Likede ededed ")
  
}



  return (
    <View style={styles.container}>


      {
        console.log(likes)
      }

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {setLiked((prevState) => !prevState),LikesFuncationly()}}
      >
        {liked ? (
          <Entypo name="heart" size={35} color="red" />
        ) : (
          <Entypo name="heart-outlined" size={35} color="white" />
        )}

        <Text style={[styles.text, typographyStyles.md]}>

          {liked ? formatNumber(likes + 1) : formatNumber(likes)}
          {/* {likes} */}
          {/* {liked ? formatNumber((likes ?? 0) + 1) : formatNumber(likes ?? 0)} */}

        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        {/* <Feather name="message-circle" size={35} color="white" /> */}
        {/* <Entypo name="thumbs-up" size={35} color="white" /> */}

        {liked ? (
          <FontAwesome name="thumbs-down" size={35} color="white" />
        ) : (
          <FontAwesome name="thumbs-down" size={35} color="lightblue" />
        )}
        <Text style={[styles.text, typographyStyles.md]}>
          DisLike
        </Text>
      </TouchableOpacity>




      <TouchableOpacity style={styles.btn} onPress={()=>{onShare(`This is the refern of video ${dateVideorewardedAPI}`)}}>
        <Ionicons name="paper-plane-outline" size={35} color={"white"} style={styles.btnbtn} />
        <Text style={[styles.text, typographyStyles.md]}>
          {/* {formatNumber(shares)}  */}
          Share
      
          {/* shares of {index} */}
        </Text>

      </TouchableOpacity>


      <TouchableOpacity style={styles.btn}
        onPress={() => { console.error("Downloaded") }}

      >

        <FontAwesome name="download" size={35} color={"white"} style={styles.btnbtn} />
        <Text style={[styles.text, typographyStyles.md]}>
          {/* {formatNumber(shares)}  */}
          Save
          {/* shares of {index} */}
        </Text>
      </TouchableOpacity>



      {/* <TouchableOpacity style={styles.btn}>
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={25}
        color="white"
      />
    </TouchableOpacity> */}

      <TouchableOpacity style={styles.btn}>
        {/* <Image source={{ uri: UploaderthumbnailUrl }} style={styles.image} /> */}

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   position: "absolute",
  //   bottom: 25,
  //   right: 7,
  //   width: 65,
  //   zIndex: 20,
  // },
  container: {
    position: 'absolute',
    // bottom: -330,
    bottom: -(windowHeight - 15),
    // top:(windowHeight-(windowHeight/3.10)),


    left: 7,
    width: 65,
    zIndex: 20,
  },
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
});

export default ReelsBtns;