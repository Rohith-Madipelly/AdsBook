import React, { useState } from "react";
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
  ImageBackground,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { OTPSchema } from "../../schema/OTPSchema";

import { ErrorMessage, Button } from "../../screenComponents/Auth";
import { UserVerifyOtp } from "../../utils/API_Calls";
import { ToasterSender } from "../../utils/Toaster";

const Forgot = ({route}) => {

  const { params } = route;
  const email = params?.email || 'madipellyrohith@gmail.com';
  console.log(email)
// const email="madipelyrohith@gmail.com"

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [spinnerBool, setSpinnerbool] = useState(false);
  const navigation = useNavigation();

  const submitHandler = async (inputData) => {
    setLoading(true);
    setError("")
    try {
      const { otp } = inputData;



      console.log(email, otp)
      const res = await UserVerifyOtp(email, otp);  // Corrected the parameter passed to UserVerifyOtp
      if (res) {
        const Message = res.data.message
        // const Btokenforpassword=res.data.message
        // Handle success response
        setTimeout(() => {
          ToasterSender({ Message: `${Message}` })
          console.log("done go to change password")
          console.log(email)
          navigation.navigate('RestPassword', { email: email });
          setLoading(false);
          setSpinnerbool(false);
        }, 50);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          console.log("otp isn't matched 11>>", error.message)
        }
        else if (error.response.status === 403) {
          console.log("otp isn't matched >>", error.message)
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
      setSpinnerbool(false)
    }
  };

  return (
    <>
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />

      <ImageBackground
        source={require('../../../assets/BgImgs/Bg.png')}
        style={styles.containerImageBackground}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <StatusBar translucent={true} backgroundColor="transparent" />

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text style={styles.Heading_1}>Enter OTP</Text>
              <Text style={[styles.Heading_2, { marginVertical: 10 }]}>
                Don’t worry we are here
              </Text>
              <Text style={{ fontSize: 15, color: "green", marginBottom: 25 }}>
                   {/* Enter 6 digits code Received on your Email */}
                   6 Digits OTP successfully sent to your email.
             </Text>
              <Formik
                initialValues={{ otp: "" }}
                onSubmit={submitHandler}
                validationSchema={OTPSchema}
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
                    {/* {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>} */}
                    <View style={styles.inputContainer}>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${errors.otp && touched.otp ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Enter OTP Here"
                          keyboardType="number-pad"
                          autoCapitalize="none"
                          // onChangeText={handleChange("otp")}
                          onChangeText={(text) => {
                            if (text.length <= 6) {
                              handleChange("otp")(text);
                              setError("")

                            } else if (text.length > 6) {
                              // Handle the error condition appropriately
                              setError("More than 6 digits are not allowed");
                              // Clear the input field
                            }
                          }}
                          onBlur={handleBlur("otp")}
                          value={values.otp}
                          style={{ color: "black" }}
                        // maxLength={6}  // Set the maximum length to 6
                        />
                      </View>
                      {errors.otp && touched.otp && (
                        <ErrorMessage>{errors.otp}</ErrorMessage>
                      )}
                      {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
                    </View>

                    <Button
                      activeOpacity={0.5}
                      onPress={handleSubmit}
                      disabled={!isValid}
                      btnStyle={{ marginTop: 25 }}
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                    >
                      VERIFY OTP
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
  );
};

export default Forgot;

const styles = StyleSheet.create({
  containerImageBackground: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%'
  },
  Heading_1: {
    color: '#0A0240',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  Heading_2: {
    color: '#0A0240',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderStyle: "solid",
    padding: 12,
    borderRadius: 6,
    marginBottom: 6,
    color: "white",
    height: 45,
  },
});
