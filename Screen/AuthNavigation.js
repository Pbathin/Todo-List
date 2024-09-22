// Navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Landing from "./AuthScreen/Landing";
import Registration from "./AuthScreen/Register";
import Login from "./AuthScreen/Login";
import Home from "./MainScreen/Home";
import DetailsPage from "./MainScreen/DetailsPage";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon1 from "react-native-vector-icons/FontAwesome5";

export default function Navigation() {
  const Stack = createStackNavigator();
  const TabNavigator = createBottomTabNavigator();

  const MainTab = () => (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={20} color={focused ? "#551E18" : "#000"} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Task List"
        component={DetailsPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon1 name="tasks" size={18} color={focused ? "#551E18" : "#000"} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Landing"
          component={Landing}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Registration} />

        {/* Use conditional rendering to handle the initial route */}
        {false ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={MainTab}
          />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={DetailsPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
