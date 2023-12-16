import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { typographyStyles } from "../constants";
import { formatNumber } from "../utils";



const ReelsBtns = ({
  isLiked,
  likes,
  shares,
  comments,
  thumbnailUrl,
}) => {

  const [liked, setLiked] = useState(isLiked);
// setLiked(isLiked)
  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.btn}
      onPress={() => setLiked((prevState) => !prevState)}
    >
      {!liked ? (
        <Entypo name="heart" size={25} color="red" />
      ) : (
        <Entypo name="heart-outlined" size={25} color="white" />
      )}
      <Text style={[styles.text, typographyStyles.md]}>
        {liked ? formatNumber(likes + 1) : formatNumber(likes)} Likes
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}>
      <Feather name="message-circle" size={25} color="white" />
      <Text style={[styles.text, typographyStyles.md]}>
         {formatNumber(comments)} Comments
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}>
      <Ionicons name="paper-plane-outline" size={25} color={"white"} />
      <Text style={[styles.text, typographyStyles.md]}>
        {/* {formatNumber(shares)} */} shares
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}>
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={25}
        color="white"
      />
    </TouchableOpacity>
    {/* <TouchableOpacity style={styles.btn}>
      <Image source={{ uri: thumbnailUrl }} style={styles.image} />
    </TouchableOpacity> */}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 70,
    right: 10,
    width: 55,
    zIndex: 20,
  },
  btn: {
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
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
