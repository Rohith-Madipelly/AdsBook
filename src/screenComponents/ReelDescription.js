import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    Dimensions,
    Linking
} from "react-native";


import { typographyStyles } from "../constants";
import { formatNumber } from "../utils";

const windoWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

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
                    <Text style={styles.text} 
                    onPress={() => Linking.openURL(description)}
                    >
                        {/* {description}  */}
                        Click here for Location
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',

        bottom: -(windowHeight - 40),
        // backgroundColor: 'red',
        left: 65,
        right:7,


        zIndex: 18,
        borderRadius: 100,
    },
    btn2: {
        height: "auto"
        // alignItems: "center",
        // marginBottom: 15,
    },
    text: {
        color: "#fff",
        marginTop: 6,
        fontWeight: "400",
        fontSize: 14,

        textAlign: "left",
        padding: 5,
        paddingBottom: 5,
        height: "auto"

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