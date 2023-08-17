import { Image, Pressable, StyleSheet, Text, View , Platform, TouchableOpacity} from 'react-native'
import React ,{useState} from 'react'
import { style } from '../../styles'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../routes'
import { useForm , Controller } from 'react-hook-form'
import CustomInputs from '../../customs/CustomInputs'
import {zodResolver} from '@hookform/resolvers/zod'
import { date, z } from 'zod'
import KeyboardAvoidWrapper from '../../customs/KeyboardAvoidWrapper'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import  axios  from 'axios'

const Register = () => {
  const REQUIRED = 'Ce champ est requis'
  const [error , setError] = useState('')
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation()
  const schema = z.object({
    email : z.string({required_error : REQUIRED}).min(1, REQUIRED).email({message : 'Veuillez entrer un email valide'}),
    password : z.string({required_error : REQUIRED}).min(5, "Votre mot de passe doit avoir 5 caracteres au minimum"),
    dateOfBirth : z.date(),
    firstName: z.string({required_error : REQUIRED}).min(1, REQUIRED).max(60, 'Votre nom ne doit pas depasser 60 caracteres') ,
    name: z.string({required_error : REQUIRED}).min(1, REQUIRED).max(100, 'Votre prenom ne doit pas depasser 100 caracteres') ,
    phoneNumber : z.string({required_error : REQUIRED}).min(10,'Le numero de telephone doit etre en format 0345000000').max(10, 'Le numero de telephone doit etre en format 0345000000') ,
  })

  const { handleSubmit , control , setValue , getValues , reset} = useForm({resolver : zodResolver(schema)})
  const onSubmit = async (data)=>{
    try {
      const response = await axios.post('http://192.168.88.3:3000/api/user', data)
      if(response){
    reset({
      name : '',
      firstName : '',
      email : '',
      password : '',
      dateOfBirth: '',
      phoneNumber : ''
    })
        navigation.navigate(ROUTES.loginScreen)
      }
    } catch (error) {
      if(error.response.status === 500){
        setError(error.response.data)
      }
    }


  }

  const handleDateChange = (event, selected) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedDate(selected);
      setValue('dateOfBirth', selected);
    }
  };

  return (
    <KeyboardAvoidWrapper>
    <View style={{ alignItems : 'center'}}>
      <Image source={require('../../public/images/login.jpg')} style={{ width : 400 , height : 400}}/>
      <Text style={{fontSize : 40}}><Text style={{fontWeight : 'bold' , color : style.primary}}>I</Text>nscription</Text>
      <View style={{width : '30%' , height : 5 , backgroundColor : style.primary, marginTop : 10}}></View>
      <View style={styles.inputContainer}>
      <CustomInputs
          control={control}
          name="firstName"
          mode="outlined"
          label="Votre Prenom"
          placeholder="Votre prenom"
          InputIcon={<TextInput.Icon icon={() => <Entypo name="user" size={24} color="gray" />} />} 
        />
        <CustomInputs
          control={control}
          mode="outlined"
          label="Votre nom"
          name="name"
          placeholder="Votre nom"
          InputIcon={<TextInput.Icon icon={() => <Entypo name="user" size={24} color="gray" />} />} 
        />
        <CustomInputs
          control={control}
          mode="outlined"
          label="Votre Email"
          name="email"
          placeholder="Votre email "
          InputIcon={<TextInput.Icon icon={() => <MaterialIcons name="email" size={24} color="gray" />} />} 
        />
        {error && (
          <Text style={{color : style.error , alignSelf : 'center', width : '90%', marginLeft : 10}}>
              {error}
          </Text>
        )}
        <CustomInputs
          control={control}
          mode="outlined"
          label="Votre mot de passe"
          name="password"
          placeholder="Votre mot de passe"
          secureTextEntry={true}
          InputIcon={<TextInput.Icon icon={({focused}) => <Entypo name="lock" size={24} color="gray" />} />} 
          
        />
          <CustomInputs
          control={control}
          mode="outlined"
          label="Votre numero de telephone"
          name="phoneNumber"
          keyboardType="numeric"
          placeholder="Votre numero de telephone"
          InputIcon={<TextInput.Icon icon={() => <Entypo name="old-phone" size={24} color="gray" />} />} 
        />

<Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            )}
          <TouchableOpacity style={{width : '100%' ,alignItems: 'center'}} onPress={()=> setShowPicker(true)}>
          <TextInput 
            mode='outlined'
            label="Votre Date de naissance"
            value={value? value.toLocaleDateString() : ''} 
            editable={false}
            placeholder='DD - MM - YYYY'
            style={{width : '90%',backgroundColor: 'white'}}
            left={<TextInput.Icon icon="calendar" color="gray"/>}
            outlineColor="gray"
            />
          </TouchableOpacity>
              
          </>
        )}
        />


      <Button buttonColor={style.primary} textColor='white' style={{marginTop : 40, marginBottom: 30 , width :'50%'}} onPress={handleSubmit(onSubmit)}>
        <Text>S'inscrire</Text>
      </Button>
      <Text>vous etes deja inscrit ? </Text>
      <Button  textColor={style.secondary} style={{ width :'50%'}} onPress={()=>navigation.navigate(ROUTES.loginScreen)}>
        <Text>Se connecter</Text>
      </Button>
      </View >
    </View>
    </KeyboardAvoidWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
  inputContainer : {
    marginTop : 50,
    flex : 1,
    flexDirection : 'column',
    alignItems : 'center',
    width : '100%',
  }
})