import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, showDatePicker needs to be updated to hide the picker
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };


  return (
    <View >
      <Text>Date of Birth:</Text>

      <Button title="Select Date" onPress={showDatepicker} />

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfBirth}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
         
        />
      )}


    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;















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



// const styles = StyleSheet.create({
//     borderStyleBase: {
//         width: 30,
//         height: 45
//     },

//     borderStyleHighLighted: {
//         borderColor: "#03DAC6",
//     },

//     underlineStyleBase: {
//         width: 30,
//         height: 45,
//         borderWidth: 0,
//         borderBottomWidth: 1,
//     },

//     underlineStyleHighLighted: {
//         borderColor: "#03DAC6",
//     },
//     containerImageBackground: {
//         width: '100%',
//         height: '100%'
//     },
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "0",
//         margin: "0",
//         width: '100%',
//         height: '100%'
//         // backgroundColor: "white",

//     },

//     Heading_1: {
//         color: '#0A0240',
//         // fontFamily: 'Jost',
//         fontSize: 32,
//         fontStyle: 'normal',
//         fontWeight: '400',
//     },

//     Heading_2: {
//         color: '#0A0240',
//         // fontFamily: 'Jost',
//         fontSize: 24,
//         fontStyle: 'normal',
//         fontWeight: '400',


//     },


//     inputContainer: {
//         marginBottom: 12,

//     },
//     input: {
//         width: 300,
//         // backgroundColor: "#121212",
//         borderWidth: 1,
//         borderStyle: "solid",
//         padding: 12,

//         borderRadius: 6,
//         marginBottom: 6,
//         color: "white",
//         height: 45,


//     },
//     image: {
//         width: 300,
//         resizeMode: "contain",
//         marginBottom: 6,
//     },
//     bottomContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     linkText: {
//         color: "#3797EF",
//         marginLeft: 5.5,
//         fontWeight: "600",
//     },
//     forgotPasswordContainer: {
//         alignItems: "flex-end",
//         marginVertical: 15,
//         paddingHorizontal: 10,
//     },
// });
