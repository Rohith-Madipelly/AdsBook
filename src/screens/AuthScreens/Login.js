
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
  Image,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";


import { Formik } from "formik";
import { loginSchema } from "../../schema/signIn";

import { theme, typographyStyles } from "../../constants";
import { ErrorMessage, Button } from "../../screenComponents/Auth";
import { ToasterSender } from '../../utils/Toaster'

import { UserLoginApi } from "../../utils/API_Calls";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

// redux
import {useDispatch} from 'react-redux';
import { setToken } from '../../redux/actions/loginAction'


import ASO from '../../utils/AsyncStorage_Calls'

const Login = () => {

  const [spinnerBool, setSpinnerbool] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const submitHandler = async (user) => {

    setLoading(true);

    try {
      const { email, password } = user;
      setSpinnerbool(true)
      const res = await UserLoginApi(email, password)
      if (res) {
        const Message = res.data.message
        const token = res.data.token

        ASO.setTokenJWT("Token", JSON.stringify(res.data.token), function (res, status) {
          if (status) {
            // console.warn(status, " status>>>>>.")
            ToasterSender({ Message: `${Message}` })
            dispatch(setToken(token));
          }
        })

        setTimeout(() => {
          setLoading(false);
          setSpinnerbool(false)
        }, 50);


      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Error With 400.")
        }
        else if (error.response.status === 401) {
          console.log("Password is wrong", error.message)
          setError("Password is wrong")
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

      ToasterSender({ Message: error.response.data.message })
      // ToasterSender({ Message: error })

      setSpinnerbool(false)

      let message = "Failed to create user.";

      if (error) {
        console.log(error.response.data.message)
        // message = error.message;
        // setError(message)
        
      }
    }
    finally {
      setLoading(false);
      setSpinnerbool(false)
    }
  }


  return (
    <>
      {/* {loading && <Loader />} */}

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
              <Text style={styles.Heading_1}>Welcome Back</Text>

              {/* Correct Way in React native */}
              <Text style={[styles.Heading_2, { marginVertical: 10, marginBottom: 25 }]}>
                Login in Your Account
              </Text>



              <Formik
                
                initialValues={{ email: "", password: "" }}
               
                onSubmit={submitHandler}
                validationSchema={loginSchema}
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
                          value={values.email}
                          style={{ color: "black" }}
                        />
                      </View>
                      {(errors.email && touched.email) && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                      )}
                    </View>

                    <View>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(touched.password && errors.password) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Password"
                          // autoCapitalize="none"
                          // secureTextEntry
                          onChangeText={handleChange("password")}
                          value={values.password}
                          style={{ color: "black" }}

                        />
                      </View>
                      {(touched.password && errors.password) && (error)&&(
                        <ErrorMessage>{errors.password}</ErrorMessage>
                      )}
                      {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
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
                      Login
                    </Button>


                    <View style={styles.forgotPasswordContainer}>
                      <Text
                        style={[
                          {
                            color: theme.colors.primaryBlue,
                            fontWeight: "500",
                            fontSize: 14,
                          },
                          typographyStyles.md,
                        ]}
                        onPress={() => navigation.navigate("ForgotPassword")}
                      >
                        Forgot Password
                      </Text>
                    </View>

                    <Button
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate("Register")}
                      btnStyle={{ marginTop: 10 }}
                      // bgColor={`${!isValid ? "rgba(242, 142, 128, 0.7)" : "rgba(242, 142, 128, 1)"}`}
                      bgColor={"rgba(250, 142, 128, 1)"}
                    >
                      Don’t have an account? Sign up
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