import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WindowHeight,WindowWidth } from "../../GlobalCSS";
import { ScrollView } from "react-native-gesture-handler";

export default function Login({ navigation }) {
  const [user, setUser] = useState({});

  const handleChange = (value, name) => {
    setUser({
      ...user,
      [name]: value,
    });
  };
  const Login = async () => {
    let data = await AsyncStorage.getItem("register");
    data = JSON.parse(data);
    let check = data.filter((item) => {
      return item.email == user.email && item.password == user.password;
    });
    console.log(check.length);
    if (check.length > 0) {
      alert("Login Successfull");

      navigation.navigate("Home");
    } else {
      alert("Login Unsuccessfull !!");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://img.freepik.com/free-vector/woman-working-using-laptop-flat-design_1308-91907.jpg?t=st=1700851334~exp=1700851934~hmac=3a974a6b274a348a77c4452b67816e89573b24a571c0678e0493d1d991d159dd",
          }}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Login to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={(value) => handleChange(value, "email")}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          onChangeText={(value) => handleChange(value, "password")}
        />
        <TouchableOpacity style={styles.button} onPress={Login}>
          <Text style={styles.forgotText}>Login</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.ForRegister}>
            You don't have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              style={styles.SignUp}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: WindowWidth * 1,
    height: WindowHeight * 0.4,
    borderRadius: 30,
    marginTop: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  heading: {
    fontSize: 25,
    marginTop: 15,
    textAlign: "center",
    marginBottom: 15,
    color: "#92735D",
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    height: "auto",
    width: WindowWidth - 18,
    margin: 10,
    padding: 15,
    textAlign: "center",
    borderColor: "lightpurple",
    borderColor: "#6A5547",
    marginTop: 15,
    marginBottom: 15,
    fontSize:18
  },

  button: {
    backgroundColor: "#E7E0E0",
    height: "auto",
    width: "50%",
    elevation: 10,
    marginLeft:100,
    shadowColor: "gray",
    marginTop: 20,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowRadius: 15,
    shadowOpacity: 50,
    margin: 10,
    paddingBottom: 20,
    borderRadius: 40,
  },
  forgotText: {
    color: "#92735D",
    paddingHorizontal: 25,
    justifyContent: "center",
    textAlign: "center",
    // fontWeight: 500,
    paddingTop: 13,
    fontSize: 18,
  },

  ForRegister: {
    alignContent: "center",
    textAlign: "center",
    paddingTop: 10,
    color: "#92735D",
  },

  SignUp: {
    textDecorationLine: "underline",
    color: "grey",
    textAlign: "center",
    
  },

  loginContainer: {
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    
  },
});
