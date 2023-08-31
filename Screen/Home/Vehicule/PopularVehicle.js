import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import axios from 'axios'
import { style } from '../../../styles'

const PopularVehicle = () => {
    const [PopularCar , setPopularCar] = useState([])
    const fetchPopularCar = async ()=>{
        try {
           let response = await axios.get(`http://192.168.88.3:3000/api/vehicle/popular`)
            if(response){
                setPopularCar(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchPopularCar()
    }, [])


  return (
    <>
      <View style={{margin : 10}}>
      <Text style ={{fontSize : 20, fontWeight : 'bold', marginLeft : 5}}>Voitures ajoutees recemment</Text>
    { PopularCar && (
        <>
    <FlatList
data={PopularCar}
horizontal
pagingEnabled
showsHorizontalScrollIndicator={false}
renderItem={({ item }) => (
<View style={styles.carouselItem}>
    <Text style={{ position : 'absolute' , top : 5 , left : 5 , backgroundColor : style.secondary, fontWeight : 'bold' , borderRadius : 10 , padding : 3 }}>Nouveau</Text>
    <Image source={{uri : item.image}} style={{width : 150 , height : 150, resizeMode : 'contain'}} />
    <Text style={{ fontWeight : 'bold'}}>{item.brand} {item.model}</Text>
    <Text style={{ color : style.secondary}}>Ar {item.price.toLocaleString()}</Text>
</View>
)}
/>
</>
    
 ) }
     </View>
    </>
  )
}

export default memo(PopularVehicle)

const styles = StyleSheet.create({
    carouselItem : {
        padding : 10,
        alignItems : 'center',
        width : 200,
        height : 200,
        margin : 5,
        backgroundColor : 'white',
        elevation : 2,
        borderRadius : 8,

    }
})