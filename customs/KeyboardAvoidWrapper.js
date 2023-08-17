import { StyleSheet, Text, View, Keyboard , KeyboardAvoidingView , TouchableWithoutFeedback , ScrollView} from 'react-native'
import React from 'react'


const KeyboardAvoidWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex : 1, backgroundColor : 'white'}} enabled={true}  >
        <ScrollView showsVerticalScrollIndicator ={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidWrapper

const styles = StyleSheet.create({})