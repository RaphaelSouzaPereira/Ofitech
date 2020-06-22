import React, { useState, useEffect, onChangeText } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import Constants from "expo-constants";
import { Rating } from "react-native-elements";
import apiAvaliacao from "../services/apiAvaliacao";

function Avaliacao({ navigation }) {
  const [descricao, onChangeText] = useState("");
  const [genero, onChangeGenero] = useState("");
  const [avaliacao, onChangeAvaliacao] = useState(3);
  const [preco, onChangePreco] = useState(2);
  const DOLAR_IMAGE = require("../img/dolar.png");

  async function finalizarAvaliacao(
    id,
    idUser,
    avaliacao,
    preco,
    descricao,
    genero
  ) {
    let response = await apiAvaliacao.post("/api/avaliacao", {
      descricao: descricao,
      nota: avaliacao,
      valor: preco,
      userId: idUser,
      genero: genero,
      mecanicaId: id,
    });
    navigation.navigate("Main");
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mecInfo}>Descrição:</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => onChangeText(text)}
        />
        <Text style={styles.mecInfo}>Genêro:</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => onChangeGenero(text)}
        />
        <Rating
          showRating
          startingValue={3}
          fractions={1}
          onFinishRating={onChangeAvaliacao}
          style={{ paddingVertical: 10 }}
        />
        <Rating
          type="custom"
          showRating
          startingValue={2}
          ratingImage={DOLAR_IMAGE}
          ratingColor="green"
          ratingCount={3}
          fractions={1}
          imageSize={30}
          onFinishRating={onChangePreco}
          style={{ paddingVertical: 10 }}
        />
      </View>
      <>
        <Button
          onPress={() =>
            finalizarAvaliacao(
              navigation.getParam("id"),
              navigation.getParam("idUser"),
              avaliacao,
              preco,
              descricao,
              genero
            )
          }
          title="Finalizar"
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
});

export default Avaliacao;
