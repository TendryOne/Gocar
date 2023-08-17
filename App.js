import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {AppNavigator} from './Navigation';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <View style={{flex : 1 , backgroundColor : 'white'}}>
          <NavigationContainer>
        <AppNavigator/>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
