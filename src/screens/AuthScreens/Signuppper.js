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
import { signUp } from "../../schema/signUp";

import { theme, typographyStyles } from "../../constants";

// import Loader from "../../screenComponents/Shared/Loader/Loader";
import Loader from "../../screenComponents/Shared/Loader/Loader";
// import { ErrorMessage, Button } from "../screenComponents/Auth";
import { ErrorMessage, Button } from "../../screenComponents/Auth";

import { UserLoginApi } from "../../utils/Apis";

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigation = useNavigation();

    const submitHandler = async (user) => {

        setLoading(true);
        try {
            const { email, password } = user;
            // navigation.navigate('Reels');


            const res = await UserLoginApi(email, password)
            if (res) {
                setLoading(false);

                console.log(res.data.Token)
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate('Reels');
                }, 1000);
            }
            // console.log(email, " > ", password)


        } catch (err) {

            let message = "Failed to create user.";

            if (err) {
                // message = err.message;
            }
            // setError(message);
        } finally {
            setLoading(false);
        }

    }
    

    return (
        <>
            {loading && <Loader />}
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
                            <Text style={styles.Heading_1}>Don’t Have Account..?</Text>

                            {/* Correct Way in React native */}
                            <Text style={[styles.Heading_2, { marginVertical: 10, marginBottom: 25 }]}>
                                Create Account
                            </Text>



                            {/* <Image
                  source={require("../../assets/logoImgs/LogoModel.png")}
                  style={styles.image}
                />
                <Image
                  source={require("../../assets/logoImgs/LogoName.png")}
                  style={styles.image}
                /> */}


                            <Formik
                                initialValues={{ firstname: "", lastname: "", age: "", gender: "", email: "", phone_number: "", password: "", dob: "" }}
                                onSubmit={submitHandler}
                                validationSchema={signUp}
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
                                                    { borderColor: `${(errors.gender && touched.gender) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="Gender"
                                                    autoComplete="gender"
                                                    // keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("gender")}
                                                    onBlur={handleBlur("gender")}
                                                    value={values.gender}
                                                    style={{ color: "black" }}
                                                />

                                                {/* <Picker
                                                    selectedValue={values.gender}
                                                    onValueChange={itemValue => handleChange("gender")(itemValue)}
                                                    style={{ color: "black" }}
                                                >
                                                    <Picker.Item label="Select Gender" value="" />
                                                    <Picker.Item label="Female" value="female" />
                                                    <Picker.Item label="Male" value="male" />
                                                </Picker> */}
                                            </View>
                                            {(errors.gender && touched.gender) && (
                                                <ErrorMessage>{errors.gender}</ErrorMessage>
                                            )}
                                        </View>
                                        {/* <View style={styles.inputContainer}>
                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${(touched.dob && errors.dob) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="Date Of Brith"
                                                    // autoCapitalize="none"
                                                    // secureTextEntry
                                                    onChangeText={handleChange("password")}
                                                    value={values.dob}
                                                    style={{ color: "black" }}

                                                />
                                            </View>
                                            {(touched.dob && errors.dob) && (
                                                <ErrorMessage>{errors.dob}</ErrorMessage>
                                            )}
                                        </View> */}


                                        <View style={styles.inputContainer}>
                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${touched.dob && errors.dob ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="Date Of Birth"
                                                    // autoCapitalize="none"
                                                    // secureTextEntry
                                                    // onChangeText={handleChange("dob")}   
                                                    value={values.dob}
                                                    style={{ color: "black" }}
                                                />
                                                
                                            </View>
                                            {touched.dob && errors.dob && (
                                                <ErrorMessage>{errors.dob}</ErrorMessage>
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
                                            Create Account
                                        </Button>


                                        <View style={styles.ToLoginContainer}>


                                            <Text
                                                style={[
                                                    {
                                                        // color: theme.colors.primaryRed,
                                                        fontWeight: "500",
                                                        fontSize: 14,
                                                    },
                                                    typographyStyles.md,
                                                ]}

                                            >
                                                Already have an account?  <Text style={
                                                    {
                                                        color: theme.colors.primaryRed,
                                                    }

                                                } onPress={() => navigation.navigate("Login")}>Login</Text>
                                            </Text>
                                        </View>


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
    ToLoginContainer: {
        alignItems: "center",
        marginVertical: 35,
        paddingHorizontal: 10,
    },
});