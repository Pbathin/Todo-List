import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { WindowHeight } from "../../GlobalCSS";
import { WindowWidth } from "../../GlobalCSS";

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://img.freepik.com/free-vector/hand-drawn-business-planning_52683-76248.jpg?w=740&t=st=1704215862~exp=1704216462~hmac=2a231f7d58b51498c98f82815d5337d9ed0d26cf706203b46678f74a7fa22e38",
          }}
        />
      </View>

      <View style={styles.boardHeader}>
        <Text style={styles.label}>Hi.., </Text>
        <Text style={styles.label}>Empower Your </Text>
        <Text style={styles.label}>Productive Journey </Text>
        <Text style={[styles.label, { paddingBottom: -5 }]}> Here...! </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.StartedBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.BtnLabel}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: WindowHeight + 90,
    width: WindowWidth,
    backgroundColor: "white",
  },
  image: {
    height: WindowHeight * 0.5,
    width: WindowWidth *0.9,
    marginTop:50
  },
  boardHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  label: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: -10,
    color: "#127a00",
    paddingBottom: 20,
  },
  StartedBtn: {
    backgroundColor: "#7044ff",
    width: 180,
    padding: 20,
    borderRadius: 200,
    margin: 15,
    marginTop:30,
    alignItems: "center",
    elevation: 2,
  },
  BtnLabel: {
    fontSize: 20,
    color: "white",
  },
});
