import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserGetProfileDetails, UserUpdatedProfileDetails } from '../../../utils/API_Calls'
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from "react-native-vector-icons/Feather"
import { StatusBar } from 'expo-status-bar';


import { Formik } from "formik";
import { theme, typographyStyles } from "../../../constants";
import { ErrorMessage, Button } from "../../../screenComponents/Auth";
import { useNavigation } from '@react-navigation/native';
import { ProfileUpdatedSchema } from '../../../schema/ProfileUpdatedSchema';
import { ToasterSender } from '../../../utils/Toaster';


const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [profile, setProfile] = useState("")
  const [UserName, setUserName] = useState("")

  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")

  const [UserEmail, setUserEmail] = useState("")
  const [UserPhone, setUserPhone] = useState("")
  const [UserDOB, setDOB] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [Wallet, setWallet] = useState("")
  const [profilepic, setProfilepic] = useState(null)
  const [editToggle, setEditToggle] = useState(false)

  const navigation = useNavigation();
  const [error, setError] = useState("")
  const loginSelectorToken = useSelector((state) => state.token);

  var tokenn = loginSelectorToken;
  tokenn = tokenn.replaceAll('"', '');

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
  }


  const userData = async () => {
    setSpinnerbool(true)
    try {
      const res = await UserGetProfileDetails(tokenn)


      if (res) {
        // setUserName([res.data.firstname" " res.data.lastname])
        setFirstName(res.data.firstname)
        setLastName(res.data.lastname)
        setUserEmail(res.data.email)
        setUserPhone(res.data.phone_number)
        setDOB(res.data.Date_of_birth)
        setWallet(res.data.wallet)
        setAge(res.data.age)
        setGender(res.data.gender)
        setSpinnerbool(false)

        var datadsd = res.data.profile_pic
        setProfilepic(datadsd)
        if (datadsd == "") {
        }
        else {
          setProfilepic(`https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${datadsd}`)
        }
        // console.log(profilepic)
      }
      else {

      }
    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
      }, 1000);
    }
    finally {
      setSpinnerbool(false)
    }
  }



  const submitHandler = async (UpdatedUser) => {
    const { FirstName1, LastName1, age1 } = UpdatedUser;
    console.log(FirstName1, LastName1, age1)

    console.log(">>",FirstName, LastName, age ,tokenn)
    try {
      // const { fName, lName, userAge } = UpdatedUser;
      // console.log(user)
      setSpinnerbool(true)
      const res = await UserUpdatedProfileDetails(FirstName, LastName, age ,tokenn)
      if (res) {
        const Message = res.data.message
        const token = res.data.token
        ToasterSender({ Message: `${Message}` })


        setTimeout(() => {
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

      ToasterSender("Error in Setting up the Request.")
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

      setSpinnerbool(false)
    }
  }

  //Profile API
  useEffect(() => {
    userData()
  }, []);

  const windoWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  return (
    <View style={{
      marginTop: 0,
      width: windoWidth,
      height: windowHeight,
    }}>
      <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
      <View style={{
        position: 'absolute',
        top: 5,
        left: 5,
        right: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 10,
      }}>
        {/* <Text style={{
          fontSize: 20, fontWeight: 'bold',
          // color: 'white' 
        }}> */}
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Feather name="arrow-left" style={{
            fontSize: 25,
            marginLeft: 2,
            color: 'white'
          }} />
        </TouchableOpacity>
        {/* </Text> */}

        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Feather name="camera" style={{
            fontSize: 20,
            marginLeft: 20,
            // color: 'white'
          }} />
        </TouchableOpacity>


      </View>



      <View style={{
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        zIndex: 1,
        padding: 10,
        paddingLeft: 25,
        paddingTop: 20,
        backgroundColor: 'white',
        height: 500,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          position: 'absolute',
          right: 20,
          top: -15,


          // backgroundColor:'black'
        }}>
          {/* <Text style={{
            fontSize: 20, fontWeight: 'bold',
            // color: 'white' 
          }}>Reels</Text> */}

          <Text></Text>


          <View style={{ backgroundColor: 'white', padding: 5, paddingHorizontal: 7, borderRadius: 20, }}>

            <Text style={{ fontSize: 15, }}>
              <Text style={{ fontSize: 16, paddingTop: -10 }}>Edit </Text>
              <Feather name="edit" style={{
                fontSize: 20,
                marginLeft: 40,
                marginTop: -40
                // color: 'white'
              }}
                onPress={handleEditToggle}

              />
            </Text>
          </View>

        </View>


        {spinnerBool ? "" : <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >



          {/* <StatusBar translucent={true} backgroundColor="transparent" /> */}
          {/* <StatusBar style='auto'/> */}


          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Formik
                // initialValues={{ fName: `${FirstName}`, lName: `${LastName}`, userAge: `${age}`, userGender: `${gender}`, email: `${UserEmail}`, phoneNo: `${UserPhone}` }}
                initialValues={{ fName: `${FirstName}`, lName: `${LastName}`, userAge: `${age}` }}
                onSubmit={submitHandler}
                validationSchema={ProfileUpdatedSchema}
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
                    {/* First Name */}
                    <Text style={{ marginBottom: 10 }}>{editToggle ? <Text>You can Updated Your Profile</Text> : <Text>You can View Your Profile</Text>}</Text>
                    
                    <View style={styles.inputContainer}>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(errors.fName && touched.fName) ? "red" : "#ccc"}` },
                          // {borderColor:'transparent'}
                        ]}
                      >

                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="First Name"
                          // autoComplete="email"
                          // keyboardType="email-address"
                          // autoCapitalize="none"
                          onChangeText={handleChange("fName")}
                          onBlur={handleBlur("fName")}
                          value={values.fName}
                          style={{ color: "black" }}
                          editable={editToggle ? true : false}
                        />
                      </View>

                      <View style={{ marginLeft: 10 }}>
                        {(errors.fName && touched.fName) && (
                          <ErrorMessage>{errors.fName}</ErrorMessage>
                        )}
                      </View>
                    </View>

                    {/* Last Name */}
                    <View style={styles.inputContainer}>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(errors.lName && touched.lName) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Last Name"
                          // autoComplete="email"
                          // keyboardType="email-address"
                          // autoCapitalize="none"
                          onChangeText={handleChange("lName")}
                          onBlur={handleBlur("lName")}
                          value={values.lName}
                          style={{ color: "black" }}
                          editable={editToggle ? true : false}

                        />
                      </View>

                      <View style={{ marginLeft: 10 }}>
                        {(errors.lName && touched.lName) && (
                          <ErrorMessage>{errors.lName}</ErrorMessage>
                        )}
                      </View>
                    </View>

                    {/* Gender
                                        <View style={styles.inputContainer}>
                                            <View
                                                style={[
                                                    styles.input, { padding: 0, },
                                                    { borderColor: `${(errors.userGender && touched.userGender) ? "red" : "#ccc"}` },
                                                ]}
                                            >
                                                <Picker
                                                    // selectedValue={values.userGender}
                                                    selectedValue={values.userGender}
                                                    onValueChange={(itemValue) => handleChange("userGender")(itemValue)}
                                                    style={{ height: 50, marginTop: -5, marginLeft: -5 }}
                                                >
                                                    <Picker.Item label="Select Gender" value="" />
                                                    <Picker.Item label="Male" value="male" />
                                                    <Picker.Item label="Female" value="female" />
                                                </Picker>
                                            </View>

                                            <View style={{ marginLeft: 10 }}>
                                                {(errors.userGender && touched.userGender) && (
                                                    <ErrorMessage>{errors.userGender}</ErrorMessage>
                                                )}
                                            </View>
                                        </View> */}

                    {/* Users Age */}
                    <View style={styles.inputContainer}>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(errors.userAge && touched.userAge) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Age"
                          // autoComplete="email"
                          keyboardType="number-pad"
                          // autoCapitalize="none"
                          onChangeText={handleChange("userAge")}
                          onBlur={handleBlur("userAge")}
                          value={values.userAge}
                          style={{ color: "black" }}
                          editable={editToggle ? true : false}

                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        {(errors.userAge && touched.userAge) && (
                          <ErrorMessage>{errors.userAge}</ErrorMessage>
                        )}
                      </View>
                    </View>

                    {/* Email Address */}
                    {/* <View style={styles.inputContainer}>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(errors.email && touched.email) ? "red" : "#ccc"}` },
                        ]}
                      >
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Email Address"
                          // autoComplete="email"
                          keyboardType="email-address"
                          // autoCapitalize="none"
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          style={{ color: "black" }}
                          editable={editToggle ? true : false}

                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        {(errors.email && touched.email) && (
                          <ErrorMessage>{errors.email}</ErrorMessage>
                        )}
                      </View>
                    </View> */}

                    {/* Phone Number */}
                    {/* <View style={styles.inputContainer}>
                      <View
                        style={[
                          styles.input,
                          { borderColor: `${(errors.phoneNo && touched.phoneNo) ? "red" : "#ccc"}` },
                        ]}
                      >
                    
                        <TextInput
                          placeholderTextColor={"#444"}
                          placeholder="Phone Number"
                          // autoComplete="email"
                          keyboardType="numeric"
                          // autoCapitalize="none"
                          onChangeText={handleChange("phoneNo")}
                          onBlur={handleBlur("phoneNo")}
                          value={values.phoneNo}
                          style={{ color: "black" }}
                          editable={editToggle ? true : false}

                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        {(errors.phoneNo && touched.phoneNo) && (
                          <ErrorMessage>{errors.phoneNo}</ErrorMessage>
                        )}
                      </View>
                    </View> */}

                    {editToggle ? <Button
                      activeOpacity={0.5}
                      //@ts-ignore
                      onPress={submitHandler}
                      disabled={!isValid}
                      btnStyle={{ marginTop: 25 }}
                      // bgColor={`${!isValid ? theme.colors.secondaryBlue : ""}`}
                      bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                    >
                      Updated Profile
                    </Button> : ""}

                  </>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
          <View>
          </View>

        </KeyboardAvoidingView>}
      </View>




      {profilepic ? <View style={styles.outerCircle}>
        <ImageBackground
          style={styles.innerCircle}
          // source={profilepic}
          source={{
            uri: profilepic,
          }}
          resizeMode="cover"
        />
      </View> : <View style={styles.outerCircle}>
        <ImageBackground
          style={styles.innerCircle}
          source={require("../../../../assets/utilsImages/profile.png")}
          resizeMode="cover"
        >
        </ImageBackground>
      </View>}


    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

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
  TextUR: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '300',
    marginTop: 20
  },
  TextGS: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: 20
  },

  Heading_1: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  Heading_u2: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  Heading_u3: {
    color: '#0A0240',
    // fontFamily: 'Jost',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },



  outerCircle: {
    width: 360,
    height: 360,
    overflow: 'hidden',
  },
  innerCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});