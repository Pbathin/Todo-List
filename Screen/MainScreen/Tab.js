import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './Home'
import About from './About'
import Settings from './Settings'
import Icon from 'react-native-vector-icons/AntDesign'


export default function () {
  const Tab = createBottomTabNavigator()
  return(
    <Tab.Navigator >
        <Tab.Screen name="Home" component={Home}
        options={{
            headerShown:false,
            tabBarIcon:({focused})=> (
                <Icon name ="home" size={20} color={focused ? '#551E18' : '#000'}/>
  ),
        }}/>
        <Tab.Screen name="About" component={About}
        options={{
          headerShown:false,
          tabBarIcon:({focused})=> (
              <Icon name ="exclamationcircleo" size={20} color={focused ? '#551E18' : '#000'}/>
),
      }}/>
        <Tab.Screen name="Settings" component={Settings}
        options={{
          headerShown:false,
          tabBarIcon:({focused})=> (
              <Icon name ="setting" size={20} color={focused ? '#551E18' : '#000'}/>
),
      }}/>
       
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})