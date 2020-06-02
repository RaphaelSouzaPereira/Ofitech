import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Constants from "expo-constants";

import apiAvaliacao  from "../services/apiAvaliacao";

function Mecanica({ navigation }) {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    //função que vai carregar a posição inicial do mapa
    async function loadAvaliacoes() {
      const mecanicaId = navigation.getParam("id");
      let response;

      response = await apiAvaliacao.get("/api/avaliacao", {
        params: {
          mecanicaId,
        },
      });

      setAvaliacoes(response.data);
    }
    loadAvaliacoes();
  }, []);

  return (
    <>
      <>
        <View style={styles.container}>
          <Text style={styles.mecInfo}>{navigation.getParam("name")}</Text>
          <Text style={styles.mecInfo}>
          Servicos: {navigation.getParam("servicos").join(", ")}
          </Text>
          <Text style={styles.mecInfo}>Telefone: {navigation.getParam("telefone")}</Text>
          <Text style={styles.mecInfo}>Endereço: {navigation.getParam("endereco")}</Text>
          <Text style={styles.mecInfo}>Email: {navigation.getParam("email")}</Text>
          <Text style={styles.mecInfo}>Site: {navigation.getParam("site")}</Text>
        </View>
      </>
      <>
      <SafeAreaView style={styles.containerSafe}>
        <ScrollView style={styles.scrollView}>
          {avaliacoes.map((avaliacao) => (
            <>
              <Text key={avaliacao._id} style={styles.mecAvaliacao}>Descrição: {avaliacao.descricao}</Text>
              <Text style={styles.mecAvaliacao}>Avaliação: {avaliacao.nota}</Text>
              <Text style={styles.mecAvaliacao}>Média de valor: {avaliacao.valor}</Text>
            </>
          ))}
        </ScrollView>
    </SafeAreaView>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  containerSafe: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  mecInfo: {
    fontSize: 16,
    marginTop: 10,
  },
  mecButton: {
    backgroundColor: "red",
  },
  mecAvaliacao: {
    fontSize: 16,
  },
});

export default Mecanica;
