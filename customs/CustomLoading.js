import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'

const CustomLoading = ({text}) => {
  return (
    <View style={{flex : 1 , alignItems :'center' , justifyContent : 'center'}}>
    <ActivityIndicator type="small"/>
    <Text>{text}</Text>
</View>
  )
}

export default CustomLoading

const styles = StyleSheet.create({})