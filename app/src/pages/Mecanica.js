import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import apiAvaliacao from "../services/apiAvaliacao";

function Mecanica({ navigation }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const DOLAR_IMAGE = require("../img/dolar.png");
  const [femin, setFemin] = useState(false);
  useEffect(() => {
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

    async function loadFemin() {
      const mecanicaId = navigation.getParam("id");
      let response;

      response = await apiAvaliacao.get("/api/seloFeminino", {
        params: {
          mecanicaId,
        },
      });
      console.log(response.data);
      setFemin(response.data);
    }

    loadAvaliacoes();
    loadFemin();
  }, []);

  function RenderElement() {
    console.log("entrei no render");
    if (femin) {
      console.log("entrei no femin");
      return (
        <MaterialIcons
          style={styles.femin}
          name="stars"
          size={20}
          color="#800000"
        />
      );
    }
    return false;
  }

  return (
    <>
      <>
        <View style={styles.container}>
          <Text style={styles.mecInfo}>{navigation.getParam("name")}</Text>
          <Text style={styles.mecInfo}>
            Servicos: {navigation.getParam("servicos").join(", ")}
          </Text>
          <Text style={styles.mecInfo}>
            Telefone: {navigation.getParam("telefone")}
          </Text>
          <Text style={styles.mecInfo}>
            Endereço: {navigation.getParam("endereco")}
          </Text>
          <Text style={styles.mecInfo}>
            Email: {navigation.getParam("email")}
          </Text>
          <Text style={styles.mecInfo}>
            Site: {navigation.getParam("site")}
          </Text>
          <Text style={styles.mecInfo}>Horario: 08:00 ás 18:00</Text>
          <Rating
            imageSize={20}
            readonly
            fractions="{1}"
            startingValue={navigation.getParam("avaliacaoMedia")}
          />
          <Rating
            type="custom"
            ratingImage={DOLAR_IMAGE}
            ratingCount={3}
            ratingColor="green"
            imageSize={20}
            fractions={1}
            readonly
            startingValue={navigation.getParam("avaliacaoPreco")}
          />
          <RenderElement />
        </View>
      </>
      <>
        <SafeAreaView style={styles.containerSafe}>
          <ScrollView style={styles.scrollView}>
            {avaliacoes.map((avaliacao) => (
              <>
                <Text key={avaliacao._id} style={styles.mecAvaliacao}>
                  Descrição: {avaliacao.descricao}
                </Text>
                <Text style={styles.mecAvaliacao}>Avaliação:</Text>
                <Rating
                  imageSize={20}
                  readonly
                  fractions={1}
                  startingValue={avaliacao.nota}
                />
              </>
            ))}
          </ScrollView>
        </SafeAreaView>
      </>
      <>
        <Button
          onPress={() => {
            navigation.navigate("Avaliacao", {
              id: navigation.getParam("id"),
              idUser: "useridtestebbb",
            });
          }}
          title="Avaliar"
          color="#841584"
        />
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
  femin: {
    flexDirection: "row-reverse",
  },
});

export default Mecanica;
