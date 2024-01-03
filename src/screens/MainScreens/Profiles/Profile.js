import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserGetProfileDetails } from '../../../utils/API_Calls'
import Spinner from 'react-native-loading-spinner-overlay';

const Profile = () => {
  const [spinnerBool, setSpinnerbool] = useState(false)
  const [profile,setProfile]=useState("")
  const [UserName, setUserName] = useState("")
  const [UserEmail, setUserEmail] = useState("")
  const [UserPhone, setUserPhone] = useState("")
  const [UserDOB, setDOB] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [Wallet, setWallet] = useState("")


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

        setUserName([res.data.firstname," ",res.data.lastname])
        setUserEmail(res.data.email)
        setUserPhone(res.data.phone_number)
        setDOB(res.data.Date_of_birth)
        setWallet(res.data.wallet)
        setAge(res.data.age)
        setGender(res.data.gender)
        setSpinnerbool(false)
      }
      else {

      }
    } catch (error) {
      setTimeout(() => {
        console.log("Error in fetching", error)
      }, 1000);
    }
    finally{
      setSpinnerbool(false)

    }
  }
  //Profile API
  useEffect(() => {
    userData()
  }, []);





  return (
    <View style={{ marginTop: 20, padding: 10 }}>
            <Spinner
        visible={spinnerBool}
        color={"#5F2404"}
        animation={'fade'}
      />
      <Text>Profile </Text>
      {/* <Text>Token: {loginSelectorToken}</Text> */}


      <Text style={styles.TextUR}><Text style={styles.TextGS}>Name </Text> : {UserName}</Text>
      <Text style={styles.TextUR}><Text style={styles.TextGS}>Email </Text> : {UserEmail}</Text>
      <Text style={styles.TextUR}><Text style={styles.TextGS}>Phone Number </Text> : {UserPhone}</Text>
      <Text style={styles.TextUR}><Text style={styles.TextGS}>Date of Birth </Text> : {UserDOB}</Text>
      <Text style={styles.TextUR}><Text style={styles.TextGS}>Age </Text> : {age}</Text>
      <Text style={styles.TextUR}><Text style={styles.TextGS}>Gender </Text> : {gender}</Text>
      <Text style={styles.TextUR}><Text style={styles.TextGS}>Wallet </Text> : {Wallet}</Text>


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
});