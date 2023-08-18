import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Portal, PaperProvider, Button, Searchbar , RadioButton, Modal} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../routes'
import { style } from '../../../styles'
import { MaterialIcons , MaterialCommunityIcons , AntDesign, Ionicons} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'


const VehiculeList = () => {
    const [isModalVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation()
    const [vehicule , setVehicule] = useState([])
    const [searchQuery , SetSearchQuery] = useState('')
    const [selectedFilter, setSelectedFilter] = useState(false)
    const [priceQuery , setPriceQuery] = useState(5000000)
    const [seatsQuery, setSeatsQuery] = useState(50)
    const [categoryQuery , setCategoryQuery] = useState('Tous')
    
    

    // this is the head modal of the error
    const hideModal = () => {
      navigation.replace(navigation.replace(ROUTES.loginScreen))
      setVisible(false)
    };
    const containerStyle = {backgroundColor: 'white', padding: 20, margin : 50, height : 150, alignItems: 'center'};
    const [error, setError] = useState('')

    const ResetFilter = ()=>{
      setCategoryQuery('Tous')
      setSeatsQuery(50)
      setPriceQuery(5000000)
      SetSearchQuery('')
    }

    const fetchData = async ()=>{
      try {
        const token = await AsyncStorage.getItem('token')
        response = await axios.get(`http://192.168.88.3:3000/api/vehicle`, {
          params : {
            search : searchQuery,
            price : priceQuery  ,
            capacity : seatsQuery,
            category : categoryQuery
          },
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
        })
        if(response.data.token){
          AsyncStorage.setItem('token', response.data.token)
          setVehicule(response.data.vehicle)
        }
          setVehicule(response.data)
      } catch (error) {
        if(error.response.status === 403){
          setError(error.response.data)
        }
         
      }
    }

    useEffect(()=>{
      fetchData()
    }, [searchQuery, priceQuery, seatsQuery, categoryQuery])



  return (
    <>
{ vehicule && (  
  <>

      {(searchQuery !== '' || priceQuery !== 5000000 || categoryQuery !== 'Tous' || seatsQuery !== 50) && (
                      <TouchableOpacity onPress={ResetFilter} style={{position : 'absolute' , zIndex : 1 , bottom : 30, right : 30 , backgroundColor : style.secondary , padding : 10 , borderRadius : 50}}>
                      <MaterialCommunityIcons name="filter-off" size={30} color="black"  />
                      </TouchableOpacity>
      )}
      
        
                <View style={{flexDirection : 'row', alignItems : 'center'}}>


                    <Searchbar
                    placeholder='search here'
                    iconColor={style.secondary}
                    value={searchQuery}
                    onChangeText={(value)=> SetSearchQuery(value)}
                    style={{
                      marginTop : 10,
                      backgroundColor : 'white',
                      elevation : 5,
                      width : '85%'
                    }}
                  />
                    <TouchableOpacity onPress={()=> setModalVisible(!isModalVisible)}>
                    <AntDesign name="filter" size={54} color={style.secondary} />
                    </TouchableOpacity>
                      </View>
                  
<ScrollView style={{flex : 1}}>

 
                {
                  vehicule.map(item => {
                    return (
                      <TouchableOpacity key={item._id} activeOpacity={0.9} >
                        <View style={styles.vehiculeContainer}  >
                        <Text style={{color : style.secondary, position : 'absolute', top : 5 , right : 5,}}>{item.rent? <MaterialIcons name="car-rental" size={24} color={style.secondary} /> : ''}</Text>
                          <View style={{marginRight : 10}}>
                            <Image source={{uri : item.image}} style={{width : 100, height : 100 , resizeMode : 'contain'}}/>
                          </View>
                          <View>
                          <Text style={{fontWeight : 'bold'}}>{item.brand} {item.model}</Text>
                          <Text style={{color : style.secondary}}>Ar {item.price.toLocaleString()}</Text>
                          <View style={{flexDirection : 'row', alignItems :'center'}}>
                          <MaterialCommunityIcons name="seat-passenger" size={24} color="gray" />
                          <Text>{item.capacity}</Text>
                          </View>
                          </View>                        
                        </View>
                        </TouchableOpacity>
                    )
                  })
                }      
                </ScrollView>
               </> 
                )}
      <Modal
        onDismiss={()=> setModalVisible(!isModalVisible)}
        visible={isModalVisible}
        style={{flex : 1, justifyContent : 'flex-end', }}
      >
        
        <View style={{backgroundColor : 'white' , height : 500, width :'auto' , borderTopLeftRadius : 40, borderTopRightRadius : 40, }}>
         
          <View style={{margin : 20}}>
          <Text style={{alignSelf : 'center', margin : 10, fontSize : 20, fontWeight : 'bold'}}>Filtre <Ionicons name="filter-sharp" size={24} color="black" /></Text>
              <View style={{width : '80%', height : 5, backgroundColor : 'gray', alignSelf : 'center', borderRadius : 20, marginBottom : 15}}></View>
              <ScrollView showsVerticalScrollIndicator={false} style={{height : 400}}>
          <Text style={{fontWeight : 'bold'}}>Filtre par prix</Text>          
          <Text>{priceQuery}</Text>
        <Slider
                        value={priceQuery}
                        maximumValue={5000000}
                        minimumValue={0}
                        step={100000}
                        onValueChange={(value)=>setPriceQuery(value) }
                        maximumTrackTintColor="gray"
                        minimumTrackTintColor={style.secondary}
                        thumbTintColor={style.secondary}
                      
                      />
            <Text style={{fontWeight : 'bold'}}>Filtre par sieges</Text>
            <Text>{seatsQuery}</Text> 
            <Slider
                        value={seatsQuery}
                        maximumValue={50}
                        minimumValue={1}
                        step={1}
                        onValueChange={(value)=>setSeatsQuery(value) }
                        maximumTrackTintColor="gray"
                        minimumTrackTintColor={style.secondary}
                        thumbTintColor={style.secondary}
                      
                      /> 
            <Text style={{fontWeight : 'bold'}}>Filtre par Vehicules</Text>   
            <View>
            <RadioButton.Group onValueChange={(value)=> setCategoryQuery(value)} value={categoryQuery}>
                    <RadioButton.Item label="Tous" value='Tous' />
                    <RadioButton.Item label="Légères" value='Légères' />
                    <RadioButton.Item label="4 x 4" value='4 x 4' />
                    <RadioButton.Item label="Minibus" value='Minibus' />
                    <RadioButton.Item label="SUV" value='SUV' />
            </RadioButton.Group>
            </View>    
            </ScrollView>   
        </View>

        </View>      
  
      </Modal>


        {error && (
            <PaperProvider>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Session expire !!!</Text>
                <Button onPress={()=> navigation.replace(ROUTES.loginScreen)} >
                  <Text>Revenir sur la page de connexion</Text>
                </Button>
              </Modal>
            </Portal>
          </PaperProvider>
          )}
     </>     

  )
}

export default VehiculeList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width : '100%',
    height : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 20,
    color: 'white',
  },
  image: {
      width : 500,
      height: 500,
      borderRadius: 8,
    },
    vehiculeContainer : {
      backgroundColor: 'white',
      margin : 10,
      borderRadius : 8,
      padding : 10,
      elevation: 6, // Cela ajoute une ombre en utilisant l'élévation (fonctionne sur Android)
      flexDirection : 'row',
      alignItems : 'center'
    }
})