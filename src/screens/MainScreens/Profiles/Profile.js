import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserGetProfileDetails } from '../../../utils/API_Calls'
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from "react-native-vector-icons/Feather"

const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [profile, setProfile] = useState("")
  const [UserName, setUserName] = useState("")
  const [UserEmail, setUserEmail] = useState("")
  const [UserPhone, setUserPhone] = useState("")
  const [UserDOB, setDOB] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [Wallet, setWallet] = useState("")
  const [profilepic, setProfilepic] = useState(null)

  const loginSelectorToken = useSelector((state) => state.token);

  var tokenn = loginSelectorToken;
  tokenn = tokenn.replaceAll('"', '');

  const userData = async () => {
    setSpinnerbool(true)
    // console.log(tokenn)
    try {
      const res = await UserGetProfileDetails(tokenn)


      if (res) {
        // console.log(">>>", res.data)

        setUserName([res.data.firstname, " ", res.data.lastname])
        setUserEmail(res.data.email)
        setUserPhone(res.data.phone_number)
        setDOB(res.data.Date_of_birth)
        setWallet(res.data.wallet)
        setAge(res.data.age)
        setGender(res.data.gender)
        setSpinnerbool(false)
        var datadsd = res.data.profile_pic

        setProfilepic(datadsd)
        // setProfilepic(res.data.profile_pic)
        if (datadsd == "") {
        }
        else {
          setProfilepic(`https://ads-reels-pictures.s3.ap-south-1.amazonaws.com/${datadsd}`)

        }
        console.log(profilepic)
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
        <Text style={{
          fontSize: 20, fontWeight: 'bold',
          // color: 'white' 
        }}>
          {/* Reels */}
          Back
        
        <Feather name="camera" style={{
          fontSize: 25,
          marginLeft: 20,
          // color: 'white'
        }} />
        </Text>

        <Feather name="camera" style={{
          fontSize: 25,
          marginLeft: 20,
          // color: 'white'
        }} />
      </View>



      <View style={{
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,

        zIndex: 1,
        padding: 10,
        backgroundColor: 'pink',
        height: 500,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,



      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          {/* <Text style={{
            fontSize: 20, fontWeight: 'bold',
            // color: 'white' 
          }}>Reels</Text> */}
          
          <Text></Text>


          <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 20 }}>

            <Text style={{ fontSize: 15, }}>
              {/* Edit  */}
              <Feather name="edit" style={{
                fontSize: 20,
                marginLeft: 40,
                marginTop: -20
                // color: 'white'
              }} />
            </Text>




          </View>

        </View>
        
        <TextInput
                        placeholder='Enter Full Name'
                        style={{ marginHorizontal: 20, backgroundColor: "#FFF", borderColor: "#E3E5E5", borderWidth: 1, paddingLeft: 15, borderRadius: 10, marginTop: 3, color: "#090A0A", fontWeight: "400" }}
                        // value={FullName}
                        // onChangeText={text => setFullName(text)}
                        placeholderTextColor={"#72777A"}
                        // editable={editable ? true : false}
                    />

        <Text style={styles.TextUR}><Text style={styles.TextGS}>Name </Text> : {UserName}</Text>
        <Text style={styles.TextUR}><Text style={styles.TextGS}>Email </Text> : {UserEmail}</Text>
        <Text style={styles.TextUR}><Text style={styles.TextGS}>Phone Number </Text> : {UserPhone}</Text>
        <Text style={styles.TextUR}><Text style={styles.TextGS}>Date of Birth </Text> : {UserDOB}</Text>
        <Text style={styles.TextUR}><Text style={styles.TextGS}>Age </Text> : {age}</Text>
        <Text style={styles.TextUR}><Text style={styles.TextGS}>Gender </Text> : {gender}</Text>
        <Text style={styles.TextUR}><Text style={styles.TextGS}>Wallet </Text> : {Wallet}</Text>

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