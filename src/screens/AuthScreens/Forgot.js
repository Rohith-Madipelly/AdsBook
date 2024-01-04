import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { ForgotSchema } from "../../schema/ForgotSchema";

import { theme, typographyStyles } from "../../constants";

// import Loader from "../../screenComponents/Shared/Loader/Loader";
import Loader from "../../screenComponents/Shared/Loader/Loader";
// import { ErrorMessage, Button } from "../screenComponents/Auth";
import { ErrorMessage, Button } from "../../screenComponents/Auth";
import { UserForgotOTPApi, UserLoginApi } from "../../utils/API_Calls";
import { ToasterSender } from "../../utils/Toaster";

;

const Forgot = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [spinnerBool, setSpinnerbool] = useState(false)
  const navigation = useNavigation();

  const submitHandler = async (inputData) => {
    setSpinnerbool(true)


    try {
      const { email } = inputData;

      const res = await UserForgotOTPApi(email)

      if (res) {

        setTimeout(() => {
          setLoading(false);
          setSpinnerbool(false)
       
          const Message = res.data.message
          ToasterSender({ Message: `${Message}` })
          // navigation.navigate('OtpScreen');
          navigation.navigate('OtpScreen', { email: email });


        }, 200);
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          ToasterSender({ Message: 'Invalid Credentials>' })
          console.log("Error With 400.")
        }
        else if (error.response.status === 404) {
          console.log("User not found", error.message)
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

      // ToasterSender({ Message: 'Invalid Credentials>' })
      // ToasterSender({ Message: error })

      setSpinnerbool(false)

      // let message = "Failed to create user.";

      // if (error) {
      //   message = error.message;
      // }
    }
    finally {
      setLoading(false);
      // setSpinnerbool(false)
    }
  }


  return (
    <>
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />

      {/* {loading && <Loader />} */}
      <ImageBackground
        source={require('../../../assets/BgImgs/Bg.png')} // Replace with the actual path to your image
        style={styles.containerImageBackground}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >



          <StatusBar translucent={true} backgroundColor="transparent" />
          {/* <StatusBar style='auto'/> */}


          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text style={styles.Heading_1}>Lost Password?</Text>

              {/* Correct Way in React native */}
              <Text style={[styles.Heading_2, { marginVertical: 10, marginBottom: 25 }]}>
                Don’t worry we are here
              </Text>
              



              <Formik
                initialValues={{ email: "" }}
                // initialValues={{ email: "madipellyrohith@gmail.com" }}
                onSubmit={submitHandler}
                validationSchema={ForgotSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <>
                    {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
                    <View style={styles.inputContainer}>


                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(errors.email && touched.email) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Email Address"
                          autoComplete="email"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email.toLowerCase()}
                          style={{ color: "black" }}
                        />
                      </View>
                      {(errors.email && touched.email) && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                      )}
                    </View>



                    <Button
                      activeOpacity={0.5}
                      //@ts-ignore
                      onPress={handleSubmit}
                      disabled={!isValid}
                      btnStyle={{ marginTop: 25 }}
                      // bgColor={`${!isValid ? theme.colors.secondaryBlue : ""}`}
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                    >
                      GET OTP
                    </Button>


                  </>
                )}


              </Formik>


            </View>
          </TouchableWithoutFeedback>
          <View>
          </View>

        </KeyboardAvoidingView>
      </ImageBackground >
    </>
  )
}

export default Forgot



const styles = StyleSheet.create({
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
