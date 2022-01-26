import { View, Text ,FlatList,StyleSheet,Linking,Platform } from 'react-native';
import React , {useEffect,useState} from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListitemScreen = () => {
 
  const [loading,setLoading] = useState(false)

const [items,setItems] = useState([])



  const getDetails = async ()=>{
  const querySnap = await firestore().collection('ads').get()
  const result = querySnap.docs.map(docSnap=>docSnap.data())
  console.log(result)
  setItems(result)
}


const openDial = (phone)=>{
  if(Platform.OS === 'android'){
    Linking.openURL(`tel:${phone}`)
  }
  

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
    <View>
      <FlatList 
       data={items.reverse()}
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
    color: 'black'
  },
  card:{
      margin:10,
      elevation:10 
  }

}); 

export default ListitemScreen;
