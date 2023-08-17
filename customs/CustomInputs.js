import { View , Text, StyleSheet, Keyboard} from "react-native"
import { Controller } from "react-hook-form"
import { TextInput } from "react-native-paper"
import { style } from "../styles"
import { Feather } from "@expo/vector-icons"


const CustomInputs = ({control , placeholder , secureTextEntry, editable ,  name , label , mode , keyboardType, numberOfLines , multiline, InputIcon, InputStyles}) => {


  return (

        <Controller
            control={control}
            name={name}
            render={({field : {value , onBlur, onChange}, fieldState :{error}}) => (
                <>
                <View style={styles.container}>
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    onblur ={onBlur}
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    outlineColor={error ? style.error : "gray"}
                    activeUnderlineColor={style.primary}
                    activeOutlineColor={style.primary}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    left={InputIcon} 
                    editable={editable}   
                    mode={mode}        
                    label={label}
                />

                <View style={{alignSelf : 'center', width : '90%'}}>
                    {error && (<Text style={{color : 'red' , marginTop: 5 , marginBottom: 5, marginLeft : 10}}>{error?.message || 'error'}</Text>)}
                </View>
                </View>

                </>
            )}
        
        
        
        />

  )
}


const styles = StyleSheet.create({
    input: {
        backgroundColor : 'white',
        width : '90%'
    },
    container : {
        alignItems : 'center',
        width : '100%',
        marginBottom : 10
    }

})

export default CustomInputs




