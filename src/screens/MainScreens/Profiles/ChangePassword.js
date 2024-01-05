
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

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";

import Spinner from 'react-native-loading-spinner-overlay';


import { ErrorMessage, Button } from "../../../screenComponents/Auth";

import { ChangePasswordAPI } from "../../../utils/API_Calls";

import { ToasterSender } from "../../../utils/Toaster";
import { ChangePassword } from "../../../schema/ChangePassword";
import { useDispatch, useSelector } from "react-redux";

const Password = ({ route }) => {
  const { params } = route;
  const email = params?.email || 'no Data';

  const [spinnerBool, setSpinnerbool] = useState(false)

  const [error, setError] = useState("")
  const navigation = useNavigation();
  let tokenn = useSelector((state) => state.token);
  const submitHandler = async (inputData) => {



    try {
      if (tokenn != null) {
        tokenn = tokenn.replaceAll('"', '');
        console.log(">",tokenn)
      }
    }
    catch (err) {
      console.log("Error in token quotes", err)
    }



    try {
      const { old_password, New_Password } = inputData;
      console.log(old_password, New_Password,tokenn)
      setSpinnerbool(true)
      console.log(old_password, New_Password, tokenn)
      const res = await ChangePasswordAPI(old_password, New_Password, tokenn)
      if (res) {
       
        const Message = res.data.message

        ToasterSender({ Message: `${Message}` })



        setTimeout(() => {

          setSpinnerbool(false)
        }, 50);
        setTimeout(() => {
          navigation.navigate('Profile');
          // navigation.navigate('Login');
        }, 60);


      }

    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        ToasterSender({ Message: `${errorMessage}` })
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
        console.log("Error in Setting up the Request.", error)
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

      setSpinnerbool(false)
    }

  }


  return (
    <>

      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />


      <ImageBackground
        source={require('../../../../assets/BgImgs/Bg.png')} // Replace with the actual path to your image
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
              <Text style={[styles.Heading_1, { marginBottom: 20 }]}>Change Password</Text>

              {/* Correct Way in React native */}
              {/* <Text style={[styles.Heading_2, { marginVertical: 10, marginBottom: 25 }]}>
                Change Here
              </Text> */}



              <Formik
                // initialValues={{ email: "chinnu@admin.com", password: "Chinnu#143." }}
                initialValues={{ email: "", password: "" }}
                // initialValues={{ old_password: "Rohith@7", New_Password: "Rohith@123" }}
                onSubmit={submitHandler}
                validationSchema={ChangePassword}
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
                          { borderColor: `${(touched.password && errors.password) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Enter Old password"
                          // autoCapitalize="none"
                          // secureTextEntry
                          onChangeText={handleChange("old_password")}
                          value={values.old_password}
                          style={{ color: "black" }}

                        />
                      </View>
                      {(touched.old_password && errors.old_password) && (
                        <ErrorMessage style={{width:'70'}}>{errors.old_password}</ErrorMessage>
                      )}
                    </View>

                    <View>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(touched.New_Password && errors.New_Password) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Enter New Password"
                          // autoCapitalize="none"
                          // secureTextEntry
                          onChangeText={handleChange("New_Password")}
                          value={values.New_Password}
                          style={{ color: "black" }}

                        />
                      </View>
                      {(touched.New_Password && errors.New_Password) && (
                        <ErrorMessage>{errors.New_Password}</ErrorMessage>
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
                      UPDATE
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

export default Password



const styles = StyleSheet.create({
  containerImageBackground: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: "0",
    marginTop: 100,
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
