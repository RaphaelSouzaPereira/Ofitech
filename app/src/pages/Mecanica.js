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

      setFemin(response.data);
    }

    loadAvaliacoes();
    loadFemin();
  }, []);

  function RenderElement() {
    if (femin) {
      return (
        <MaterialIcons
          style={styles.femin}
          name="loyalty"
          size={35}
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
          <View style={styles.view}>
            <Text style={styles.mecName}>{navigation.getParam("name")}</Text>
            <RenderElement />
          </View>
          <Text style={styles.mecInfo}><Text style={styles.desc}>Horario:</Text> 08:00 ás 18:00</Text>
          <Text style={styles.mecInfo}><Text style={styles.desc}>Telefone:</Text> {navigation.getParam("telefone")}</Text>
          <Text style={styles.mecInfo}><Text style={styles.desc}>Endereço:</Text> {navigation.getParam("endereco")}</Text>
          <Text style={styles.mecInfo}><Text style={styles.desc}>Email:</Text> {navigation.getParam("email")}</Text>
          <Text style={styles.mecInfo}><Text style={styles.desc}>Site:</Text> {navigation.getParam("site")}</Text>
          <Text style={styles.mecInfo}><Text style={styles.desc}>Servicos:</Text> {navigation.getParam("servicos").join(", ")}</Text>
          <Rating
            style={styles.aval}
            imageSize={25}
            readonly
            fractions={1}
            startingValue={navigation.getParam("avaliacaoMedia")}
          />
          <Rating
            style={styles.dolar}
            type="custom"
            ratingImage={DOLAR_IMAGE}
            ratingCount={3}
            ratingColor="green"
            imageSize={25}
            fractions={1}
            readonly
            startingValue={navigation.getParam("precoMedia")}
          />
        </View>
      </>
      <>
        <SafeAreaView style={styles.containerSafe}>
          <ScrollView style={styles.scrollView}>
            {avaliacoes.map((avaliacao) => (
              <View key={avaliacao._id}>
                <Text style={styles.mecAvaliacao}>Nome: {avaliacao.nome}</Text>
                <Text style={styles.mecAvaliacao}>Descrição: {avaliacao.descricao}</Text>
                <Rating
                  style={styles.aval}
                  imageSize={15}
                  readonly
                  fractions={1}
                  startingValue={avaliacao.nota}
                />
              </View>
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
          style={styles.avaliar}
          title="Avaliar"
        />
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: Constants.statusBarCenter,
    backgroundColor: "#F0F8FF",
  },
  containerSafe: {
    flex: 1,
    marginTop: Constants.statusBarCenter,
    backgroundColor: "#87CEEB",
  },
  scrollView: {
    backgroundColor: "#87CEEB",
    marginHorizontal: 20,
  },
  desc: {
    fontWeight: "bold",
  },
  mecName: {
    marginTop: 13,
    fontWeight: "bold",
    alignSelf: 'center',
    fontSize: 20,
    marginLeft: 45
  },
  mecInfo: {
    color: '#4F4F4F',
    fontSize: 14,
    marginTop: 10,
    width: 300,
    alignSelf: "center",
  },
  mecButton: {
    backgroundColor: "red",
  },
  mecAvaliacao: {
    fontSize: 14,
    color: '#4F4F4F',
    marginTop: 7,
    width: 300,
    alignSelf: "center",
  },
  femin: {
    marginLeft: 40,
  },
  dolar: {
    marginTop: 5,
  },
  aval: {
    marginTop: 5,
  },
  view:{
    flex: 0.3,
    alignItems: "center",
    flexDirection: "row",
  }
});

export default Mecanica;
