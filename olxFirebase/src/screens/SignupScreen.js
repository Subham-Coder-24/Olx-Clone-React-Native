import React,{useState} from 'react';
import {Alert , View, Text , Image ,StyleSheet,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import {TextInput , Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';




const LoginScreen = ({navigation}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const userSignup = async ()=>{
    if(!email || !password){
      Alert.alert("Please fill all the blanks")
      return
    } 
    try{
      await auth().createUserWithEmailAndPassword(email,password )
    }catch(err){
      Alert.alert("Something went wrong please try different password")
    }
  }








  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Image style={{width:200,height:200}} source={require('../image/olx.png')}/>
        <Text style={styles.text}>Please Signup!</Text>
      </View>

      <View style={styles.box2}>

      <TextInput
      label="Email"
      value={email}
      mode='outlined'
      onChangeText={text => setEmail(text)}
      />

      <TextInput
      label="password"
      value={password}
      mode='outlined'
      secureTextEntry={true}

      onChangeText={text => setPassword(text)}
      />

      <Button mode="contained" onPress={() => userSignup() }>
        Signup
      </Button>

       <TouchableOpacity onPress= {()=>navigation.navigate('Login') } >

      <Text style={{color: 'black',textAlign:'center'}}>Already have a account </Text>
      </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  box1:{
    alignItems:"center",
  },
  box2:{
    paddingHorizontal:40,
    height:'50%',
    justifyContent:"space-evenly",
    //backgroundColor:"red"
  },
  text:{
    fontSize:22,
    color: 'black'
  },

});  

export default LoginScreen