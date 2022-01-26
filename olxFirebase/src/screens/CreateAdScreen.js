import { View , Text , StyleSheet , useColorScheme ,Alert } from 'react-native';
import React , {useState} from 'react';
import {TextInput , Button} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';



const CreateAdScreen = () => {
    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    const [year,setYear] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [image,setImage] = useState("")
    








  const postData = async()=>{
    try{
    await firestore().collection('ads')
    .add({
      name,
      desc,
      year,
      price,
      phone,
      image,            
      uid:auth().currentUser.uid
    })  
     Alert.alert("posted your ads")
    }catch(err){
      Alert.alert("Something went wrong .Try again")
    }
    
  }  

  const openCamera = ()=>{
    launchCamera({quality:0.5},(fileobj)=>{
        const img = fileobj.assets[0];
        //    console.log(fileobj)
        const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(img.uri)
        uploadTask.on('state_changed', 
        (snapshot) => {           
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             if(progress==100){alert("uploaded")}
        }, 
        (error) => {
           alert("something went wrong")
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setImage(downloadURL);
            });
        }
        );


   })
  }

    const openCamera1 = ()=>{
    launchImageLibrary({quality:0.5},(fileobj)=>{
        const img = fileobj.assets[0];
        //    console.log(fileobj)
        const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(img.uri)
        uploadTask.on('state_changed', 
        (snapshot) => {           
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             if(progress==100){alert("uploaded")}
        }, 
        (error) => {
           alert("something went wrong")
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setImage(downloadURL);
            });
        }
        );


   })
  }



  return (
   
    <View style={styles.container} >
      <Text style={styles.text}> Create Ad!</Text>
      <TextInput
      label="Ad title"
      value={name}
      mode='outlined'
      onChangeText={text => setName(text)}
      />
      
      <TextInput
      label="Describe what you are selling"
      value={desc}
      mode='outlined'
      numberOfLines={3}
      multiline={true}
      onChangeText={text => setDesc(text)}
      />

      <TextInput
      label="Year of purchase"
      value={year}
      mode='outlined'
      keyboardType="numeric"
      onChangeText={text => setYear(text)}
      />

      <TextInput
      label="Price in INR"
      value={price}
      mode='outlined'
      keyboardType="numeric"
      onChangeText={text => setPrice(text)}
      />

      <TextInput
      
      label="Your contact number"
      value={phone}
      mode='outlined'
      keyboardType="numeric"
      onChangeText={text => setPhone(text)}
      />

      

      <Button  color="#ff5c5c" icon="camera" mode="contained" onPress={() => openCamera1()}>
        upload image
      </Button>
      <Button  color="#ff5c5c" icon="camera" mode="contained" onPress={() => openCamera()}>
        open camera
      </Button>
      <Button disabled={image?false:true}  color="#2dba34"  mode="contained" onPress={() => postData()}>
        post
      </Button>
     
    </View> 
  );
};



const styles = StyleSheet.create({
  
  text:{
    fontSize:22,
    color: 'black',
    textAlign:"center"
  },
  container:{
      flex:1,
      marginHorizontal:30,
      justifyContent:"space-evenly"
  }

});

export default CreateAdScreen;
