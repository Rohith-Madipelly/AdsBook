import { createStackNavigator } from "@react-navigation/stack";
import { useState,useMemo, useEffect } from "react";

import Welcome from "./Welcome";

import Login from "./AuthScreens/Login";
import Register from "./AuthScreens/Register";
import Forgot from "./AuthScreens/Forgot";
import RestPassword from "./AuthScreens/RestPassword";
import BottomTabScreen from '../Navigations/BottomTabScreen'

import ASO from "../utils/AsyncStorage_Calls";

import { useSelector,useDispatch } from "react-redux";
import { setToken } from '../../src/redux/actions/loginAction'


export default function Screens() {
  const [user,setUser] =useState(true)

  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const loginSelector = useSelector((state) => state.isLogin);


  const verifyToken = async () => { 
      ASO.getTokenJWT('Token', (error, token) => {
        if (error) {
          console.error('Error getting token:', error);
        } else {
          // console.log('Retrieved token:', token);
          if(token!=null){
            dispatch(setToken(token));
          }
        }
      });
  }

// setUser(loginSelector)
useEffect(()=>{
  verifyToken();
},[])

useEffect(() => {
  setUser(loginSelector)
  // console.log("loginSelector",loginSelector)

}, [loginSelector])




  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
     
    >{
      user?(
      <Stack.Group screenOptions={{animationTypeForReplace:'pop',}}>

      <Stack.Screen name="Bottom-navigator" component={BottomTabScreen} />

      </Stack.Group>
      ):(
      <Stack.Group>
      {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} /> 
      <Stack.Screen name="ForgotPassword" component={Forgot} /> 
      <Stack.Screen name="RestPassword" component={RestPassword} /> 
      </Stack.Group>
      )
      }
    </Stack.Navigator>
  );
}

