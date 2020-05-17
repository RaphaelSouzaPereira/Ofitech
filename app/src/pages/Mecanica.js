import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import Constants from 'expo-constants';

function Mecanica({ mec }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.mecInfo}>{mec.getParam("name")}</Text>
        <Text style={styles.mecInfo}>
          {mec.getParam("servicos").join(", ")}
        </Text>
        <Text style={styles.mecInfo}>{mec.getParam("telefone")}</Text>
        <Text style={styles.mecInfo}>{mec.getParam("endereço")}</Text>
        <Text style={styles.mecInfo}>{mec.getParam("email")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "green",
    marginHorizontal: 20,
  },
  mecInfo: {
    fontSize: 16,
  },
});

export default Mecanica;
