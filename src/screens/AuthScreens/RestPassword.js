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
import { theme, typographyStyles } from "../../constants";

// import Loader from "../../screenComponents/Shared/Loader/Loader";
import Loader from "../../screenComponents/Shared/Loader/Loader";

import { ErrorMessage, Button } from "../../screenComponents/Auth";

import { ForgotApiPassRest } from "../../utils/API_Calls";
import { RestPassword } from "../../schema/RestPassword";
import { ToasterSender } from "../../utils/Toaster";

const Login = ({ route }) => {
  const { params } = route;
  const email = params?.email || 'no Data';

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigation = useNavigation();

  const submitHandler = async (inputData) => {




    setLoading(true);
    try {
      const { New_password, Confirm_Password } = inputData;
      var password=""
      if (New_password === Confirm_Password) {
        // console.log(true)
        password = Confirm_Password;

      }
      else {

      }
      setSpinnerbool(true)
    
      const res = await ForgotApiPassRest(email,password)
      if (res) {
        const Message = res.data.message

        ToasterSender({ Message: `${Message}` })



        setTimeout(() => {
          setLoading(false);
          setSpinnerbool(false)
        }, 50);
        setTimeout(() => {
          // navigation.navigate('Login', { emailSender: email });
          // navigation.navigate('Login');
        }, 60);


      }

    } catch (error) {
      if (error.response) {
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
        console.log("Error in Setting up the Request.",error)
      }

      ToasterSender({ Message: 'Invalid Credentials>' })
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

  }


  return (
    <>

      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />


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
              <Text style={[styles.Heading_1, { marginBottom: 20 }]}>Reset Your Password</Text>

              {/* Correct Way in React native */}
              {/* <Text style={[styles.Heading_2, { marginVertical: 10, marginBottom: 25 }]}>
                Change Here
              </Text> */}



              <Formik
                // initialValues={{ email: "chinnu@admin.com", password: "Chinnu#143." }}
                // initialValues={{ email: "madipellyrohith@gmail.com", password: "Rohith@7" }}
                initialValues={{ New_password: "", Confirm_Password: "" }}
                onSubmit={submitHandler}
                validationSchema={RestPassword}
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
                          placeholder="Enter New password"
                          // autoCapitalize="none"
                          secureTextEntry
                          onChangeText={handleChange("New_password")}
                          value={values.New_password}
                          style={{ color: "black" }}

                        />
                      </View>
                      {(touched.New_password && errors.New_password) && (
                        <ErrorMessage>{errors.New_password}</ErrorMessage>
                      )}
                    </View>

                    <View>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(touched.Confirm_Password && errors.Confirm_Password) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Confirm New Password"
                          // autoCapitalize="none"
                          secureTextEntry
                          onChangeText={handleChange("Confirm_Password")}
                          value={values.Confirm_Password}
                          style={{ color: "black" }}

                        />
                      </View>
                      {(touched.Confirm_Password && errors.Confirm_Password) && (
                        <ErrorMessage>{errors.Confirm_Password}</ErrorMessage>
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

export default Login



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
