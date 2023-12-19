import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from "react-native";


import { typographyStyles } from "../constants";
import { formatNumber } from "../utils";



const ReelDescription = ({
    description,
    // isLiked,
    // likes,
    // shares,
    // comments,
    // UploaderthumbnailUrl,
}) => {

    // const [liked, setLiked] = useState(isLiked);

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.btn2}>
                {/* <Image source={{ uri: UploaderthumbnailUrl }} style={styles.image} /> */}
                <View>
                    <Text style={styles.text}> Rohith loves 
                    {description}
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 35,
        left:55,
        // right: 50,
        maxWidth: 300,
        width:290,

        // padding:3,
        paddingTop:0,
        paddingBottom:2,
        paddingLeft:10,

        zIndex: 18,
        // backgroundColor:"red",
        borderRadius:100,
    },
    btn2: {
        height:40
        // alignItems: "center",
        // marginBottom: 15,
    },
    text: {
        color: "#fff",
        marginTop: 6,
        fontWeight: "400",
        fontSize:14,
        
        textAlign:"left",
       
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

export default ReelDescription;
