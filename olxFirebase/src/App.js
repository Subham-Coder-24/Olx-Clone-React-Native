import React,{useState,useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { DefaultTheme , Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'



import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import ListitemScreen from './screens/ListitemScreen';
import AccountScreen from './screens/AccountScreen';


LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",]);



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#030303',
    accent: '#f1c40f',
  },
};


//it is a stack for login screen and signup screen
const Stack = createStackNavigator()
const AuthNavigator = () =>{
  return(
    <Stack.Navigator>
        <Stack.Screen options={styles.box6}  name="Login" component={LoginScreen} />
        <Stack.Screen options={styles.box7} name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )

}

//it is for tab navigation
const Tab = createBottomTabNavigator();
const TabNavigator = () =>{
  return(
      <Tab.Navigator 
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color }) => {
            let iconName;

            if (route.name == 'Home') {
              iconName = 'home'
               
            } else if (route.name =='Create'){
              iconName =  'plus-circle'
            } else {
              iconName = 'user'
            }

            // You can return any component that you like here!
            return <View   ><Feather name={iconName} size={30} color={color} /></View>;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: 'gray',
        }}
      
      >
        <Tab.Screen name="Home" component={ListitemScreen}  />
        <Tab.Screen name="Create" component={CreateAdScreen}  />
        <Tab.Screen name="Account" component={AccountScreen}  />
      </Tab.Navigator>
  )
      

}

const Navigation=()=>{
  const [user,setUser] = useState('')

  useEffect(()=>{
      const unsubscribe = auth().onAuthStateChanged( userExist=>{

      if(userExist){
        setUser(userExist)
      }else{
        setUser("")
      }

    })
    return unsubscribe
    
  } , [])
  return(
    <NavigationContainer>
     {user?<TabNavigator/>:<AuthNavigator/>}
    </NavigationContainer>
  )
}


const App = () => {
  return (                      
  //in the root level only one fragment can return so we use <> </> symbole
    <>
    <PaperProvider theme={theme}>
      <StatusBar barStyle="white-content" backgroundColor="black"/>
      
      <View style = {styles.container} >
        <Navigation/>
      </View>
    </PaperProvider>
    </>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  } ,
  box6:{
           title:'Welcome Again' ,
           
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
  },
  box7:{
           title:'Welcome New User' ,
           
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
  },
  
});






export default App;
