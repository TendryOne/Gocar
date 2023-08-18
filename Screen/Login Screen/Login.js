import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { style } from '../../styles'
import { Button, TextInput, ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../routes'
import { useForm , } from 'react-hook-form'
import CustomInputs from '../../customs/CustomInputs'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import KeyboardAvoidWrapper from '../../customs/KeyboardAvoidWrapper'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = () => {
  const [error , setError] = useState('')
  const navigation = useNavigation()
  const [isLoading , setIsLoading] = useState(true);
  const REQUIRED = 'Ce champ est requis'
  const schema = z.object({
    email : z.string({required_error : REQUIRED}).min(1, REQUIRED),
    password : z.string({required_error : REQUIRED}).min(1, REQUIRED),
  })

  const { handleSubmit , control, reset } = useForm({resolver : zodResolver(schema)})

  useEffect(()=>{
    checkLoggedIn()
  }, [])

  const checkLoggedIn = async()=>{
    try {
        const token = await AsyncStorage.getItem('token')
        if(token){
          setTimeout(() => {
            navigation.replace(ROUTES.home)
          }, 1000); 
        }else{
          setIsLoading(false)
        }
    } catch (error) {
        console.log(error)
    }
  }


  const onSubmit = async (data)=>{
    try {
      const response = await axios.post('http://192.168.88.3:3000/api/authentication', data)  
      await AsyncStorage.setItem('token', response.data.token)
      const user = JSON.stringify(response.data.user)
      await AsyncStorage.setItem('user', user)
      navigation.replace(ROUTES.home)
    } catch (error) {
      console.log(error)
      if(error.response.status === 403){
        setError(error.response.data)
      }
    }

  }

  if(isLoading){
    return(
    
      <View style={{flex : 1 , alignItems :'center' , justifyContent : 'center'}}>
          <ActivityIndicator type="small"/>
          <Text>Chargement de l'utilisateur</Text>
      </View>
      
    )
  }

  return (
    <KeyboardAvoidWrapper>
    <View style={{ alignItems : 'center'}}>
      <Image source={require('../../public/images/login.jpg')} style={{ width : 400 , height : 400}}/>
      <Text style={{fontSize : 40}}><Text style={{fontWeight : 'bold' , color : style.primary}}>C</Text>onnexion</Text>
      <View style={{width : '30%' , height : 5 , backgroundColor : style.primary, marginTop : 10}}></View>
      <View style={styles.inputContainer}>
        <CustomInputs
          control={control}
          name="email"
          placeholder="Votre email ou numero de telephone"
          InputIcon={<TextInput.Icon icon={() => <MaterialIcons name="email" size={24} color={style.primary} />} />}      
        />
        <CustomInputs
          control={control}
          name="password"
          placeholder="Votre mot de passe"
          secureTextEntry
          InputIcon={<TextInput.Icon icon={() => <MaterialIcons name="lock" size={24} color={style.primary} />} />} 
        />
        {error && (
          <Text style={{color : style.error , alignSelf : 'center', width : '90%', marginLeft : 10}}>
              {error}
          </Text>
        )}
      <Button buttonColor={style.primary} textColor='white' style={{marginTop : 40, marginBottom: 30 , width :'50%'}} onPress={handleSubmit(onSubmit)}>
        <Text>Se connecter</Text>
      </Button>
      <Text>vous n'etes pas encore inscrit ? </Text>
      <Button  textColor={style.secondary} style={{ width :'50%'}} onPress={()=>navigation.navigate(ROUTES.register)}>
        <Text>S'inscrire</Text>
      </Button>
      </View >
    </View>
    </KeyboardAvoidWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  inputContainer : {
    marginTop : 50,
    flex : 1,
    flexDirection : 'column',
    alignItems : 'center',
    width : '100%',
  }
})