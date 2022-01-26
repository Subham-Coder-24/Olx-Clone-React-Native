import { View, Text,StyleSheet,FlatList } from 'react-native';
import React,{useState , useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import CreateAdScreen from './CreateAdScreen'
import firestore from '@react-native-firebase/firestore';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


const AccountScreen = () => {

  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(false)

  const getDetails = async ()=>{
  const querySnap = await firestore().collection('ads')
  .where('uid' , '==' , auth().currentUser.uid )
  .get()
  const result = querySnap.docs.map(docSnap=>docSnap.data())
  console.log(result)
  setItems(result)
}
useEffect(()=>{
  getDetails()
  return ()=>{
    console.log("cleanup")
  }
},[])

const renderItem = (item) =>{
    return(
    <Card style={styles.card}>
      <Card.Title title={item.name}  />
     <Card.Content>  
      <Paragraph>{item.desc}</Paragraph>
     </Card.Content>
      <Card.Cover source={{ uri:item.image }} />
     <Card.Actions>
      <Button color="#2dba34">{item.price}</Button>
      <Button color="#ff5c5c" onPress={()=>openDial()}>call seller</Button>
     </Card.Actions>
    </Card>
    );
} 




  return (
    <View style={{flex:1}}>

      <View style={{height:'30%',justifyContent:"space-evenly"}}>
      <Text style={styles.text}>UserName : {auth().currentUser.email}</Text>
      
      <Text style={styles.text} >:These are all yours ads!:</Text>
      
      <Button style={styles.box1} mode="contained" onPress={() => auth().signOut() }>
        Logout
      </Button>
      
      </View>
      

      <FlatList 
       data={items}
       keyExtractor={(item)=>item.phone}
       renderItem={({item})=>renderItem(item)}
       
       onRefresh = {()=>{
         setLoading(true)
         getDetails()
         setLoading(false)
       }}
       refreshing={loading}
      />
    </View>
      
  );
};

const styles = StyleSheet.create({
  
  text:{
    fontSize:22,
    color: 'black',
    textAlign:"center"
  },
  box1:{
    marginHorizontal:50,
  },
  box2:{
    justifyContent:"space-evenly",
    alignitems:"center"
  },
  card:{
      margin:10,
      elevation:10 
  }
 

});
export default AccountScreen;
