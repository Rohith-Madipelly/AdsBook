// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <OTPInputView
//         pinCount={6}
//         style={styles.otpView}
//         codeInputFieldStyle={styles.underlineStyleBase}
//         onCodeFilled={value => {
//           console.log(value);
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   otpView: {
//     width: '80%',
//     height: 200,
//     color: 'black',
//   },
//   underlineStyleBase: {
//     width: 30,
//     height: 45,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     color: 'black',
//     borderBottomColor: '#17BED0',
//   },
// });

// export default App;


import OTPInputView from '@twotalltotems/react-native-otp-input'
import React from "react";
import {StyleSheet,View,TouchableOpacity,Dimensions, KeyboardAvoidingView, Text} from "react-native";

const screenHeight = Dimensions.get('window').height
export default OtpScreenComponent = () => {

 return (
   <KeyboardAvoidingView>
   <View style={styles.container}>
   <OTPInputView
   style={{width: '80%', height: 200}}
   pinCount={6}
   autoFocusOnLoad
   codeInputFieldStyle={styles.underlineStyleBase}
   codeInputHighlightStyle={styles.underlineStyleHighLighted}
   onCodeFilled = {(code => {
     console.log(`Code is ${code}, you are good to go!`)
  })}
/>
  <TouchableOpacity onPress={ () => {}}> 
  <Text>Submit Code</Text>
  </TouchableOpacity>
  </View>
  </KeyboardAvoidingView>
 );
}














// import {
//     View, Keyboard,
//     KeyboardAvoidingView, StyleSheet,
//     Platform, Text
// } from 'react-native'
// import React from 'react'

// import { SafeAreaView } from 'react-native-safe-area-context'
// import OTPInputView from '@twotalltotems/react-native-otp-input';


// import Clipboard from '@react-native-community/clipboard';

// const New = () => {
//     return (
//         // <SafeAreaView>

//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={styles.container}
//             >
//             <View style={{ alignItems: "center" }}>
//                 <Text style={{ fontSize: 25, color: "black" }}>
//                     Verify Phone Number

//                 </Text>

//                 <Text style={{ fontSize: 15, color: "black" }}>
//                     Enter 4 digits code Received on your phone

//                 </Text>

//                 <Text style={{ fontSize: 15, color: "black" }}>
//                     9951072005

//                 </Text>
//                 <View>
//                 <OTPInputView
//                         style={{width:100,height:200,paddingHorizontal:32}}
//                         pinCount={6}
//                         autoFocusOnLoad
//                         codeInputFieldStyle={{
//                             width: 30,
//                             height: 45,
//                             borderWidth: 0,
//                             borderBottomWidth: 1,
//                         }}
                        
                        
//                         ></OTPInputView>

                        
                 
//                 </View>


//             </View>
//             <View>
//                 <Text>New</Text>
//             </View>

//             </KeyboardAvoidingView>

//         // </SafeAreaView>

//     )
// }

// export default New



const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    containerImageBackground: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        margin: "0",
        width: '100%',
        height: '100%'
        // backgroundColor: "white",

    },

    Heading_1: {
        color: '#0A0240',
        // fontFamily: 'Jost',
        fontSize: 32,
        fontStyle: 'normal',
        fontWeight: '400',
    },

    Heading_2: {
        color: '#0A0240',
        // fontFamily: 'Jost',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400',


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
    image: {
        width: 300,
        resizeMode: "contain",
        marginBottom: 6,
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    linkText: {
        color: "#3797EF",
        marginLeft: 5.5,
        fontWeight: "600",
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginVertical: 15,
        paddingHorizontal: 10,
    },
});
