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
                                        {/* firstname*/}
                                        <View style={styles.inputContainer}>


                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${(errors.firstname && touched.firstname) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="firstname"
                                                    autoComplete="name"
                                                    keyboardType="firstname"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("firstname")}
                                                    onBlur={handleBlur("firstname")}
                                                    value={values.firstname}
                                                    style={{ color: "black" }}
                                                />
                                            </View>
                                            {(errors.firstname && touched.firstname) && (
                                                <ErrorMessage>{errors.firstname}</ErrorMessage>
                                            )}
                                        </View>
                                        {/* lastname */}
                                        <View style={styles.inputContainer}>


                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${(errors.firstname && touched.firstname) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="lastname"
                                                    autoComplete="name"
                                                    keyboardType="lastname"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("lastname")}
                                                    onBlur={handleBlur("lastname")}
                                                    value={values.lastname}
                                                    style={{ color: "black" }}
                                                />
                                            </View>
                                            {(errors.lastname && touched.lastname) && (
                                                <ErrorMessage>{errors.lastname}</ErrorMessage>
                                            )}
                                        </View>

                                        {/* lastname */}
                                        <View style={styles.inputContainer}>


                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${(errors.age && touched.age) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="age"
                                                    autoComplete="ae"
                                                    keyboardType="age"
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange("age")}
                                                    onBlur={handleBlur("age")}
                                                    value={values.age}
                                                    style={{ color: "black" }}
                                                />
                                            </View>
                                            {(errors.age && touched.age) && (
                                                <ErrorMessage>{errors.age}</ErrorMessage>
                                            )}
                                        </View>

                                        <View style={styles.inputContainer}>


                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${(errors.email && touched.email) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="User Name"
                                                    autoComplete="name"
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


                                        <View style={styles.inputContainer}>


                                            <View
                                                style={[
                                                    styles.input,
                                                    { borderColor: `${(errors.email && touched.email) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <TextInput
                                                    placeholderTextColor={"#444"}
                                                    placeholder="User Name"
                                                    autoComplete="name"
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
                                            {(touched.password && errors.password) && (
                                                <ErrorMessage>{errors.password}</ErrorMessage>
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
                                            {(touched.password && errors.password) && (
                                                <ErrorMessage>{errors.password}</ErrorMessage>
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
                                            {(touched.password && errors.password) && (
                                                <ErrorMessage>{errors.password}</ErrorMessage>
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
